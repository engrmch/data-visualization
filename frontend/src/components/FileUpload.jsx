import { useState, useRef } from "react";
import axios from "axios";

export default function FileUpload({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const inputRef = useRef();

  const ALLOWED = [".csv", ".xls", ".xlsx"];

  const getExt = (name) => name.slice(name.lastIndexOf(".")).toLowerCase();

  const validate = (f) => {
    if (!ALLOWED.includes(getExt(f.name))) {
      setError("Only .csv, .xls, and .xlsx files are allowed.");
      return false;
    }
    if (f.size > 50 * 1024 * 1024) {
      setError("File exceeds 50MB limit.");
      return false;
    }
    return true;
  };

  const handleFile = (f) => {
    setError("");
    setSuccess(false);
    if (validate(f)) setFile(f);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    setUploading(true);
    try {
      await axios.post("http://localhost:8000/upload", formData);
      setSuccess(true);
      // 🔑 Notify parent that upload succeeded
      if (onUploadSuccess) onUploadSuccess(file);
    } catch (err) {
      setError("Upload failed. Is the backend running?");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFile(e.dataTransfer.files[0]);
        }}
        onClick={() => inputRef.current.click()}
        style={{ border: "2px dashed #ccc", padding: "2rem", textAlign: "center", cursor: "pointer" }}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".csv,.xls,.xlsx"
          style={{ display: "none" }}
          onChange={(e) => handleFile(e.target.files[0])}
        />
        <p>Drag & drop or click to upload</p>
        <small>.csv, .xls, .xlsx — max 50MB</small>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {file && (
        <div>
          <p>📄 {file.name} ({(file.size / 1024).toFixed(1)} KB)</p>
          <button onClick={() => setFile(null)}>Remove</button>
          <button onClick={handleUpload} disabled={uploading}>
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      )}

      {success && <p style={{ color: "green" }}>Uploaded successfully!</p>}
    </div>
  );
}
