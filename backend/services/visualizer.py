import pandas as pd
import numpy as np
from services.file_parser import parse_file
from fastapi.encoders import jsonable_encoder


def analyze_columns(df: pd.DataFrame) -> dict:
    analysis = {}
    for col in df.columns:
        series = df[col].dropna()
        dtype = str(df[col].dtype)

        if pd.api.types.is_numeric_dtype(df[col]):
            analysis[col] = {
                "type": "numeric",
                "min": float(series.min()),
                "max": float(series.max()),
                "mean": float(series.mean()),
                "median": float(series.median()),
                "std": float(series.std()),
                "nulls": int(df[col].isnull().sum()),
                "unique": int(series.nunique()),
            }
        elif pd.api.types.is_datetime64_any_dtype(df[col]):
            analysis[col] = {
                "type": "datetime",
                "min": str(series.min()),
                "max": str(series.max()),
                "nulls": int(df[col].isnull().sum()),
                "unique": int(series.nunique()),
            }
        else:
            value_counts = series.value_counts()
            analysis[col] = {
                "type": "categorical",
                "unique": int(series.nunique()),
                "top_values": value_counts.head(10).to_dict(),
                "nulls": int(df[col].isnull().sum()),
            }
    return analysis


def detect_time_column(df: pd.DataFrame) -> str | None:
    for col in df.columns:
        if pd.api.types.is_datetime64_any_dtype(df[col]):
            return col
        if any(k in col.lower() for k in ["date", "time", "year", "month", "week", "day"]):
            try:
                pd.to_datetime(df[col])
                return col
            except Exception:
                continue
    return None


def compute_correlation(df: pd.DataFrame) -> dict:
    numeric_df = df.select_dtypes(include="number")
    if numeric_df.shape[1] < 2:
        return {}
    corr = numeric_df.corr().round(2)
    return {
        col: {row: float(val) for row, val in corr[col].items()}
        for col in corr.columns
    }



def generate_charts(df: pd.DataFrame, analysis: dict) -> list:
    charts = []
    numeric_cols = [c for c, v in analysis.items() if v["type"] == "numeric"]
    categorical_cols = [c for c, v in analysis.items() if v["type"] == "categorical"]
    time_col = detect_time_column(df)

    # KPI summary cards
    if numeric_cols:
        kpis = []
        for col in numeric_cols[:6]:
            a = analysis[col]
            kpis.append({
                "label": col,
                "value": round(a["mean"], 2),
                "min": round(a["min"], 2),
                "max": round(a["max"], 2),
                "std": round(a["std"], 2),
            })
        charts.append({"type": "kpi_cards", "title": "Key Metrics Summary", "data": kpis})

    # Time series line chart
    if time_col and numeric_cols:
        try:
            df["_time"] = pd.to_datetime(df[time_col])
            df_sorted = df.sort_values("_time")
            target_cols = numeric_cols[:3]
            series_data = []
            for col in target_cols:
                grouped = df_sorted.groupby("_time")[col].mean().reset_index()
                series_data.append({
                    "name": col,
                    "points": [
                        {"x": str(row["_time"].date()), "y": round(row[col], 2)}
                        for _, row in grouped.iterrows()
                    ]
                })
            charts.append({
                "type": "line_chart",
                "title": f"Trends Over Time ({time_col})",
                "series": series_data,
                "x_label": time_col,
            })
        except Exception:
            pass

    # Bar chart for categorical vs numeric
    if categorical_cols and numeric_cols:
        cat_col = categorical_cols[0]
        num_col = numeric_cols[0]
        if analysis[cat_col]["unique"] <= 30:
            grouped = df.groupby(cat_col)[num_col].mean().sort_values(ascending=False).head(15)
            charts.append({
                "type": "bar_chart",
                "title": f"Average {num_col} by {cat_col}",
                "x_label": cat_col,
                "y_label": f"Avg {num_col}",
                "data": [{"label": str(k), "value": float(v)} for k, v in grouped.items()]

            })

    # Pie / donut chart for categorical distribution
    if categorical_cols:
        cat_col = categorical_cols[0]
        if analysis[cat_col]["unique"] <= 10:
            counts = df[cat_col].value_counts().head(8)
            charts.append({
                "type": "donut_chart",
                "title": f"Distribution of {cat_col}",
                "data": [{"label": str(k), "value": int(v)} for k, v in counts.items()],
            })

    # Histogram for numeric distribution
    if numeric_cols:
        col = numeric_cols[0]
        series = df[col].dropna()
        hist, bin_edges = np.histogram(series, bins=20)
        charts.append({
            "type": "histogram",
            "title": f"Distribution of {col}",
            "x_label": col,
            "y_label": "Frequency",
            "data": [
                {"bin": f"{round(bin_edges[i], 1)}–{round(bin_edges[i+1], 1)}", "count": int(hist[i])}
                for i in range(len(hist))
            ]
        })

    # Scatter plot for two numeric columns
    if len(numeric_cols) >= 2:
        x_col, y_col = numeric_cols[0], numeric_cols[1]
        sample = df[[x_col, y_col]].dropna().sample(min(300, len(df)), random_state=42)
        charts.append({
            "type": "scatter_plot",
            "title": f"Correlation: {x_col} vs {y_col}",
            "x_label": x_col,
            "y_label": y_col,
            "data": [{"x": float(row[x_col]), "y": float(row[y_col])} for _, row in sample.iterrows()]

        })

    # Correlation heatmap
    corr = compute_correlation(df)
    if corr:
        charts.append({
            "type": "heatmap",
            "title": "Correlation Matrix",
            "data": corr,
        })

    # Top N table
    charts.append({
        "type": "data_table",
        "title": "Data Preview",
        "columns": df.columns.tolist(),
        "rows": df.head(20).where(pd.notnull(df.head(20)), None).values.tolist(),
    })

    return charts


