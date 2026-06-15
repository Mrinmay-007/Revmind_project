import sqlite3
import pandas as pd
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "novabite.db")

CSV_PATH = os.path.join(
    os.path.dirname(__file__),
    "data",
    "novabite_sales_data.csv"
)


def seed_db():
    print(f"[seed] Loading CSV from {CSV_PATH} ...")
    df = pd.read_csv("../data/novabite_sales_data.csv")
    print("[seed] Loaded")
    # Normalise column names (strip whitespace)
    df.columns = [c.strip() for c in df.columns]

    con = sqlite3.connect(DB_PATH)
    df.to_sql("sales", con, if_exists="replace", index=False)
    con.execute("CREATE INDEX IF NOT EXISTS idx_month    ON sales(month)")
    con.execute("CREATE INDEX IF NOT EXISTS idx_quarter  ON sales(quarter)")
    con.execute("CREATE INDEX IF NOT EXISTS idx_region   ON sales(region)")
    con.execute("CREATE INDEX IF NOT EXISTS idx_channel  ON sales(channel)")
    con.execute("CREATE INDEX IF NOT EXISTS idx_category ON sales(category)")
    con.commit()
    con.close()
    print(f"[seed] Done — {len(df)} rows written to {DB_PATH}")


if __name__ == "__main__":
    seed_db()
