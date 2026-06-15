from fastapi import APIRouter

router = APIRouter(
    prefix="/check",
    tags=["Check"]
)

@router.get("/")
def root():
    return {"status": "ok", "message": "NovaBite Sales API is running."}