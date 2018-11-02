// Interface setup

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


// Oscillator volume controls
const fader1 = new Nexus.Slider('#slider1', {
  'size': [150, 20],
  'mode': 'relative',  // 'relative' or 'absolute'
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
  'mode': 'relative',  // 'relative' or 'absolute'
  'min': -12,
  'max': 12,
  'step': 0,
  'value': -12
});

fader2.on('change', function(x) {
  oscAmp2.volume.value = x
})

