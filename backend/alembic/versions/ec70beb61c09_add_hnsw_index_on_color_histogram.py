"""add hnsw index on color histogram

Revision ID: ec70beb61c09
Revises: 569ddb5f7ea5
Create Date: 2026-09-26 11:46:36.490196+00:00

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'ec70beb61c09'
down_revision: Union[str, Sequence[str], None] = '569ddb5f7ea5'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute(
        "CREATE INDEX ix_assets_color_histogram_hnsw "
        "ON assets USING hnsw (color_histogram vector_cosine_ops)"
    )


def downgrade() -> None:
    op.execute("DROP INDEX IF EXISTS ix_assets_color_histogram_hnsw")
