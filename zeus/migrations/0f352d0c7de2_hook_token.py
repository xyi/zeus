"""hook_token

Revision ID: 0f352d0c7de2
Revises: 5a84554d0f1f
Create Date: 2017-07-11 13:11:18.567499

"""
import zeus
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '0f352d0c7de2'
down_revision = '5a84554d0f1f'
branch_labels = ()
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        'hook_token',
        sa.Column('id', zeus.db.types.guid.GUID(), nullable=False),
        sa.Column('token', sa.LargeBinary(length=64), nullable=False),
        sa.Column('date_created', sa.DateTime(), nullable=False),
        sa.Column('repository_id', zeus.db.types.guid.GUID(), nullable=False),
        sa.ForeignKeyConstraint(['repository_id'], ['repository.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id'), sa.UniqueConstraint('token')
    )
    op.create_index(
        op.f('ix_hook_token_repository_id'), 'hook_token', ['repository_id'], unique=False
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_hook_token_repository_id'), table_name='hook_token')
    op.drop_table('hook_token')
    # ### end Alembic commands ###