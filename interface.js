// Interface setup

// System ON

const power = new Nexus.Toggle('#switch1', {
  'size': [40, 20],
  'state': false
})

// Starts the system, once on cannot be shut off
power.on('change', function(x) {
  osc1.start()
  osc2.start()
  biasFreq.start()
})



// Oscillator dials
const dial1 = new Nexus.Dial('#dial', {
  'size': [150, 150],
  'interaction': 'radial', // "radial", "vertical", or "horizontal"
  'mode': 'relative', // "absolute" or "relative"
  'min': 22000,
  'max': 34265,
  'step': 0,
  'value': 0
})

dial1.on('change', function(x) {
  osc1.frequency.value = x

})

const dial2 = new Nexus.Dial('#dial2', {
  'size': [150, 150],
  'mode': 'relative', // 'relative' or 'absolute'
  'min': 22000,
  'max': 34700,
  'step': 0,
  'value': 0
})

dial2.on('change', function(x) {
  osc2.frequency.value = x
})


// Oscillator amplitude controls
const fader1 = new Nexus.Slider('#slider1', {
  'size': [150, 20],
  'mode': 'relative', // 'relative' or 'absolute'
  'min': -12,
  'max': 12,
  'step': 0,
  'value': -12
});

fader1.on('change', function(x) {
  oscAmp1.volume.value = x
})

const fader2 = new Nexus.Slider('#slider2', {
  'size': [150, 20],
  'mode': 'relative', // 'relative' or 'absolute'
  'min': -12,
  'max': 12,
  'step': 0,
  'value': -12
});

fader2.on('change', function(x) {
  oscAmp2.volume.value = x
})


// Feedback depth controls

// For input into L from delayed R
const fader3 = new Nexus.Slider('#slider3', {
  'size': [150, 20],
  'mode': 'relative', // 'relative' or 'absolute'
  'min': -24,
  'max': 0,
  'step': 0,
  'value': -24
});

fader3.on('change', function(x) {
  tapeDelayL2Amp.volume.value = x
})

// For L channel input coupled back
const fader4 = new Nexus.Slider('#slider4', {
  'size': [150, 20],
  'mode': 'relative', // 'relative' or 'absolute'
  'min': -24,
  'max': 0,
  'step': 0,
  'value': -24
});

fader4.on('change', function(x) {
  tapeDelayRAmp.volume.value = x
})