def generate_insights(df: pd.DataFrame, analysis: dict) -> list[str]:
    insights = []
    numeric_cols = [c for c, v in analysis.items() if v["type"] == "numeric"]
    categorical_cols = [c for c, v in analysis.items() if v["type"] == "categorical"]

    insights.append(f"Dataset contains {len(df):,} rows and {len(df.columns)} columns.")

    for col in numeric_cols[:3]:
        a = analysis[col]
        cv = (a["std"] / a["mean"] * 100) if a["mean"] != 0 else 0
        if cv > 50:
            insights.append(f"'{col}' is highly variable (CV: {round(cv, 1)}%) — consider outlier analysis.")
        if a["nulls"] > 0:
            pct = round(a["nulls"] / len(df) * 100, 1)
            insights.append(f"'{col}' has {a['nulls']} missing values ({pct}% of data).")

    for col in categorical_cols[:2]:
        a = analysis[col]
        if a["unique"] == 1:
            insights.append(f"'{col}' has only one unique value — may not be useful for analysis.")
        if a["unique"] > 50:
            insights.append(f"'{col}' has {a['unique']} unique values — high cardinality column.")

    numeric_df = df.select_dtypes(include="number")
    if numeric_df.shape[1] >= 2:
        corr_matrix = numeric_df.corr()
        for i in range(len(corr_matrix.columns)):
            for j in range(i + 1, len(corr_matrix.columns)):
                val = corr_matrix.iloc[i, j]
                if abs(val) > 0.8:
                    c1, c2 = corr_matrix.columns[i], corr_matrix.columns[j]
                    direction = "positive" if val > 0 else "negative"
                    insights.append(f"Strong {direction} correlation ({round(val, 2)}) between '{c1}' and '{c2}'.")

    return insights


def build_dashboard(contents: bytes, ext: str) -> dict:
    parsed = parse_file(contents, ext)
    df = pd.DataFrame(parsed["preview"])

    # Re-read full file for proper analysis
    import io
    if ext == ".csv":
        df = pd.read_csv(io.BytesIO(contents))
    else:
        df = pd.read_excel(io.BytesIO(contents))

    df = df.where(pd.notnull(df), None)

    analysis = analyze_columns(df)
    charts = generate_charts(df, analysis)
    insights = generate_insights(df, analysis)

    result = {
        "rows": int(len(df)),
        "columns": int(len(df.columns)),
        "column_analysis": analysis,
        "charts": charts,
        "insights": insights,
    }
    return jsonable_encoder(result)