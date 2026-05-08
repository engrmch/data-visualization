import {
  ScatterChart, Scatter, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

export default function ScatterView({ chart }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <ScatterChart>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" />
        <XAxis dataKey="x" name={chart.x_label} tick={{ fill: "#555", fontSize: 11 }} />
        <YAxis dataKey="y" name={chart.y_label} tick={{ fill: "#555", fontSize: 11 }} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ strokeDasharray: "3 3" }} />
        <Scatter data={chart.data} fill="#f97316" opacity={0.7} />
      </ScatterChart>
    </ResponsiveContainer>
  );
}

const tooltipStyle = {
  background: "#111118",
  border: "1px solid #2a2a3e",
  borderRadius: "8px",
  fontSize: "12px",
  color: "#e8e6e0",
};