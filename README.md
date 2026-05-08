# DATAVERA
### Upload. Analyze. Understand.

> A full-stack data visualization dashboard that transforms CSV and Excel files into rich, interactive charts — automatically.

![Made with FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=flat-square&logo=fastapi)
![Made with React](https://img.shields.io/badge/Frontend-React_18-61DAFB?style=flat-square&logo=react)
![Made with Recharts](https://img.shields.io/badge/Charts-Recharts-22d3ee?style=flat-square)
![Made with Pandas](https://img.shields.io/badge/Data-Pandas-150458?style=flat-square&logo=pandas)

---

## What is Datavera?

Datavera is a self-hosted data dashboard tool that takes any `.csv`, `.xls`, or `.xlsx` file and instantly generates a full visual report — no manual chart setup, no drag-and-drop builders, no subscriptions. Just upload and understand.

---

## Features

- **Auto-generated dashboards** — detects column types and picks the best chart for each
- **KPI summary cards** — mean, min, max at a glance
- **Line charts** — time series trends detected automatically
- **Bar charts** — categorical breakdowns ranked by value
- **Donut charts** — proportional distribution of categories
- **Histograms** — frequency distribution of numeric columns
- **Scatter plots** — correlation between two numeric variables
- **Correlation heatmap** — full matrix of numeric relationships
- **AI-powered insights** — auto-flags missing values, outliers, and strong correlations
- **Paginated data table** — preview your raw data in-app
- **Drag & drop upload** — with file validation and size limits

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Recharts, Axios |
| Backend | FastAPI, Uvicorn |
| Data Processing | Pandas, NumPy, OpenPyXL |
| Styling | Inline CSS, Google Fonts (Bebas Neue, DM Sans, DM Mono) |
| Build Tool | Vite |

---

## Project Structure

```
datavera/
├── backend/
│   ├── main.py                  # FastAPI app entry point
│   ├── requirements.txt
│   ├── routers/
│   │   ├── upload.py            # /upload endpoint
│   │   └── dashboard.py         # /dashboard endpoint
│   ├── services/
│   │   ├── file_parser.py       # CSV/Excel parsing logic
│   │   └── visualizer.py        # Chart + insight generation engine
│   ├── models/
│   │   └── schemas.py           # Pydantic response models
│   └── uploads/                 # Temp storage for uploaded files
│
└── frontend/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── App.jsx
        ├── main.jsx
        ├── pages/
        │   └── Home.jsx          # Upload screen
        ├── services/
        │   └── api.js            # Axios API calls
        └── components/
            ├── Dashboard.jsx     # Main dashboard layout
            ├── InsightsPanel.jsx # Auto-insights display
            └── charts/
                ├── KpiCards.jsx
                ├── LineChartView.jsx
                ├── BarChartView.jsx
                ├── DonutChartView.jsx
                ├── HistogramView.jsx
                ├── ScatterView.jsx
                ├── HeatmapView.jsx
                └── DataTableView.jsx
```

---

## Getting Started

### Prerequisites

- Python 3.9+
- Node.js 18+
- npm

### 1. Clone the repository

```bash
git clone https://github.com/your-username/datavera.git
cd datavera
```

### 2. Set up the backend

```bash
cd backend
pip install fastapi uvicorn python-multipart pandas numpy openpyxl xlrd scipy
```

Save dependencies:
```bash
pip freeze > requirements.txt
```

Run the backend:
```bash
uvicorn main:app --reload
```

Backend runs at → `http://localhost:8000`

### 3. Set up the frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at → `http://localhost:5173`

### 4. Open the app

Visit `http://localhost:5173`, upload a `.csv` or `.xlsx` file, and your dashboard generates automatically.

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Health check |
| `POST` | `/upload/` | Upload and parse a file |
| `POST` | `/dashboard/` | Upload file and generate full dashboard data |

Interactive API docs available at `http://localhost:8000/docs`

---

## Supported File Types

| Format | Extension |
|---|---|
| Comma-Separated Values | `.csv` |
| Excel Workbook | `.xlsx` |
| Legacy Excel | `.xls` |

Maximum file size: **50MB**

---

## Auto-Generated Charts

Datavera analyzes your columns and automatically selects the most appropriate visualizations:

| Chart Type | Trigger Condition |
|---|---|
| KPI Cards | Any numeric columns present |
| Line Chart | Date/time column + numeric columns |
| Bar Chart | Categorical + numeric columns (≤30 unique categories) |
| Donut Chart | Categorical column with ≤10 unique values |
| Histogram | Any numeric column |
| Scatter Plot | 2 or more numeric columns |
| Correlation Heatmap | 2 or more numeric columns |
| Data Table | Always — shows first 20 rows with pagination |

---

## Environment Notes

- CORS is configured for `http://localhost:5173` by default
- To deploy, update `allow_origins` in `backend/main.py` to your production frontend URL
- React 18.2.0 is required — Recharts 2.x is not compatible with React 19

---

## Author

Crafted with care by **Mich**

---

## License

This project is open source and available under the [MIT License](LICENSE).
