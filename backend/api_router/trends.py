
from fastapi import APIRouter
from db import query

router = APIRouter(
    prefix="/api",
    tags=["API"]
)

# -------------------------------------------------------
# GET /api/trends
# -------------------------------------------------------

@router.get("/trends", summary="Monthly net revenue trend")    
def get_trends() -> list[dict]:
    """Return net revenue aggregated by calendar month, sorted chronologically."""
    sql = """
        SELECT
            month,
            ROUND(SUM(net_revenue_usd), 2)  AS net_revenue,
            ROUND(SUM(gross_profit_usd), 2) AS gross_profit,
            SUM(units_sold)  AS units_sold
        FROM sales
        GROUP BY month
        ORDER BY month ASC
    """
    return query(sql)
