let poly, playSynth, keyboardImg, reverb, waveformView, post, init, reverbDryWetSlider;
let octave, velocity;
// These are all the post variables
let attack, decay, sustain, release, reverbDryWet;
let reverbReverse, reverbSeconds, reverbDecayRate, checkboxReverbReverse, reverbReversePost;
let delayTime, delayFeedback, delayFilter, delayDryWet;
let distortionDryWet, distortionAmount, distortionOversample;
let hpFilter, lpFilter, fileName;

// post variables for global use //

attack = 0.6;
decay = 0.1;
sustain = 0.9;
release = 0.3;

reverbDryWet = 0;
reverbSeconds = 3;
reverbDecayRate = 2;
// Can't currently use bool to string for post so using reverbReversePost
reverbReverse = false;
reverbReversePost = false;

delayDryWet = 0;
delayTime = .5;
delayFeedback = .75;
delayFilter = 2300;

distortionDryWet = 0;
distortionAmount = .5;
distortionOversample = 'none'
fileName = ''


post = {
"name": fileName,
"attack": attack,
"decay": decay,
"sustain": sustain,
"release": release,
"reverbDryWet": reverbDryWet,
"reverbSeconds": reverbSeconds,
"reverbDecayRate": reverbDecayRate,
"reverbReversePost": reverbReversePost,
"delayDryWet": delayDryWet,
"delayTime": delayTime,
"delayFeedback": delayFeedback,
"delayFilter": delayFilter,
"distortionDryWet": distortionDryWet,
"distortionAmount": distortionAmount,
"distortionOversample": distortionOversample
}

 octave = 3;
 velocity = 0.5;

var preset;
getPresets()



let fileNumber = 9999

// END //

