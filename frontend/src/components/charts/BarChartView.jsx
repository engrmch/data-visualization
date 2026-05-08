import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from "recharts";

export default function BarChartView({ chart }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={chart.data} margin={{ bottom: 40 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" />
        <XAxis
          dataKey="label"
          tick={{ fill: "#555", fontSize: 10 }}
          angle={-35}
          textAnchor="end"
          interval={0}
        />
        <YAxis tick={{ fill: "#555", fontSize: 11 }} />
        <Tooltip contentStyle={tooltipStyle} />
        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
          {chart.data.map((_, i) => (
            <Cell key={i} fill={`hsl(${250 + i * 12}, 70%, ${55 + i * 2}%)`} />
          ))}
        </Bar>
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