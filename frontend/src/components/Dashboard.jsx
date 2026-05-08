import { useState } from "react";
import KpiCards from "./charts/KpiCards";
import LineChart from "./charts/LineChartView";
import BarChartView from "./charts/BarChartView";
import DonutChartView from "./charts/DonutChartView";
import HistogramView from "./charts/HistogramView";
import ScatterView from "./charts/ScatterView";
import HeatmapView from "./charts/HeatmapView";
import DataTableView from "./charts/DataTableView";
import InsightsPanel from "./InsightsPanel";

const CHART_MAP = {
  kpi_cards: KpiCards,
  line_chart: LineChart,
  bar_chart: BarChartView,
  donut_chart: DonutChartView,
  histogram: HistogramView,
  scatter_plot: ScatterView,
  heatmap: HeatmapView,
  data_table: DataTableView,
};

const FULL_WIDTH = ["line_chart", "heatmap", "data_table", "scatter_plot"];

export default function Dashboard({ data }) {
  if (!data) return null;

  const { charts = [], insights = [], rows = 0, columns = 0 } = data;

  return (
    <div style={styles.root}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Data Dashboard</h1>
          <p style={styles.subtitle}>
            {rows.toLocaleString()} rows · {columns} columns
          </p>
        </div>
      </div>

      {/* {insights.length > 0 && <InsightsPanel insights={insights} />} */}

      <div style={styles.grid}>
        {charts.map((chart, i) => {
          const Component = CHART_MAP[chart.type];
          if (!Component) return null;
          return (
            <div
              key={i}
              style={{
                ...styles.card,
                gridColumn: FULL_WIDTH.includes(chart.type) ? "1 / -1" : "span 1",
              }}
            >
              <h2 style={styles.chartTitle}>{chart.title}</h2>
              <Component chart={chart} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function getCardStyle(type) {
  const fullWidth = ["line_chart", "heatmap", "data_table", "scatter_plot"];
  return {
    ...styles.card,
    gridColumn: fullWidth.includes(type) ? "1 / -1" : "span 1",
  };
}

const styles = {
  root: { fontFamily: "'DM Sans', sans-serif", padding: "2rem", background: "#0a0a0f", minHeight: "100vh", color: "#e8e6e0" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem", borderBottom: "1px solid #1e1e2e", paddingBottom: "1.5rem" },
  title: { fontFamily: "'Bebas Neue', cursive", fontSize: "3rem", letterSpacing: "0.05em", color: "#f0ede6", margin: 0 },
  subtitle: { fontSize: "13px", color: "#666", margin: "4px 0 0", fontFamily: "'DM Mono', monospace" },
  grid: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.25rem" },
  card: { background: "#111118", border: "1px solid #1e1e2e", borderRadius: "12px", padding: "1.5rem" },
  chartTitle: { fontSize: "13px", fontWeight: 500, color: "#888", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 1.25rem", fontFamily: "'DM Mono', monospace" },
};