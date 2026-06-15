
from pydantic import BaseModel           #type:ignore
import textwrap
from db import query,query_one



class ChatRequest(BaseModel):
    question: str


class ChatResponse(BaseModel):
    answer: str


def build_data_context() -> str:
    """Pull key aggregates from SQLite to give the LLM grounded numbers."""

    # --- Summary KPIs ---
    summary = query_one("""
        SELECT
            ROUND(SUM(net_revenue_usd), 2)    AS total_net_revenue,
            ROUND(SUM(gross_profit_usd), 2)   AS total_gross_profit,
            SUM(units_sold)                   AS total_units
        FROM sales
    """)

    # --- Revenue by region ---
    by_region = query("""
        SELECT region,
               ROUND(SUM(net_revenue_usd), 2) AS net_revenue,
               SUM(units_sold)                AS units
        FROM sales GROUP BY region ORDER BY net_revenue DESC
    """)

    # --- Revenue by channel ---
    by_channel = query("""
        SELECT channel,
               ROUND(SUM(net_revenue_usd), 2) AS net_revenue,
               SUM(units_sold)                AS units
        FROM sales GROUP BY channel ORDER BY net_revenue DESC
    """)

    # --- Revenue by category ---
    by_category = query("""
        SELECT category,
               ROUND(SUM(net_revenue_usd), 2)  AS net_revenue,
               ROUND(SUM(gross_profit_usd), 2) AS gross_profit,
               SUM(units_sold)                 AS units
        FROM sales GROUP BY category ORDER BY net_revenue DESC
    """)

    # --- Revenue by quarter + region ---
    by_quarter_region = query("""
        SELECT quarter, region,
               ROUND(SUM(net_revenue_usd), 2) AS net_revenue
        FROM sales GROUP BY quarter, region ORDER BY quarter, net_revenue DESC
    """)

    # --- Top products by region ---
    top_products_by_region = query("""
        SELECT region, product_name,
               ROUND(SUM(net_revenue_usd), 2) AS net_revenue
        FROM sales
        GROUP BY region, product_name
        ORDER BY region, net_revenue DESC
    """)

    # --- Top sales reps by units (yearly) ---
    top_reps = query("""
        SELECT
            sales_rep,
            SUBSTR(date, 1, 4) AS year,
            SUM(units_sold)    AS units,
            ROUND(SUM(net_revenue_usd), 2) AS net_revenue
        FROM sales
        GROUP BY sales_rep, year
        ORDER BY year, units DESC
    """)

    def fmt(rows: list[dict]) -> str:
        if not rows:
            return "  (no data)"
        lines = []
        for r in rows:
            lines.append("  " + ", ".join(f"{k}={v}" for k, v in r.items()))
        return "\n".join(lines)

    return textwrap.dedent(f"""
    === NovaBite Sales Data Context (Jan 2024 – Dec 2025) ===

    [OVERALL KPIs]
    Total Net Revenue: ${summary['total_net_revenue']:,}  
    Total Gross Profit: ${summary['total_gross_profit']:,}
    Total Units Sold: {summary['total_units']:,}

    [NET REVENUE BY REGION]
{fmt(by_region)}

    [NET REVENUE BY CHANNEL]
{fmt(by_channel)}

    [METRICS BY CATEGORY]
{fmt(by_category)}

    [NET REVENUE BY QUARTER & REGION]
{fmt(by_quarter_region)}

    [TOP PRODUCTS BY REGION (all products)]
{fmt(top_products_by_region)}

    [TOP SALES REPS BY UNITS (per year)]
{fmt(top_reps)}
    """).strip()
