from pathlib import Path

from fastapi import UploadFile
from PIL import Image
from sqlalchemy import func, select
from sqlalchemy.orm import Session, selectinload

from app.core.storage import delete_file, save_upload
from app.models.asset import Asset
from app.models.tag import Tag
from app.schemas.asset import AssetUpdate
from app.services.user import get_user_by_id  # (см. примечание ниже)


def get_or_create_tags(db: Session, names: list[str]) -> list[Tag]:
    """Возвращает список Tag, создавая отсутствующие."""
    if not names:
        return []

    cleaned = sorted({n.strip().lower() for n in names if n.strip()})
    if not cleaned:
        return []

    stmt = select(Tag).where(Tag.name.in_(cleaned))
    existing = list(db.scalars(stmt))
    existing_by_name = {t.name: t for t in existing}

    result: list[Tag] = []
    for name in cleaned:
        tag = existing_by_name.get(name)
        if tag is None:
            tag = Tag(name=name)
            db.add(tag)
            existing_by_name[name] = tag
        result.append(tag)

    db.flush()  # получить id для новых тегов, не коммитить
    return result


def _extract_dimensions(file_path: Path) -> tuple[int, int]:
    """Возвращает (width, height). Для SVG и битых файлов — (0, 0)."""
    try:
        with Image.open(file_path) as img:
            return img.width, img.height
    except Exception:
        return 0, 0


def list_assets(
    db: Session,
    owner_id: int,
    page: int = 1,
    page_size: int = 50,
) -> tuple[list[Asset], int]:
    """Возвращает (список ассетов, всего_штук)."""
    base = select(Asset).where(Asset.owner_id == owner_id)

    total = db.scalar(
        select(func.count()).select_from(base.subquery())
    ) or 0

    offset = (page - 1) * page_size
    stmt = (
        base.options(selectinload(Asset.tags))
        .order_by(Asset.created_at.desc())
        .offset(offset)
        .limit(page_size)
    )
    assets = list(db.scalars(stmt))
    return assets, total


def get_asset(db: Session, asset_id: int, owner_id: int) -> Asset | None:
    """Найти ассет по id, принадлежащий пользователю."""
    stmt = (
        select(Asset)
        .where(Asset.id == asset_id, Asset.owner_id == owner_id)
        .options(selectinload(Asset.tags))
    )
    return db.scalar(stmt)


def create_asset(db: Session, file: UploadFile, owner_id: int) -> Asset:
    """Сохраняет файл на диск и создаёт запись в БД."""
    relative_path, generated_name = save_upload(file)

    absolute_path = Path.cwd() / relative_path
    width, height = _extract_dimensions(absolute_path)

    size_bytes = absolute_path.stat().st_size

    mime_type = file.content_type or "application/octet-stream"

    original_name = file.filename or generated_name

    asset = Asset(
        file_name=original_name,
        file_path=relative_path,
        mime_type=mime_type,
        width=width,
        height=height,
        size_bytes=size_bytes,
        owner_id=owner_id,
    )
    db.add(asset)
    db.commit()
    db.refresh(asset)
    return asset


def update_asset(
    db: Session,
    asset: Asset,
    data: AssetUpdate,
) -> Asset:
    """Обновляет теги ассета. Не коммитит — коммит делает вызывающий."""
    if data.tags is not None:
        asset.tags = get_or_create_tags(db, data.tags)
    db.commit()
    db.refresh(asset)
    return asset


def delete_asset(db: Session, asset: Asset) -> None:
    """Удаляет файл и запись. Теги-связи удалятся каскадом."""
    file_path = asset.file_path
    db.delete(asset)
    db.commit()
    delete_file(file_path)


def get_similar_assets(
    db: Session,
    asset_id: int,
    owner_id: int,
    limit: int = 5,
) -> list[Asset]:
    """
    Заглушка: возвращает другие ассеты того же пользователя.
    Реальный поиск по эмбеддингам — в B9.
    """
    stmt = (
        select(Asset)
        .where(Asset.owner_id == owner_id, Asset.id != asset_id)
        .options(selectinload(Asset.tags))
        .limit(limit)
    )
    return list(db.scalars(stmt))