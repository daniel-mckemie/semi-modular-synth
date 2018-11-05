// Interface setup


// User Input/Microphone ON/OFF
const inputSwitch = new Nexus.Toggle('#input-switch', {
  'size': [40, 20],
  'state': false
})

inputSwitch.on('change', function(x) {
  if (x === true) {
    userInput.open()
  } else { userInput.close() }
})



// AM Oscillator controls
const amFreqDial = new Nexus.Dial('#am-freq-dial', {
  'size': [50, 50],
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
  'size': [50, 50],
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
  'size': [150, 20],
  'mode': 'relative', // 'relative' or 'absolute'
  'min': 0,
  'max': 3,
  'step': 0,
  'value': 0
})

amHarmSlider.on('change', function(x) {
  osc1.harmonicity.value = x
})

// Switch AM Mod wave
const amModSwitch = new Nexus.Toggle('#am-mod-switch', {
  'size': [40, 20],
  'state': false
})

amModSwitch.on('change', function(x) {
  if (x === true) {
    osc1.modulationType.value = 'sawtooth'
  } else {
    osc1.modulationType.value = 'square'
  }
})


// Switch from AM or FM Synthesis
const modType = new Nexus.Toggle('#mod-type', {
  'size': [40, 20],
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
  'size': [50, 50],
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
  'size': [50, 50],
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
  'size': [150, 20],
  'mode': 'relative', // 'relative' or 'absolute'
  'min': 0,
  'max': 3,
  'step': 0,
  'value': 0
})

fmHarmSlider.on('change', function(x) {
  osc2.harmonicity.value = x
})

// Switch FM Mod wave
const fmModSwitch = new Nexus.Toggle('#fm-mod-switch', {
  'size': [40, 20],
  'state': false
})

fmModSwitch.on('change', function(x) {
  if (x === true) {
    osc2.modulationType = 'sawtooth'
    console.log(osc2.modulationType)
  } else {
    osc2.modulationType = 'square'
    console.log(osc2.modulationType)
  }
})


// Power noise/filter on
const filterSwitch = new Nexus.Toggle('#filter-switch', {
  'size': [40, 20],
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

// FM Oscillator controls
const noiseFreqDial = new Nexus.Dial('#noise-freq-dial', {
  'size': [50, 50],
  'interaction': 'radial', // "radial", "vertical", or "horizontal"
  'mode': 'relative', // "absolute" or "relative"
  'min': 0,
  'max': 40,
  'step': 0,
  'value': 0
})

noiseFreqDial.on('change', function(x) {
  noiseFilter.frequency.value = x
})

const noiseDepthSlider = new Nexus.Slider('#noise-depth-slider', {
  'size': [150, 20],
  'mode': 'relative', // 'relative' or 'absolute'
  'min': 0,
  'max': 1,
  'step': 0,
  'value': 0
})

noiseDepthSlider.on('change', function(x) {
  noiseFilter.depth.value = x
})


// Input Gain
const userVol = new Nexus.Slider('#user-vol', {
  'size': [150, 20],
  'mode': 'relative', // 'relative' or 'absolute'
  'min': -24,
  'max': 12,
  'step': 0,
  'value': -24
});

userVol.on('change', function(x) {
  userAmp.volume.value = x
})

// Feedback depth controls

// For L channel input coupled back
const crossCoupleSlider = new Nexus.Slider('#cross-couple-slider', {
  'size': [150, 20],
  'mode': 'relative', // 'relative' or 'absolute'
  'min': -24,
  'max': 12,
  'step': 0,
  'value': -24
});

crossCoupleSlider.on('change', function(x) {
  tapeDelayL2Amp.volume.value = x
})


// For input into L from delayed R
const delayDepthSlider = new Nexus.Slider('#delay-depth-slider', {
  'size': [150, 20],
  'mode': 'relative', // 'relative' or 'absolute'
  'min': -24,
  'max': 12,
  'step': 0,
  'value': -24
});

delayDepthSlider.on('change', function(x) {
  tapeDelayRAmp.volume.value = x
})


