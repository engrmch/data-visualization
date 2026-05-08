import { useState } from "react";

export default function DataTableView({ chart }) {
  const [page, setPage] = useState(0);

  if (!chart || !chart.rows || !chart.columns) return null;

  const pageSize = 10;
  const totalPages = Math.ceil(chart.rows.length / pageSize);
  const visible = chart.rows.slice(page * pageSize, page * pageSize + pageSize);

  return (
    <div>
      <div style={{ overflowX: "auto" }}>
        <table style={styles.table}>
          <thead>
            <tr>
              {chart.columns.map((col) => (
                <th key={col} style={styles.th}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map((row, i) => (
              <tr key={i} style={i % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                {row.map((cell, j) => (
                  <td key={j} style={styles.td}>
                    {cell !== null && cell !== undefined ? String(cell) : "—"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div style={styles.pagination}>
          <button
            style={styles.pgBtn}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
          >←</button>
          <span style={styles.pgInfo}>Page {page + 1} of {totalPages}</span>
          <button
            style={styles.pgBtn}
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
          >→</button>
        </div>
      )}
    </div>
  );
}

const styles = {
  table: { width: "100%", borderCollapse: "collapse", fontSize: "12px", fontFamily: "'DM Mono', monospace" },
  th: { padding: "10px 12px", textAlign: "left", color: "#7c6af7", fontWeight: 500, borderBottom: "1px solid #1e1e2e", whiteSpace: "nowrap" },
  td: { padding: "8px 12px", color: "#b0aec8", borderBottom: "1px solid #13131f", whiteSpace: "nowrap", maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis" },
  rowEven: { background: "transparent" },
  rowOdd: { background: "#0d0d18" },
  pagination: { display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginTop: "1rem" },
  pgBtn: { background: "#1a1a2e", border: "1px solid #2a2a3e", borderRadius: "6px", color: "#e8e6e0", padding: "6px 14px", cursor: "pointer", fontSize: "14px" },
  pgInfo: { fontSize: "12px", color: "#555", fontFamily: "'DM Mono', monospace" },
};