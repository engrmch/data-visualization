from fastapi import APIRouter, UploadFile, File, HTTPException
from services.file_parser import parse_file

router = APIRouter(prefix="/upload", tags=["upload"])

ALLOWED_EXTENSIONS = {".csv", ".xls", ".xlsx"}

@router.post("/")
async def upload_file(file: UploadFile = File(...)):
    ext = "." + file.filename.split(".")[-1].lower()

    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(status_code=400, detail="Only .csv, .xls, .xlsx files are allowed.")

    contents = await file.read()

    try:
        result = parse_file(contents, ext)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to parse file: {str(e)}")

    return {
        "filename": file.filename,
        "rows": result["rows"],
        "columns": result["columns"],
        "preview": result["preview"],
    }