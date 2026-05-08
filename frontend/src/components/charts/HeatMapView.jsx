export default function HeatmapView({ chart }) {
  const cols = Object.keys(chart.data);
  const getColor = (val) => {
    if (val === null || val === undefined) return "#1a1a2e";
    const abs = Math.abs(val);
    if (val > 0) return `rgba(124, 106, 247, ${abs})`;
    return `rgba(249, 115, 22, ${abs})`;
  };

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th} />
            {cols.map((c) => (
              <th key={c} style={{ ...styles.th, color: "#7c6af7" }}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cols.map((row) => (
            <tr key={row}>
              <td style={{ ...styles.td, color: "#7c6af7", fontWeight: 500 }}>{row}</td>
              {cols.map((col) => {
                const val = chart.data[row]?.[col];
                return (
                  <td key={col} style={{ ...styles.td, background: getColor(val), color: "#f0ede6" }}>
                    {val !== undefined ? val.toFixed(2) : "—"}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontFamily: "'DM Mono', monospace",
    fontSize: "12px",
  },
  th: {
    padding: "8px 12px",
    textAlign: "center",
    color: "#555",
    fontWeight: 500,
    borderBottom: "1px solid #1e1e2e",
  },
  td: {
    padding: "8px 12px",
    textAlign: "center",
    border: "1px solid #1a1a28",
    borderRadius: "4px",
    transition: "opacity 0.2s",
  },
};