var SynthSketch = function(a) {
    a.preload = function() {
        a.keyboardImg = a.loadImage('../../static/images/keyboard-layout.png');
        a.poly = new p5.PolySynth();
        a.reverb = new p5.Reverb();
        a.delay = new p5.Delay();
        a.distortion = new p5.Distortion();
        a.highPass = new p5.HighPass();
        a.panner = new p5.Panner3D();
        a.outputVolume(.3)
        
    }
    draw = function() {
        a.background('grey')
        a.text('Keyboard Layout', 670, 40);
        a.image(a.keyboardImg, 500, 50);
        a.text('Hello and welcome to web synth!', 250, 400);
        a.text('Here is a quick overview of general instructions to get started...', 250, 425);
        a.text('The keyboard layout up top is your keys matched to the piano for playing. Note: The semicolon and Apostrophe do not work.', 250, 450);
        a.text('The key "Z" will lower the octave of the current keys and "C" will raise it.', 250, 475);
        a.text('Selecting a preset and loading it will overwrite the current synth settings.', 250, 500);
        a.text("Lastly, I won't give you too much info on how these sliders work. Experiment and have fun:)", 250, 525)
        a.text('!! Please take care of your hearing by lowering the output volume and raising it slowly for', 250, 550)
        a.text('the most pleasing experience !!', 250, 575)
        a.text('Output Volume', 310, 45)
        a.text('Attack', 95, 50)
        a.text('Decay?', 90, 80)
        a.text('Sustain', 90, 110)
        a.text('Release?', 85, 140)
        a.text('Highpass', 315, 95)
        a.text('Frequency', 315, 113)
        a.text('Reverb', 50, 203)
        a.text('Dry / Wet', 85, 220);
        a.text('Seconds', 85, 250)
        a.text('Decay', 90, 280)
        a.text('Delay', 90, 325)
        a.text('Dry / Wet', 85, 345)
        a.text('Time', 90, 375)
        a.text('Feedback', 80, 410)
        a.text('Filter Frequency', 65, 445)
        a.text('Distortion', 83, 490);
        a.text('Dry / Wet', 85, 510);
        a.text('Amount', 85, 540)
        a.text('Oversample Rate', 60, 570)
    }
    a.setup = function() { 
        a.createCanvas(950, 900);
        a.background('white');
        

        synthDraw();
        
    }
    
    function synthDraw() {
        
        a.setOutputVolume = a.createSlider(0, 1, .3, .01).input(function() {
            a.outputVolume(a.setOutputVolume.value())
        }).position(250, 50)
        

    //     // ADSR BEGIN //
        
        a.poly.setADSR(attack, decay, sustain, release);

        
        setAttack = a.createSlider(0, 3.5, attack, .01).input(function() {
            attack = setAttack.value();
            a.poly.setADSR(setAttack.value(), decay, sustain, release);
            updatePost()
        })
        setAttack.position(10, 50)
        
        
        setDecay = a.createSlider(0, 3.5, decay, .01).input(function() {
            decay = setDecay.value();
            a.poly.setADSR(attack, setDecay.value(), sustain, release);
            updatePost()
        })
        setDecay.position(10, 80)

        
        setSustain = a.createSlider(0, 1, sustain, .01).input(function() {
            sustain = setSustain.value();
            a.poly.setADSR(attack, decay, setSustain.value(), release);
            updatePost()
        })
        setSustain.position(10, 110)

        
        setRelease = a.createSlider(0, 8, decay, .01).input(function() {
            release = setRelease.value();
            a.poly.setADSR(attack, decay, sustain, setRelease.value());
            updatePost()
        })
        setRelease.position(10, 140)

        

    //     // ADSR END // 

    //     // FILTERING SECTION //

        
        setHPFilter = a.createSlider(10, 22050, 0, 1).input(function() {
            a.highPass.freq(setHPFilter.value())
            console.log(setHPFilter.value())
        }).position(250, 115)

    //     // FILTERING END //

        // REVERB SECTION //
        

        a.reverb.process(a.distortion, reverbSeconds, reverbDecayRate, reverbReverse)
        a.reverb.drywet(reverbDryWet)

        reverbDryWetSlider = a.createSlider(0, 1, reverbDryWet, .001).input(function() {
            reverbDryWet = reverbDryWetSlider.value()
            a.reverb.drywet(reverbDryWetSlider.value())
            updatePost()
        }).position(10, 220);
        

        setReverbSeconds = a.createSlider(0, 10, reverbSeconds, 0.01).input(function() {
            reverbSeconds = setReverbSeconds.value()
            a.reverb.process(a.poly, setReverbSeconds.value(), reverbDecayRate, reverbReverse)
            updatePost()
        }).position(10, 250);
        

        setReverbDecayRate = a.createSlider(0, 100, reverbDecayRate, .1).input(function() {
            reverbDecayRate = setReverbDecayRate.value()
            a.reverb.process(a.poly, reverbSeconds, setReverbDecayRate.value(), reverbReverse)
            updatePost()
        }).position(10, 280)
        

        ButtonReverbReverse = a.createButton('Reverse').position(120, 175)
        ButtonReverbReverse.mousePressed(setReverbReverse);


    //     // REVERB END //

    //     // DELAY START //

        // delay.process() accepts 4 parameters:
        // source, delayTime (in seconds), feedback, filter frequency
        // let delayTime, delayFeedback, delayFilter;
        a.delay.process(a.poly, delayTime, delayFeedback, delayFilter)
        a.delay.drywet(delayDryWet)


        setDelayDryWet = a.createSlider(0, 1, delayDryWet, 0.01).input(function(){
            delayDryWet = setDelayDryWet.value()
            a.delay.drywet(setDelayDryWet.value())
            updatePost()
        }).position(10, 345)

        
        setDelayTime = a.createSlider(0, 1, delayTime, 0.01).input(function() {
            delayTime = setDelayTime.value()
            a.delay.process(a.poly, setDelayTime.value(), delayFeedback, delayFilter)
            updatePost()
        }).position(10, 375)

        
        setDelayFeedback = a.createSlider(0, 0.99, delayFeedback, 0.01).input(function() {
            delayFeedback = setDelayFeedback.value()
            a.delay.process(a.poly, delayTime, setDelayFeedback.value(), delayFilter)
            updatePost()
        }).position(10, 410)

        
        setFilterFreq = a.createSlider(10, 5000, delayFilter, 1).input(function(){
            delayFilter = setFilterFreq.value()
            a.delay.process(a.poly, delayTime, delayFeedback, setFilterFreq.value())
            updatePost()
        }).position(10, 445)

        // DELAY END //

        // DISTORTION BEGINS//
        // Oversample values:
        // 'none', '2x', '4x'

        a.distortion.process(a.delay, distortionAmount, distortionOversample);
        a.distortion.drywet(distortionDryWet);


        setDistortionDryWet = a.createSlider(0, 1, distortionDryWet, 0.01).input(function(){
            distortionDryWet = setDistortionDryWet.value()
            a.distortion.drywet(setDistortionDryWet.value());
            updatePost();
        }).position(10, 510);

        
        setDistortionAmount = a.createSlider(0, 1, distortionAmount, .01).input(function() {
            distortionAmount = setDistortionAmount.value()
            a.distortion.process(a.poly, setDistortionAmount.value(), distortionOversample)
            updatePost()
        }).position(10, 540)

        
        setDistortionSample = a.createSelect();
        sampleR = a.createP(`Current: ${distortionOversample}`).position(35, 575)
        setDistortionSample.option('none');
        setDistortionSample.option('2x');
        setDistortionSample.option('4x');
        setDistortionSample.changed(function(){
            distortionOversample = setDistortionSample.value()
            a.distortion.process(a.poly, distortionAmount, setDistortionSample.value())
            updatePost()
        }).position(145, 575)

    //     // DISTORTION ENDS //

    //     // KEYBOARD PIANO FUNCTIONS //
        window.addEventListener("keydown", function(event) {
            if (event.defaultPrevented) {
                return;
            }
            // Making the octave switch will be easy
            // hold value of postion of keyboard 
            // when z is pressed subtract 1/ c will add 1
            // the last 5 notes will need to have a +1 function added
            // if ocatave is too low don't go further
            // Velocity will be the same

            switch(event.code) {
                case "KeyZ":
                    if (octave == 1) {
                        console.log('Cannot go any lower')
                    } else {
                        octave -= 1
                        console.log(octave)
                    }
                    break;
                case "KeyX":
                    if (octave == 6) {
                        console.log('Cannot go any higher')
                    } else {
                        octave += 1
                        console.log(octave)
                    }
                    break;
                case "KeyC":
                    if (velocity == 0.10000000000000003) {
                        console.log('Cannot go any lower')
                    } else {
                        velocity -= .1
                        console.log(velocity)
                    }
                    break;
                case "KeyV":
                    if (velocity == 0.9999999999999999) {
                        console.log('Cannot go any higher')
                    } else {
                        velocity += .1
                        console.log(velocity)
                    }
                    break;
                case "KeyA":
                    a.poly.play(`C${octave}`, velocity, 0);
                    break;
                case "KeyW":
                    a.poly.play(`C#${octave}`, velocity, 0);
                    break;
                case "KeyS":
                    a.poly.play(`D${octave}`, velocity, 0);
                    break;
                case "KeyE":
                    a.poly.play(`D#${octave}`, velocity, 0);
                    break;
                case "KeyD":
                    a.poly.play(`E${octave}`, velocity, 0);
                    break;
                case "KeyF":
                    a.poly.play(`F${octave}`, velocity, 0);
                    break;
                case "KeyT":
                    a.poly.play(`F#${octave}`, velocity, 0);
                    break;
                case "KeyG":
                    a.poly.play(`G${octave}`, velocity, 0);
                    break;
                case "KeyY":
                    a.poly.play(`G#${octave}`, velocity, 0);
                    break;
                case "KeyH":
                    a.poly.play(`A${octave + 1}`, velocity, 0);
                    break;
                case "KeyU":
                    a.poly.play(`A#${octave + 1}`, velocity, 0);
                    break;
                case "KeyJ":
                    a.poly.play(`B${octave + 1}`, velocity, 0);
                    break;
                case "KeyK":
                    a.poly.play(`C${octave + 1}`, velocity, 0);
                    break;
                case "KeyO":
                    a.poly.play(`C#${octave + 1}`, velocity, 0);
                    break;
                case "KeyL":
                    a.poly.play(`D${octave + 1}`, velocity, 0);
                    break;
                case "KeyP":
                    a.poly.play(`D#${octave + 1}`, velocity, 0);
                    break;
            }
        })
         // KEYBOARD PIANO END // 
        

        fileStatus = a.createP('').position(250, 170)
        // Save Function //
        savePreset = a.createButton('Save').position(250, 250).mousePressed(postData)
        fileInput = a.createInput().position(310, 250)
        fileName = ''
        


        // Load Function //


        loadSelect = a.createSelect().position(300, 200)
        loadSelect.option('Select Preset')
        loadSelect.option('init')
        for (let c = 0; c < preset.length; c++) {
            loadSelect.option(`${c}: ${preset[c].name}`)
        }
        loadSelect.changed(function() {
            if (loadSelect.value() == 'init') {
                fileNumber = 10000
            } else if (loadSelect.value() == 'Select Preset'){
                fileNumber = 9999
            } 
            else {fileNumber = loadSelect.value()[0]
                console.log('Preset:')
                console.log(preset[fileNumber])
            }
            
        })
        loadPresetButton = a.createButton('Load').position(250, 200).mousePressed(loadPreset)
    }

    function loadPreset() {
        if (fileNumber == 9999) {
            fileStatus.html('This is not a preset file.')
        } else if (fileNumber == 10000 ){
            attack = 0.6;
            setAttack.value(attack)

            decay = 0.1;
            setDecay.value(decay)

            sustain = 0.9;
            setSustain.value(sustain)

            release = 0.3;
            setRelease.value(release)

            reverbDryWet = 0;
            reverbDryWetSlider.value(reverbDryWet)

            reverbSeconds = 3;
            setReverbSeconds.value(reverbSeconds)

            reverbDecayRate = 2;
            setReverbDecayRate.value(reverbDecayRate)

            reverbReverse = false;
            reverbReversePost = false;

            delayDryWet = 0;
            setDelayDryWet.value(delayDryWet)

            delayTime = .5;
            setDelayTime.value(delayTime)

            delayFeedback = .75;
            setDelayFeedback.value(delayFeedback)

            delayFilter = 2300;
            setFilterFreq.value(delayFilter)

            distortionDryWet = 0;
            setDistortionDryWet.value(distortionDryWet)

            distortionAmount = .5;
            setDistortionAmount.value(distortionAmount)

            distortionOversample = 'none'
            sampleR.html(`Current: ${distortionOversample}`)

            setEngine()
            fileStatus.html('Preset Loaded!')

        }else {
            console.log(preset[fileNumber])

            attack = Number(preset[fileNumber].attack)
            setAttack.value(Number(preset[fileNumber].attack))

            decay = Number(preset[fileNumber].decay)
            setDecay.value(Number(preset[fileNumber].decay))

            sustain = Number(preset[fileNumber].sustain)
            setSustain.value(Number(preset[fileNumber].sustain))

            release = Number(preset[fileNumber].release)
            setRelease.value(Number(preset[fileNumber].release))

            reverbDryWet = Number(preset[fileNumber].reverbDryWet)
            reverbDryWetSlider.value(Number(preset[fileNumber].reverbDryWet))

            reverbSeconds = Number(preset[fileNumber].reverbSeconds)
            setReverbSeconds.value(Number(preset[fileNumber].reverbSeconds))

            reverbDecayRate = Number(preset[fileNumber].reverbDecayRate)
            setReverbDecayRate.value(Number(preset[fileNumber].reverbDecayRate))

            if (preset[fileNumber].reverbReversePost) {
                reverbReverse = true
                reverbReversePost = true
            } else {
                reverbReverse = false
                reverbReversePost = false
            }

            delayDryWet = Number(preset[fileNumber].delayDryWet)
            setDelayDryWet.value(Number(preset[fileNumber].delayDryWet))

            delayTime = Number(preset[fileNumber].delayTime)
            setDelayTime.value(Number(preset[fileNumber].delayTime))

            delayFeedback = Number(preset[fileNumber].delayFeedback)
            setDelayFeedback.value(Number(preset[fileNumber].delayFeedback))

            delayFilter = Number(preset[fileNumber].delayFilter)
            setFilterFreq.value(Number(preset[fileNumber].delayFilter))

            distortionDryWet = Number(preset[fileNumber].distortionDryWet)
            setDistortionDryWet.value(Number(preset[fileNumber].distortionDryWet))

            distortionAmount = Number(preset[fileNumber].distortionAmount)
            setDistortionAmount.value(Number(preset[fileNumber].distortionAmount))

            distortionOversample = preset[fileNumber].distortionOversample
            sampleR.html(`Current: ${preset[fileNumber].distortionOversample}`)

            setEngine()
            fileStatus.html('Preset Loaded!')
        }
        
        
    }
    function postData() {
        fileName = fileInput.value()
        updatePost()
        if (fileName == '') {
            fileStatus.html('Please enter a preset name.')
        } else {
            fileStatus.html('')
            let header = new Headers()
            header.append('content-type', 'application/json')
            fetch('http://127.0.0.1:5000/api/presets', {method: 'POST', headers: header ,body: JSON.stringify(post)})
        }
    }

    function setReverbReverse() {
        if (reverbReverse == false) {
            reverbReversePost = true
            reverbReverse = true
            a.reverb.process(a.distortion, reverbSeconds, reverbDecayRate, true)
            updatePost()
        } else {
            reverbReversePost = false
            reverbReverse = false
            a.reverb.process(a.distortion, reverbSeconds, reverbDecayRate, false)
            updatePost()
        }
    }

    function setEngine() {
        a.poly.setADSR(attack, decay, sustain, release);
        a.reverb.process(a.distortion, reverbSeconds, reverbDecayRate, reverbReverse)
        a.reverb.drywet(reverbDryWet)
        a.delay.process(a.poly, delayTime, delayFeedback, delayFilter)
        a.delay.drywet(delayDryWet)
        a.distortion.process(a.delay, distortionAmount, distortionOversample);
        a.distortion.drywet(distortionDryWet);
    }
}

