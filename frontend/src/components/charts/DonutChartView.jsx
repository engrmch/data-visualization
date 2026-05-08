import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#7c6af7", "#f97316", "#22d3ee", "#f43f5e", "#a3e635", "#facc15", "#e879f9", "#38bdf8"];

export default function DonutChartView({ chart }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={chart.data}
          dataKey="value"
          nameKey="label"
          cx="50%"
          cy="50%"
          innerRadius={65}
          outerRadius={100}
          paddingAngle={3}
        >
          {chart.data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip contentStyle={tooltipStyle} />
        <Legend wrapperStyle={{ fontSize: 12, color: "#888" }} />
      </PieChart>
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