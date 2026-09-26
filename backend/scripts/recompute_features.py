from pathlib import Path
from app.core.database import SessionLocal
from app.models.asset import Asset
from app.services.features import compute_features

db = SessionLocal()
try:
    assets = db.query(Asset).filter(Asset.phash.is_(None)).all()
    for asset in assets:
        path = Path.cwd() / asset.file_path
        if not path.exists():
            print(f"Skip {asset.id}: file not found")
            continue
        features = compute_features(path)
        if features:
            for k, v in features.items():
                setattr(asset, k, v)
            print(f"Updated asset {asset.id}: {asset.file_name}")
    db.commit()
finally:
    db.close()