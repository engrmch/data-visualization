import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function HistogramView({ chart }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={chart.data} margin={{ bottom: 40 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" />
        <XAxis dataKey="bin" tick={{ fill: "#555", fontSize: 9 }} angle={-35} textAnchor="end" interval={2} />
        <YAxis tick={{ fill: "#555", fontSize: 11 }} />
        <Tooltip contentStyle={tooltipStyle} />
        <Bar dataKey="count" fill="#22d3ee" radius={[3, 3, 0, 0]} />
      </BarChart>
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