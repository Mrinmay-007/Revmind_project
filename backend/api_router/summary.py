from fastapi import APIRouter
from typing import Any

from db import query_one


router = APIRouter(
    prefix="/api",
    tags=["API"]
)
# -------------------------------------------------------
# GET /api/summary
# -------------------------------------------------------

@router.get("/summary", summary="Top-level KPIs")

async def get_summary() -> dict[str, Any]:
    """Return headline KPIs for the full dataset."""

    totals = query_one("""
        SELECT
            ROUND(SUM(net_revenue_usd), 2)   AS total_net_revenue,
            ROUND(SUM(gross_revenue_usd), 2) AS total_gross_revenue,
            SUM(units_sold)                  AS total_units_sold,
            ROUND(SUM(gross_profit_usd), 2)  AS total_gross_profit
        FROM sales
    """)

    top_region = query_one("""
        SELECT region, ROUND(SUM(net_revenue_usd), 2) AS revenue
        FROM sales GROUP BY region ORDER BY revenue DESC LIMIT 1
    """)

    top_channel = query_one("""
        SELECT channel, ROUND(SUM(net_revenue_usd), 2) AS revenue
        FROM sales GROUP BY channel ORDER BY revenue DESC LIMIT 1
    """)

    top_product = query_one("""
        SELECT product_name, ROUND(SUM(net_revenue_usd), 2) AS revenue
        FROM sales GROUP BY product_name ORDER BY revenue DESC LIMIT 1
    """)

    top_category = query_one("""
        SELECT category, ROUND(SUM(net_revenue_usd), 2) AS revenue
        FROM sales GROUP BY category ORDER BY revenue DESC LIMIT 1
    """)

    gpm = round(
        totals["total_gross_profit"] / totals["total_net_revenue"] * 100, 2
    ) if totals["total_net_revenue"] else 0

    return {
        "total_net_revenue_usd":   totals["total_net_revenue"],
        "total_gross_revenue_usd": totals["total_gross_revenue"],
        "total_units_sold":        totals["total_units_sold"],
        "total_gross_profit_usd":  totals["total_gross_profit"],
        "gross_profit_margin_pct": gpm,
        "top_region":    {"name": top_region["region"],       "revenue": top_region["revenue"]},
        "top_channel":   {"name": top_channel["channel"],     "revenue": top_channel["revenue"]},
        "top_product":   {"name": top_product["product_name"],"revenue": top_product["revenue"]},
        "top_category":  {"name": top_category["category"],   "revenue": top_category["revenue"]},
    }
