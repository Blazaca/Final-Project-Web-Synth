"""empty message

Revision ID: 5b418670d174
Revises: 
Create Date: 2021-12-02 12:30:14.278760

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5b418670d174'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('preset',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=True),
    sa.Column('attack', sa.Numeric(precision=3, scale=2), nullable=True),
    sa.Column('decay', sa.Numeric(precision=3, scale=2), nullable=True),
    sa.Column('sustain', sa.Numeric(precision=3, scale=2), nullable=True),
    sa.Column('release', sa.Numeric(precision=3, scale=2), nullable=True),
    sa.Column('reverbDryWet', sa.Numeric(precision=3, scale=2), nullable=True),
    sa.Column('reverbSeconds', sa.Numeric(precision=2), nullable=True),
    sa.Column('reverbSDecayRate', sa.Numeric(precision=2), nullable=True),
    sa.Column('reverbReversePost', sa.Boolean(), nullable=True),
    sa.Column('delayDryWet', sa.Numeric(precision=3, scale=2), nullable=True),
    sa.Column('delayTime', sa.Numeric(precision=3, scale=2), nullable=True),
    sa.Column('delayFeedback', sa.Numeric(precision=3, scale=2), nullable=True),
    sa.Column('delayFilter', sa.Numeric(precision=5), nullable=True),
    sa.Column('distortionDryWet', sa.Numeric(precision=3, scale=2), nullable=True),
    sa.Column('distortionAmount', sa.Numeric(precision=3, scale=2), nullable=True),
    sa.Column('distortionOversample', sa.String(length=4), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('presets')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('presets',
    sa.Column('sustain', sa.NUMERIC(precision=3, scale=2), autoincrement=False, nullable=True),
    sa.Column('reverbSeconds', sa.NUMERIC(precision=2, scale=0), autoincrement=False, nullable=True),
    sa.Column('reverbReversePost', sa.BOOLEAN(), autoincrement=False, nullable=True),
    sa.Column('reverbDryWet', sa.NUMERIC(precision=3, scale=2), autoincrement=False, nullable=True),
    sa.Column('reverbDecayRate', sa.NUMERIC(precision=2, scale=0), autoincrement=False, nullable=True),
    sa.Column('release', sa.NUMERIC(precision=3, scale=2), autoincrement=False, nullable=True),
    sa.Column('name', sa.VARCHAR(length=100), autoincrement=False, nullable=True),
    sa.Column('id', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('distortionDryWet', sa.NUMERIC(precision=3, scale=2), autoincrement=False, nullable=True),
    sa.Column('distortionAmount', sa.NUMERIC(precision=3, scale=2), autoincrement=False, nullable=True),
    sa.Column('delayTime', sa.NUMERIC(precision=3, scale=2), autoincrement=False, nullable=True),
    sa.Column('delayFilter', sa.NUMERIC(precision=5, scale=0), autoincrement=False, nullable=True),
    sa.Column('delayFeedback', sa.NUMERIC(precision=3, scale=2), autoincrement=False, nullable=True),
    sa.Column('delayDryWet', sa.NUMERIC(precision=3, scale=2), autoincrement=False, nullable=True),
    sa.Column('decay', sa.NUMERIC(precision=3, scale=2), autoincrement=False, nullable=True),
    sa.Column('attack', sa.NUMERIC(precision=3, scale=2), autoincrement=False, nullable=True),
    sa.Column('distortionOversample', sa.VARCHAR(length=4), autoincrement=False, nullable=True),
    sa.PrimaryKeyConstraint('id', name='presets_pkey')
    )
    op.drop_table('preset')
    # ### end Alembic commands ###
