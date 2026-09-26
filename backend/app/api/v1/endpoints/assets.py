from typing import Annotated

from fastapi import APIRouter, Depends, File, HTTPException, Query, UploadFile
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.core.database import get_db
from app.models.user import User
from app.schemas.asset import AssetList, AssetRead, AssetUpdate
from app.services.asset import (
    create_asset,
    delete_asset,
    get_asset,
    list_assets,
    update_asset,
)

router = APIRouter()

@router.get("", response_model=AssetList)
def list_my_assets(
    current_user: Annotated[User, Depends(get_current_user)],
    db: Annotated[Session, Depends(get_db)],
    page: int = Query(1, ge=1),
    page_size: int = Query(50, ge=1, le=100),
):
    assets, total = list_assets(db, current_user.id, page, page_size)
    return AssetList(items=assets, total=total, page=page, page_size=page_size)


@router.post("/upload", response_model=AssetRead, status_code=201)
def upload_asset(
    current_user: Annotated[User, Depends(get_current_user)],
    db: Annotated[Session, Depends(get_db)],
    file: UploadFile = File(...),
):
    try:
        asset = create_asset(db, file, current_user.id)
    except ValueError as e:
        raise HTTPException(400, str(e))
    return asset

@router.get("/{asset_id}", response_model=AssetRead)
def get_one_asset(
    asset_id: int,
    current_user: Annotated[User, Depends(get_current_user)],
    db: Annotated[Session, Depends(get_db)],
):
    asset = get_asset(db, asset_id, current_user.id)
    if asset is None:
        raise HTTPException(404, "Asset not found")
    return asset

@router.patch("/{asset_id}", response_model=AssetRead)
def update_one_asset(
    asset_id: int,
    data: AssetUpdate,
    current_user: Annotated[User, Depends(get_current_user)],
    db: Annotated[Session, Depends(get_db)],
):
    asset = get_asset(db, asset_id, current_user.id)
    if asset is None:
        raise HTTPException(404, "Asset not found")
    return update_asset(db, asset, data)

@router.delete("/{asset_id}", status_code=204)
def delete_one_asset(
    asset_id: int,
    current_user: Annotated[User, Depends(get_current_user)],
    db: Annotated[Session, Depends(get_db)],
):
    asset = get_asset(db, asset_id, current_user.id)
    if asset is None:
        raise HTTPException(404, "Asset not found")
    delete_asset(db, asset)
    return None

