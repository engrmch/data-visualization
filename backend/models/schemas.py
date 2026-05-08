from pydantic import BaseModel
from typing import Any

class UploadResponse(BaseModel):
    filename: str
    rows: int
    columns: list[str]
    preview: list[dict[str, Any]]