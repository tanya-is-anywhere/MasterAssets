from pathlib import Path

from app.services.features import compute_features

paths = [
    Path("D:/otherfiles/РазрабПЦ/MasterAssets/frontend/src/assets/hero.png"),
    Path("D:/otherfiles/РазрабПЦ/MasterAssets/frontend/src/assets/img.png"),
]

for path in paths:
    if not path.exists():
        print(f"Skipping {path} (not found)")
        continue
    print(f"\n=== {path.name} ===")
    f = compute_features(path)
    print(f"histogram size: {len(f['color_histogram'])}")
    print(f"histogram[:5]: {[round(x, 4) for x in f['color_histogram'][:5]]}")
    print(f"histogram sum: {sum(f['color_histogram']):.4f}")
    print(f"phash: {f['phash']}")
    print(f"avg_color: {f['avg_color_rgb']}")
    print(f"brightness: {f['brightness']:.4f}")
    print(f"contrast: {f['contrast']:.4f}")
    print(f"aspect_ratio: {f['aspect_ratio']:.4f}")