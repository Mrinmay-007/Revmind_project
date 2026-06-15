import sqlite3

from seed import  DB_PATH


def get_con() -> sqlite3.Connection:
    con = sqlite3.connect(DB_PATH)
    con.row_factory = sqlite3.Row
    return con

def query(sql: str, params: tuple = ()) -> list[dict]:
    with get_con() as con:
        rows = con.execute(sql, params).fetchall()
    return [dict(r) for r in rows]

def query_one(sql: str, params: tuple = ()) -> dict | None:
    rows = query(sql, params)
    return rows[0] if rows else None