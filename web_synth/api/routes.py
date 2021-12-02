from flask import Blueprint, request, jsonify
from web_synth.models import db, preset_schema, presets_schema, PresetSchema, Preset
api = Blueprint('api', __name__, url_prefix='/api')

@api.route('/getdata')
def getdata():
    return {'some_value': 'Yes this link worked'}

@api.route('/presets', methods=['POST'])
def create_preset():
    print(request.json)
    print(type(request.json))
    name = request.json['name']
    attack = request.json['attack']
    decay = request.json['decay']
    sustain = request.json['sustain']
    release = request.json['release']
    reverbDryWet = request.json['reverbDryWet']
    reverbSeconds = request.json['reverbSeconds']
    reverbDecayRate = request.json['reverbDecayRate']
    reverbReversePost = request.json['reverbReversePost']
    delayDryWet = request.json['delayDryWet']
    delayTime = request.json['delayTime']
    delayFeedback = request.json['delayFeedback']
    delayFilter = request.json['delayFilter']
    distortionDryWet = request.json['distortionDryWet']
    distortionAmount = request.json['distortionAmount']
    distortionOversample = request.json['distortionOversample']
    
    preset = Preset(name, attack, decay, sustain, release, reverbDryWet, reverbSeconds, reverbDecayRate, reverbReversePost, delayDryWet, delayTime, delayFeedback, delayFilter, distortionDryWet, distortionAmount, distortionOversample)

    db.session.add(preset)
    db.session.commit()
    
    return {"Message": "Success, preset created."}, 201


@api.route('/presets', methods=['GET'])
def get_presets():
    presets = Preset.query.all()
    response = presets_schema.dump(presets)
    return jsonify(response)

@api.route('/presets/<id>', methods = ['GET'])
def get_preset(id):
    preset = Preset.query.get(id)
    response = preset_schema.dump(preset)
    return jsonify(response)

@api.route('/presets/<id>', methods = ['POST', 'PUT'])
def update_preset(id):
    preset = Preset.query.get(id)
    if preset:   
        preset.name = request.json['name']
        preset.attack = request.json['attack']
        preset.decay = request.json['decay']
        preset.sustain = request.json['sustain']
        preset.release = request.json['release']
        preset.reverbDryWet = request.json['reverbDryWet']
        preset.reverbSeconds = request.json['reverbSeconds']
        preset.reverbDecayRate = request.json['reverbDecayRate']
        preset.reverbReversePost = request.json['reverbReversePost']
        preset.delayDryWet = request.json['delayDryWet']
        preset.delayTime = request.json['delayTime']
        preset.delayFeedback = request.json['delayFeedback']
        preset.delayFilter = request.json['delayFilter']
        preset.distortionDryWet = request.json['distortionDryWet']
        preset.distortionAmount = request.json['distortionAmount']
        preset.distortionOversample = request.json['distortionOversample']
        db.session.commit()

        response = preset_schema.dump(preset)
        return jsonify(response)
    else:
        return jsonify({'Error': 'That preset id does not exist'})

@api.route('/presets/<id>', methods = ['DELETE'])
def delete_preset(id):
    preset = Preset.query.get(id)
    print(preset)
    if preset:
        db.session.delete(preset)
        db.session.commit()

        return jsonify({'Success': f'Preset ID: {preset.id} has been deleted'})
    else:
        return jsonify({'Error': 'That preset id does not exist'})
