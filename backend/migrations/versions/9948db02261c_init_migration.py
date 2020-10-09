"""init migration

Revision ID: 9948db02261c
Revises:
Create Date: 2020-10-07 14:17:50.910351

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9948db02261c'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=30), nullable=False),
    sa.Column('email', sa.String(length=30), nullable=False),
    sa.Column('hashed_password', sa.String(length=100), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('boardgames',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=100), nullable=False),
    sa.Column('year_published', sa.Integer(), nullable=True),
    sa.Column('thumb_url', sa.String(length=300), nullable=True),
    sa.Column('msrp', sa.Integer(), nullable=True),
    sa.Column('rank', sa.Integer(), nullable=True),
    sa.Column('forsale', sa.Boolean(), nullable=False),
    sa.Column('fortrade', sa.Boolean(), nullable=False),
    sa.Column('forborrow', sa.Boolean(), nullable=False),
    sa.Column('condition', sa.String(length=10), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user_collection',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('game_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['game_id'], ['boardgames.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('user_id', 'game_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user_collection')
    op.drop_table('boardgames')
    op.drop_table('users')
    # ### end Alembic commands ###
