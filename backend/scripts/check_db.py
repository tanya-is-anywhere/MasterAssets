import psycopg

url = "postgresql://asset_user:asset_password@localhost:5432/asset_db"

try:
    with psycopg.connect(url) as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT version();")
            version = cur.fetchone()
            print("Connected:", version[0])

            cur.execute("SELECT * FROM pg_extension WHERE extname = 'vector';")
            if cur.fetchone():
                print("pgvector: installed")
            else:
                print("pgvector: NOT installed")
except Exception as e:
    print("Connection failed:", e)