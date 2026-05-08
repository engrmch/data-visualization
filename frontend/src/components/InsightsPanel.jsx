export default function InsightsPanel({ insights }) {
  return (
    <div style={styles.panel}>
      <p style={styles.label}>⚡ Auto-Insights</p>
      <div style={styles.list}>
        {insights.map((insight, i) => (
          <div key={i} style={styles.item}>
            <span style={styles.dot} />
            <span style={styles.text}>{insight}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  panel: {
    background: "#0f0f1a",
    border: "1px solid #2a2a3e",
    borderRadius: "12px",
    padding: "1.25rem 1.5rem",
    marginBottom: "1.5rem",
  },
  label: {
    fontFamily: "'DM Mono', monospace",
    fontSize: "11px",
    color: "#7c6af7",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    margin: "0 0 1rem",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  item: {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
  },
  dot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#7c6af7",
    flexShrink: 0,
    marginTop: "6px",
  },
  text: {
    fontSize: "14px",
    color: "#b0aec8",
    lineHeight: 1.6,
  },
};