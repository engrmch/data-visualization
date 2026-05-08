export default function KpiCards({ chart }) {
  return (
    <div style={styles.grid}>
      {chart.data.map((kpi, i) => (
        <div key={i} style={styles.card}>
          <p style={styles.label}>{kpi.label}</p>
          <p style={styles.value}>{kpi.value.toLocaleString()}</p>
          <div style={styles.row}>
            <span style={styles.meta}>Min: {kpi.min}</span>
            <span style={styles.meta}>Max: {kpi.max}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
    gap: "12px",
  },
  card: {
    background: "#0a0a14",
    border: "1px solid #1e1e30",
    borderRadius: "10px",
    padding: "1rem",
  },
  label: {
    fontSize: "11px",
    color: "#555",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    fontFamily: "'DM Mono', monospace",
    margin: "0 0 6px",
  },
  value: {
    fontSize: "26px",
    fontWeight: 700,
    color: "#f0ede6",
    margin: "0 0 8px",
    fontFamily: "'Bebas Neue', cursive",
    letterSpacing: "0.03em",
  },
  row: { display: "flex", justifyContent: "space-between" },
  meta: { fontSize: "11px", color: "#444", fontFamily: "'DM Mono', monospace" },
};