var WaveformGraph = function(b) {

    b.setup = function() {
        b.fft = new p5.FFT()
        b.createCanvas(300, 100).position(545, 150)
    }

    b.draw = function(){
        b.background('grey');
        
        let waveform = b.fft.waveform();
        b.noFill();
        b.beginShape();
        b.stroke('white');
        for (let i = 0; i < waveform.length; i++){
          let x = b.map(i, 0, waveform.length, 0, b.width);
          let y = b.map( waveform[i], -1, 1, 0, b.height);
          b.vertex(x,y);
        }
        b.endShape();
    }
}

var FrequencyGraph = function(c) {

    c.setup = function() {
        c.fft = new p5.FFT()
        c.createCanvas(300, 100).position(545, 250)
    }

    c.draw = function(){
        c.background('grey');

        c.beginShape();
        c.vertex(0, c.height);
        c.fill('black');
        c.stroke(15);
        let spectrum = c.fft.analyze();
        for (let i = 0; i < spectrum.length; i++) {
            c.vertex(c.map(c.log(i), 0, c.log(spectrum.length), 0, c.width), c.map(spectrum[i], 0, 255, c.height, 0))
        }
        c.vertex(c.width, c.height)
        c.endShape();
    }
}



function touchStarted() {
    if (getAudioContext().state !== 'running') {
      getAudioContext().resume();
    }
}

async function getPresets() {
    let response = await fetch('http://127.0.0.1:5000/api/presets')
    let data = await response.json()
    preset = await data
}

function updatePost() {
    post = {
        "name": fileName,
        "attack": attack,
        "decay": decay,
        "sustain": sustain,
        "release": release,
        "reverbDryWet": reverbDryWet,
        "reverbSeconds": reverbSeconds,
        "reverbDecayRate": reverbDecayRate,
        "reverbReversePost": reverbReversePost,
        "delayDryWet": delayDryWet,
        "delayTime": delayTime,
        "delayFeedback": delayFeedback,
        "delayFilter": delayFilter,
        "distortionDryWet": distortionDryWet,
        "distortionAmount": distortionAmount,
        "distortionOversample": distortionOversample
    }
}


    



var synth1 = new p5(SynthSketch);
var av1 = new p5(WaveformGraph);
var av2 = new p5(FrequencyGraph);
