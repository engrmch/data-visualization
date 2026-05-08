import pandas as pd
import io

def parse_file(contents: bytes, ext: str) -> dict:
    if ext == ".csv":
        df = pd.read_csv(io.BytesIO(contents))
    elif ext in [".xls", ".xlsx"]:
        df = pd.read_excel(io.BytesIO(contents))
    else:
        raise ValueError("Unsupported file type")

    df = df.where(pd.notnull(df), None)  # replace NaN with None

    return {
        "rows": len(df),
        "columns": df.columns.tolist(),
        "preview": df.head(10).to_dict(orient="records"),
    }