"""One-time copy of all app data from the local SQLite database to the
database named by DATABASE_URL (e.g. Neon Postgres).

The target schema must already exist (run `flask db upgrade` against the
target first). Existing rows in the target tables are deleted so the copy
is repeatable.

Usage:
    DATABASE_URL=postgresql://... python copy_data.py
"""
import os
import sys

from sqlalchemy import create_engine, MetaData, Table, select, text

SQLITE_URL = "sqlite:///instance/destinations.db"
# Copy order respects foreign keys (parents before children).
TABLES = ["location", "user", "destination", "review", "review_destination"]


def main():
    target_url = os.environ.get("DATABASE_URL")
    if not target_url:
        sys.exit("Set DATABASE_URL to the target database.")
    if target_url.startswith("postgres://"):
        target_url = target_url.replace("postgres://", "postgresql://", 1)
    if target_url.startswith("sqlite"):
        sys.exit("Refusing to copy onto a SQLite target; expected Postgres.")

    source = create_engine(SQLITE_URL)
    target = create_engine(target_url)

    meta = MetaData()
    tables = [Table(name, meta, autoload_with=target) for name in TABLES]

    with source.connect() as src, target.begin() as dst:
        for table in reversed(tables):
            dst.execute(table.delete())
        for table in tables:
            rows = [dict(r._mapping) for r in src.execute(select(table))]
            if rows:
                dst.execute(table.insert(), rows)
            # Keep Postgres id sequences ahead of the copied ids.
            dst.execute(text(
                f"SELECT setval(pg_get_serial_sequence('\"{table.name}\"', 'id'), "
                f"COALESCE((SELECT MAX(id) FROM \"{table.name}\"), 1))"
            ))
            print(f"{table.name}: {len(rows)} rows")


if __name__ == "__main__":
    main()
