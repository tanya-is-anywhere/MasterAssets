from datetime import datetime
from app.models.tag import Tag
from pydantic import BaseModel, ConfigDict, Field, field_validator


class AssetBase(BaseModel):
    file_name: str = Field(min_length=1, max_length=255)
    mime_type: str


class AssetRead(AssetBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    file_path: str
    width: int
    height: int
    size_bytes: int
    owner_id: int
    tags: list[str] = []
    created_at: datetime
    updated_at: datetime

    @field_validator("tags", mode="before")
    @classmethod
    def tags_to_strings(cls, v):
        if not v:
            return []
        return [t.name if isinstance(t, Tag) else str(t) for t in v]

class AssetUpdate(BaseModel):
    tags: list[str] | None = None


class AssetList(BaseModel):
    items: list[AssetRead]
    total: int
    page: int
    page_size: int
