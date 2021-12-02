from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_marshmallow import Marshmallow
import secrets

db = SQLAlchemy()
ma = Marshmallow()

class Preset(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    attack = db.Column(db.Numeric(precision=3, scale=2))
    decay = db.Column(db.Numeric(precision=3, scale=2))
    sustain = db.Column(db.Numeric(precision=3, scale=2))
    release = db.Column(db.Numeric(precision=3, scale=2))
    reverbDryWet = db.Column(db.Numeric(precision=3, scale=2))
    reverbSeconds = db.Column(db.Numeric(precision=2))
    reverbSDecayRate = db.Column(db.Numeric(precision=2))
    reverbReversePost = db.Column(db.Boolean)
    delayDryWet = db.Column(db.Numeric(precision=3, scale=2))
    delayTime = db.Column(db.Numeric(precision=3, scale=2))
    delayFeedback = db.Column(db.Numeric(precision=3, scale=2))
    delayFilter = db.Column(db.Numeric(precision=5))
    distortionDryWet = db.Column(db.Numeric(precision=3, scale=2))
    distortionAmount = db.Column(db.Numeric(precision=3, scale=2))
    distortionOversample = db.Column(db.String(4))

    def __init__(self, name, attack, decay, sustain, release, reverbDryWet, reverbSeconds, reverbDecayRate, reverbReversePost, delayDryWet, delayTime, delayFeedback, delayFilter, distortionDryWet, distortionAmount, distortionOversample):
        self.name = name
        self.attack = attack
        self.decay = decay
        self.sustain = sustain
        self.release = release
        self.reverbDryWet = reverbDryWet
        self.reverbSeconds = reverbSeconds
        self.reverbDecayRate = reverbDecayRate
        self.reverbReversePost = reverbReversePost
        self.delayDryWet = delayDryWet
        self.delayTime = delayTime
        self.delayFeedback = delayFeedback
        self.delayFilter = delayFilter
        self.distortionDryWet = distortionDryWet
        self.distortionAmount = distortionAmount
        self.distortionOversample = distortionOversample

        def set_id(self):
            return (secrets.token_urlsafe())

class PresetSchema(ma.Schema):
    class Meta:
        fields = ['id', 'name', 'attack', 'decay', 'sustain', 'release', 'reverbDryWet', 'reverbSeconds', 'reverbDecayRate', 'reverbReversePost', 'delayDryWet', 'delayTime', 'delayFeedback', 'delayFilter', 'distortionDryWet', 'distortionAmount', 'distortionOversample']


preset_schema = PresetSchema()
presets_schema = PresetSchema(many=True)