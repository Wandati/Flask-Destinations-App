"""Widen location description

Revision ID: d2680c0e07b6
Revises: 291b8abd386c
Create Date: 2026-06-10 23:44:21.233816

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd2680c0e07b6'
down_revision = '291b8abd386c'
branch_labels = None
depends_on = None


def upgrade():
    with op.batch_alter_table('location', schema=None) as batch_op:
        batch_op.alter_column('description',
               existing_type=sa.String(length=200),
               type_=sa.String(),
               existing_nullable=True)


def downgrade():
    with op.batch_alter_table('location', schema=None) as batch_op:
        batch_op.alter_column('description',
               existing_type=sa.String(),
               type_=sa.String(length=200),
               existing_nullable=True)
