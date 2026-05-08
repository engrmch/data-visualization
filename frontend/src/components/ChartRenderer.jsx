import React from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid,
  BarChart, Bar, PieChart, Pie, Cell, ScatterChart, Scatter
} from "recharts";

export default function ChartRenderer({ chart }) {
  switch (chart.type) {
    case "kpi_cards":
      return (
        <div>
          <h2>{chart.title}</h2>
          <div style={{ display: "flex", gap: "1rem" }}>
            {chart.data.map((kpi, i) => (
              <div key={i} style={{ border: "1px solid #ccc", padding: "1rem" }}>
                <h3>{kpi.label}</h3>
                <p>Mean: {kpi.value}</p>
              </div>
            ))}
          </div>
        </div>
      );
    // … other chart cases (line_chart, bar_chart, etc.)
    default:
      return null;
  }
}
