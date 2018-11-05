// Interface setup


// User Input/Microphone ON/OFF
const inputSwitch = new Nexus.Toggle('#switch2', {
  'size': [40, 20],
  'state': false
})

inputSwitch.on('change', function(x) {
  if (x === true) {
    userInput.open()
  } else { userInput.close() }
})



// AM Oscillator controls
const amFreqDial = new Nexus.Dial('#amFreqDial', {
  'size': [150, 150],
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

const amTuneDial = new Nexus.Dial('#amTuneDial', {
  'size': [150, 150],
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

const amHarmSlider = new Nexus.Slider('#amHarmSlider', {
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


// Switch from AM or FM Synthesis
const modType = new Nexus.Toggle('#modType', {
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
const fmFreqDial = new Nexus.Dial('#fmFreqDial', {
  'size': [150, 150],
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

const fmModDial = new Nexus.Dial('#fmModIndex', {
  'size': [150, 150],
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

const fmHarmSlider = new Nexus.Slider('#fmHarmSlider', {
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







// Input Gain
const userVol = new Nexus.Slider('#userVol', {
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

// Oscillator amplitude controls


// const fader2 = new Nexus.Slider('#slider2', {
//   'size': [150, 20],
//   'mode': 'relative', // 'relative' or 'absolute'
//   'min': -12,
//   'max': 12,
//   'step': 0,
//   'value': -12
// });

// fader2.on('change', function(x) {
//   oscAmp2.volume.value = x
// })


// Feedback depth controls

// For L channel input coupled back
const crossCoupleSlider = new Nexus.Slider('#slider3', {
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
const delayDepthSlider = new Nexus.Slider('#slider4', {
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


