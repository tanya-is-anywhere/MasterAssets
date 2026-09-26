from pathlib import Path

import numpy as np
from PIL import Image, ImageOps


HIST_BINS_PER_CHANNEL = 32
COLOR_HISTOGRAM_SIZE = HIST_BINS_PER_CHANNEL * 3


def _load_image(path: Path) -> Image.Image:
    img = Image.open(path)
    img = ImageOps.exif_transpose(img)

    if img.mode in ("RGBA", "LA", "P"):
        img = img.convert("RGBA")
        background = Image.new("RGBA", img.size, (255, 255, 255, 255))
        img = Image.alpha_composite(background, img).convert("RGB")
    else:
        img = img.convert("RGB")

    img.thumbnail((512, 512))
    return img


def compute_color_histogram(img: Image.Image) -> list[float]:
    arr = np.asarray(img, dtype=np.uint8)

    hists = []
    for channel in range(3):
        hist, _ = np.histogram(
            arr[:, :, channel],
            bins=HIST_BINS_PER_CHANNEL,
            range=(0, 256),
        )
        hists.append(hist)

    hist = np.concatenate(hists).astype(np.float32)
    total = hist.sum()
    if total > 0:
        hist /= total
    return hist.tolist()


def compute_phash(img: Image.Image, hash_size: int = 8) -> str:
    small = img.convert("L").resize(
        (hash_size * 4, hash_size * 4), Image.Resampling.LANCZOS
    )
    arr = np.asarray(small, dtype=np.float32)
    blocks = arr.reshape(hash_size, 4, hash_size, 4).mean(axis=(1, 3))

    median = np.median(blocks)
    bits = (blocks > median).flatten()

    value = 0
    for bit in bits:
        value = (value << 1) | int(bit)
    return f"{value:016x}"


def compute_avg_color(img: Image.Image) -> str:
    arr = np.asarray(img, dtype=np.float32)
    avg = arr.mean(axis=(0, 1))
    r, g, b = (int(round(x)) for x in avg)
    return f"#{r:02x}{g:02x}{b:02x}"


def compute_brightness(img: Image.Image) -> float:
    gray = np.asarray(img.convert("L"), dtype=np.float32) / 255.0
    return float(gray.mean())


def compute_contrast(img: Image.Image) -> float:
    gray = np.asarray(img.convert("L"), dtype=np.float32) / 255.0
    return float(gray.std())


def compute_features(file_path: str | Path) -> dict:
    path = Path(file_path)
    with _load_image(path) as img:
        return {
            "color_histogram": compute_color_histogram(img),
            "phash": compute_phash(img),
            "avg_color_rgb": compute_avg_color(img),
            "brightness": compute_brightness(img),
            "contrast": compute_contrast(img),
            "aspect_ratio": img.width / img.height if img.height else 1.0,
        }
