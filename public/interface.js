// Interface setup


// User Input/Microphone ON/OFF
const inputSwitch = new Nexus.Toggle('#input-switch', {
  'state': false
})

inputSwitch.on('change', function(x) {
  if (x === true) {
    userInput.open()
  } else { userInput.close() }
})

// Input Gain
const userVol = new Nexus.Slider('#user-vol-slider', {
  'mode': 'relative', // 'relative' or 'absolute'
  'min': -24,
  'max': 12,
  'step': 0,
  'value': -24
});

userVol.on('change', function(x) {
  userAmp.volume.value = x
})

// AM Oscillator controls
const amFreqDial = new Nexus.Dial('#am-freq-dial', {
  'interaction': 'radial', // "radial", "vertical", or "horizontal"
  'mode': 'relative', // "absolute" or "relative"
  'min': 0,
  'max': 5000,
  'step': 0,
  'value': 0
})

amFreqDial.on('change', function(x) {
  osc1.frequency.value = x
})

const amTuneDial = new Nexus.Dial('#am-tune-dial', {
  'interaction': 'radial', // "radial", "vertical", or "horizontal"
  'mode': 'relative', // "absolute" or "relative"
  'min': 0,
  'max': 1000,
  'step': 0,
  'value': 0
})

amTuneDial.on('change', function(x) {
  osc1.detune.value = x
})

const amHarmSlider = new Nexus.Slider('#am-harm-slider', {
  'mode': 'relative', // 'relative' or 'absolute'
  'min': 0,
  'max': 1,
  'step': 0,
  'value': 0
})

amHarmSlider.on('change', function(x) {
  osc1.harmonicity.value = x
})

// Switch AM Mod wave
const amModSwitch = new Nexus.Toggle('#am-mod-switch', {
  'state': false
})

amModSwitch.on('change', function(x) {
  if (x === true) {
    osc1.stop();
    osc1.modulationType = 'sawtooth';
    osc1.start();
  } else {
    osc1.stop();
    osc1.modulationType = 'square';
    osc1.start();
  }
})


// Switch from AM or FM Synthesis
const modType = new Nexus.Toggle('#mod-type', {
  'state': false
})

// Starts the system, once on cannot be shut off
modType.on('change', function(x) {
  if (x === true) {
    osc1.stop();
    osc2.start();
    
  } else {
    osc1.start();
    osc2.stop();
    
  }
})


// FM Oscillator controls
const fmFreqDial = new Nexus.Dial('#fm-freq-dial', {
  'interaction': 'radial', // "radial", "vertical", or "horizontal"
  'mode': 'relative', // "absolute" or "relative"
  'min': 0,
  'max': 5000,
  'step': 0,
  'value': 0
})

fmFreqDial.on('change', function(x) {
  osc2.frequency.value = x
})

const fmModDial = new Nexus.Dial('#fm-mod-index', {
  'interaction': 'radial', // "radial", "vertical", or "horizontal"
  'mode': 'relative', // "absolute" or "relative"
  'min': 0,
  'max': 100,
  'step': 0,
  'value': 0
})

fmModDial.on('change', function(x) {
  osc2.modulationIndex.value = x
})

const fmHarmSlider = new Nexus.Slider('#fm-harm-slider', {
  'mode': 'relative', // 'relative' or 'absolute'
  'min': 0,
  'max': 1,
  'step': 0,
  'value': 0
})

fmHarmSlider.on('change', function(x) {
  osc2.harmonicity.value = x
})

// Switch FM Mod wave
const fmModSwitch = new Nexus.Toggle('#fm-mod-switch', {
  'state': false
})

fmModSwitch.on('change', function(x) {
  if (x === true) {
    osc2.stop();
    osc2.modulationType = 'sawtooth';
    osc2.start();
    console.log(osc2.modulationType)
  } else {
    osc2.stop();
    osc2.modulationType = 'square';
    osc2.start();
    console.log(osc2.modulationType)
  }
})


// Power noise/filter on
const filterSwitch = new Nexus.Toggle('#filter-switch', {
  'state': false
})

// Starts the system, once on cannot be shut off
filterSwitch.on('change', function(x) {
  if (x === true) {
    noise.start();
    noiseFilter.start();
  } else {
    noise.stop();
    noiseFilter.stop();
    
  }
})

// Noise controls
const noiseFreqSlider = new Nexus.Slider('#noise-freq-slider', {
  'mode': 'relative', // "absolute" or "relative"
  'min': 0,
  'max': 40,
  'step': 0,
  'value': 0
})

noiseFreqSlider.on('change', function(x) {
  noiseFilter.frequency.value = x
})

const noiseDepthSlider = new Nexus.Slider('#noise-depth-slider', {
  'mode': 'relative', // 'relative' or 'absolute'
  'min': 0,
  'max': 1,
  'step': 0,
  'value': 0
})

noiseDepthSlider.on('change', function(x) {
  noiseFilter.depth.value = x
})


// ADSR controls
const attackSlider = new Nexus.Slider('#attack-slider', {
  'mode': 'relative', // "absolute" or "relative"
  'min': 0.01,
  'max': 2,
  'step': 0,
  'value': 0
})

attackSlider.on('change', function(x) {
  env.attack = x
})

const decaySlider = new Nexus.Slider('#decay-slider', {
  'mode': 'relative', // "absolute" or "relative"
  'min': 0.01,
  'max': 2,
  'step': 0,
  'value': 0
})

decaySlider.on('change', function(x) {
  env.decay = x
})

const sustainSlider = new Nexus.Slider('#sustain-slider', {
  'mode': 'relative', // "absolute" or "relative"
  'min': 0.01,
  'max': 2,
  'step': 0,
  'value': 0
})

sustainSlider.on('change', function(x) {
  env.sustain = x
})

const releaseSlider = new Nexus.Slider('#release-slider', {
  'mode': 'relative', // "absolute" or "relative"
  'min': 0.01,
  'max': 2,
  'step': 0,
  'value': 0
})

releaseSlider.on('change', function(x) {
  env.release = x
})


// Feedback depth controls

//L channel input coupled back
const crossCoupleSlider = new Nexus.Slider('#cross-couple-slider', {
  'mode': 'relative', // 'relative' or 'absolute'
  'min': -24,
  'max': 12,
  'step': 0,
  'value': -24
});

crossCoupleSlider.on('change', function(x) {
  tapeDelayL2Amp.volume.value = x
})


//Input into L from delayed R
const delayDepthSlider = new Nexus.Slider('#delay-depth-slider', {
  'mode': 'relative', // 'relative' or 'absolute'
  'min': -24,
  'max': 12,
  'step': 0,
  'value': -24
});

delayDepthSlider.on('change', function(x) {
  tapeDelayRAmp.volume.value = x
})