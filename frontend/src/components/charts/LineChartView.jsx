import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from "recharts";

const COLORS = ["#7c6af7", "#f97316", "#22d3ee"];

export default function LineChartView({ chart }) {
  const { series } = chart;
  if (!series?.length) return null;

  const keys = series.map((s) => s.name);
  const allPoints = {};
  series.forEach((s) => {
    s.points.forEach((p) => {
      if (!allPoints[p.x]) allPoints[p.x] = { x: p.x };
      allPoints[p.x][s.name] = p.y;
    });
  });
  const data = Object.values(allPoints);

  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" />
        <XAxis dataKey="x" tick={{ fill: "#555", fontSize: 11 }} />
        <YAxis tick={{ fill: "#555", fontSize: 11 }} />
        <Tooltip contentStyle={tooltipStyle} />
        <Legend wrapperStyle={{ fontSize: 12, color: "#888" }} />
        {keys.map((k, i) => (
          <Line
            key={k}
            type="monotone"
            dataKey={k}
            stroke={COLORS[i % COLORS.length]}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        ))}
      </LineChart>
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