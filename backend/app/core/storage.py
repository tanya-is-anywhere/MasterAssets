import shutil
import uuid
from pathlib import Path

from fastapi import UploadFile

from app.core.config import settings

ALLOWED_MIME_TYPES = {
    "image/png",
    "image/jpeg",
    "image/webp",
    "image/svg+xml",
}

MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024


def get_storage_root() -> Path:
    """Возвращает корневую папку хранилища, создаёт её при необходимости."""
    root = Path(settings.STORAGE_PATH)
    root.mkdir(parents=True, exist_ok=True)
    return root


def generate_unique_filename(original_name: str) -> str:
    """UUID + оригинальное расширение. Пример: 'a1b2...-....png'."""
    ext = Path(original_name).suffix.lower()
    return f"{uuid.uuid4().hex}{ext}"


def validate_upload(file: UploadFile) -> None:
    """Проверяет MIME-тип и размер. Кидает ValueError при проблеме."""
    if file.content_type not in ALLOWED_MIME_TYPES:
        raise ValueError(
            f"Unsupported file type: {file.content_type}. "
            f"Allowed: {', '.join(sorted(ALLOWED_MIME_TYPES))}"
        )

    file.file.seek(0, 2)
    size = file.file.tell()
    file.file.seek(0)

    if size > MAX_FILE_SIZE_BYTES:
        raise ValueError(
            f"File too large: {size} bytes. Max: {MAX_FILE_SIZE_BYTES} bytes"
        )


def save_upload(file: UploadFile) -> tuple[str, str]:
    """
    Сохраняет файл на диск.
    Возвращает (относительный_путь, имя_файла).
    """
    validate_upload(file)

    filename = generate_unique_filename(file.filename or "upload")
    root = get_storage_root()
    dest = (root / filename).resolve()

    with dest.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Путь относительно cwd, в POSIX-формате (со слешами /)
    try:
        relative_path = dest.relative_to(Path.cwd().resolve())
    except ValueError:
        # Если по какой-то причине не получилось — берём как есть
        relative_path = dest

    return str(relative_path).replace("\\", "/"), filename

def delete_file(file_path: str) -> bool:
    """
    Удаляет файл по относительному пути.
    Возвращает True, если удалил, False — если файла не было.
    """
    path = Path(file_path)
    if not path.is_absolute():
        path = Path.cwd() / path

    if path.exists():
        path.unlink()
        return True
    return False
