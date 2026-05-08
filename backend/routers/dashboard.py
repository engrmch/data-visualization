from fastapi import APIRouter, UploadFile, File, HTTPException
from services.visualizer import build_dashboard

router = APIRouter(prefix="/dashboard", tags=["dashboard"])

ALLOWED = {".csv", ".xls", ".xlsx"}

@router.post("/")
async def generate_dashboard(file: UploadFile = File(...)):
    ext = "." + file.filename.split(".")[-1].lower()
    if ext not in ALLOWED:
        raise HTTPException(status_code=400, detail="Only .csv, .xls, .xlsx files are allowed.")
    contents = await file.read()
    try:
        result = build_dashboard(contents, ext)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    return result