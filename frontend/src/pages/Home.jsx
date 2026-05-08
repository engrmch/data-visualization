import { useState } from "react";
import { generateDashboard } from "../services/api";
import Dashboard from "../components/Dashboard";

const taglineWords = ["Upload.", "Analyze.", "Understand."];

export default function Home() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError("");
    setData(null);
    try {
      const res = await generateDashboard(file);
      setData(res.data);
    } catch (err) {
      if (err.response) {
        setError(`Server error: ${err.response.data.detail}`);
      } else if (err.request) {
        setError("Cannot reach backend. Is FastAPI running on port 8000?");
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;600&family=DM+Mono:wght@400;500&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes titleIn {
          from { opacity: 0; letter-spacing: 0.4em; }
          to   { opacity: 1; letter-spacing: 0.12em; }
        }
        @keyframes pulseRing {
          0%   { box-shadow: 0 0 0 0 rgba(124,106,247,0.35); }
          70%  { box-shadow: 0 0 0 10px rgba(124,106,247,0); }
          100% { box-shadow: 0 0 0 0 rgba(124,106,247,0); }
        }
        .dv-title {
          font-family: 'Bebas Neue', cursive;
          font-size: clamp(3.5rem, 10vw, 6rem);
          color: #f0ede6;
          letter-spacing: 0.12em;
          margin: 0;
          animation: titleIn 0.9s cubic-bezier(0.16,1,0.3,1) both;
        }
        .dv-word {
          display: inline-block;
          opacity: 0;
          animation: fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards;
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem;
          font-weight: 400;
          letter-spacing: 0.02em;
        }
        .dv-word:nth-child(1) { animation-delay: 0.5s; color: #7c6af7; }
        .dv-word:nth-child(2) { animation-delay: 0.75s; color: #a89ff7; }
        .dv-word:nth-child(3) { animation-delay: 1s;    color: #d0cbf9; }
        .dv-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: #3a3a52;
          margin: 0;
          opacity: 0;
          animation: fadeUp 0.6s 1.3s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        .dv-dropzone {
          opacity: 0;
          animation: fadeUp 0.6s 1.5s cubic-bezier(0.16,1,0.3,1) forwards;
          border: 1.5px dashed #2a2a3e;
          border-radius: 14px;
          padding: 2.5rem 3rem;
          text-align: center;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
          background: #0e0e18;
          position: relative;
          width: 100%;
          max-width: 420px;
          box-sizing: border-box;
        }
        .dv-dropzone:hover {
          border-color: #7c6af7;
          background: #11111f;
        }
        .dv-dropzone input[type="file"] {
          position: absolute;
          inset: 0;
          opacity: 0;
          cursor: pointer;
          width: 100%;
          height: 100%;
        }
        .dv-upload-icon {
          font-size: 2rem;
          margin-bottom: 0.5rem;
          display: block;
        }
        .dv-drop-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #c8c4e0;
          margin: 0 0 4px;
        }
        .dv-drop-hint {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          color: #3a3a52;
          margin: 0;
        }
        .dv-file-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #13131f;
          border: 1px solid #2a2a3e;
          border-radius: 999px;
          padding: 6px 14px;
          font-family: 'DM Mono', monospace;
          font-size: 12px;
          color: #888;
          opacity: 0;
          animation: fadeUp 0.4s 0.1s forwards;
          max-width: 380px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .dv-btn {
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 600;
          background: #7c6af7;
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 0.85rem 2.5rem;
          cursor: pointer;
          transition: background 0.15s, transform 0.1s;
          opacity: 0;
          animation: fadeUp 0.4s 0.2s forwards;
        }
        .dv-btn:hover:not(:disabled) {
          background: #6a58e0;
          transform: translateY(-1px);
          animation: pulseRing 1.5s infinite;
        }
        .dv-btn:disabled {
          opacity: 0.5;
          cursor: wait;
        }
        .dv-error {
          font-family: 'DM Mono', monospace;
          font-size: 12px;
          color: #f43f5e;
          background: #1a0d10;
          border: 1px solid #3a1520;
          border-radius: 8px;
          padding: 10px 16px;
          max-width: 380px;
          text-align: center;
        }
        .dv-back {
          background: transparent;
          border: none;
          color: #3a3a52;
          cursor: pointer;
          padding: 1rem 2rem;
          font-size: 12px;
          font-family: 'DM Mono', monospace;
          transition: color 0.15s;
        }
        .dv-back:hover { color: #7c6af7; }
        .dv-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          max-width: 420px;
          opacity: 0;
          animation: fadeUp 0.6s 1.7s forwards;
        }
        .dv-divider-line {
          flex: 1;
          height: 1px;
          background: #1e1e2e;
        }
        .dv-divider-text {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          color: #2a2a3e;
          letter-spacing: 0.1em;
        }
        .dv-formats {
          display: flex;
          gap: 8px;
          opacity: 0;
          animation: fadeUp 0.6s 1.85s forwards;
        }
        .dv-fmt-badge {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          color: #3a3a52;
          border: 1px solid #1e1e2e;
          border-radius: 999px;
          padding: 3px 10px;
          letter-spacing: 0.05em;
        }
      `}</style>

      <div style={styles.root}>
        {!data && (
          <div style={styles.uploadBox}>
            <h1 className="dv-title">DATAVERA</h1>

            <div style={{ display: "flex", gap: "10px", alignItems: "baseline" }}>
              {taglineWords.map((word, i) => (
                <span key={i} className="dv-word">{word}</span>
              ))}
            </div>

            <p className="dv-sub">Drop your spreadsheet and get a full visual dashboard in seconds.</p>

            <div className="dv-dropzone">
              <input
                type="file"
                accept=".csv,.xls,.xlsx"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <span className="dv-upload-icon">📂</span>
              <p className="dv-drop-label">Drag & drop or click to browse</p>
              <p className="dv-drop-hint">{file ? file.name : "No file selected"}</p>
            </div>

            <div className="dv-divider">
              <div className="dv-divider-line" />
              <span className="dv-divider-text">SUPPORTED FORMATS</span>
              <div className="dv-divider-line" />
            </div>

            <div className="dv-formats">
              {[".csv", ".xls", ".xlsx"].map((fmt) => (
                <span key={fmt} className="dv-fmt-badge">{fmt}</span>
              ))}
            </div>

            {file && (
              <div className="dv-file-pill">
                📄 {file.name} &nbsp;·&nbsp; {(file.size / 1024).toFixed(1)} KB
              </div>
            )}

            {file && (
              <button className="dv-btn" onClick={handleUpload} disabled={loading}>
                {loading ? "Analyzing..." : "Generate Dashboard →"}
              </button>
            )}

            {error && <p className="dv-error">{error}</p>}
          </div>
        )}

        {data && (
          <>
            <button className="dv-back" onClick={() => { setData(null); setFile(null); }}>
              ← Upload New File
            </button>
            <Dashboard data={data} />
          </>
        )}
      </div>
    
      {!data && (
        <footer style={styles.footer}>
          <span style={styles.footerDot} />
          <p style={styles.footerText}>
            Crafted by <span style={styles.footerName}>Engr. Michelle Pamin, ECE, ECT</span>
          </p>
          <span style={styles.footerDot} />
        </footer>
      )}
    </>
  );
}

const styles = {
  root: { background: "#0a0a0f", minHeight: "100vh" },
  uploadBox: {
    display: "flex", flexDirection: "column", alignItems: "center",
    justifyContent: "center", minHeight: "100vh", gap: "1.25rem", padding: "2rem",
  },
  footer: {
    position: "fixed",
    bottom: "1.5rem",
    left: 0,
    right: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  },
  footerDot: {
    width: "4px",
    height: "4px",
    borderRadius: "50%",
    background: "#2a2a3e",
    display: "inline-block",
  },
  footerText: {
    fontFamily: "'DM Mono', monospace",
    fontSize: "11px",
    color: "#2a2a3e",
    margin: 0,
    letterSpacing: "0.08em",
  },
  footerName: {
    color: "#7c6af7",
    fontWeight: 500,
  },
};