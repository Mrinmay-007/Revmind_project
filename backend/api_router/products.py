
from fastapi import APIRouter
from db import query


router = APIRouter(
    prefix="/api",
    tags=["API"]
)

# -----------------------------------------------
# GET /api/products
# -----------------------------------------------

@router.get("/products", summary="All products with aggregated metrics")

def get_products() -> list[dict]:
    """Return every distinct product with total net revenue and units sold."""
    sql = """
        SELECT
            sku,
            product_name,
            category,
            subcategory,
            ROUND(SUM(net_revenue_usd), 2)  AS total_net_revenue,
            SUM(units_sold)                 AS total_units_sold,
            ROUND(AVG(unit_price_usd), 2)   AS avg_unit_price
        FROM sales
        GROUP BY sku, product_name, category, subcategory
        ORDER BY total_net_revenue DESC
    """
    return query(sql)
