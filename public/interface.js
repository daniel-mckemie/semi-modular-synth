// Interface setup

// System ON
const power = new Nexus.Toggle('#switch1', {
  'size': [40, 20],
  'state': false
})

// Starts the system, once on cannot be shut off
power.on('change', function(x) {
  if (x === true) {
    osc1.start();
    osc2.start();
    biasFreq.start();
  } else {
    osc1.stop();
    osc2.stop();
    biasFreq.stop();
  }
})

// User Input/Microphone ON/OFF
const inputSwitch = new Nexus.Toggle('#switch2', {
  'size': [40, 20],
  'state': false
})

// Starts the system, once on cannot be shut off
inputSwitch.on('change', function(x) {
  if (x === true) {
    userInput.open()
  } else { userInput.close() }
})



// Oscillator dials
let dial1 = $(function() {
  $(".dial1").knob({
    min: 22000,
    max: 34265,
    'change': function(x) {
      osc1.frequency.value = x
    }
  });
})

let dial2 = $(function() {  
  $(".dial2").knob({
    min: 22000,
    max: 34700,
    'change': function(x) {
      osc2.frequency.value = x
    }
  });
})


// const dial1 = new Nexus.Dial('#dial1', {
//   'size': [150, 150],
//   'interaction': 'radial', // "radial", "vertical", or "horizontal"
//   'mode': 'relative', // "absolute" or "relative"
//   'min': 22000,
//   'max': 34265,
//   'step': 0,
//   'value': 0
// })

// dial1.on('change', function(x) {
//   osc1.frequency.value = x

// })

// const dial2 = new Nexus.Dial('#dial2', {
//   'size': [150, 150],
//   'mode': 'relative', // 'relative' or 'absolute'
//   'min': 22000,
//   'max': 34700,
//   'step': 0,
//   'value': 0
// })

// dial2.on('change', function(x) {
//   osc2.frequency.value = x
// })

// Oscillator amplitude controls
const fader1 = document.getElementById("slider1");
fader1.oninput = function() {
  oscAmp1.volume.value = this.value
}

const fader2 = document.getElementById("slider2");
fader2.oninput = function() {
  oscAmp2.volume.value = this.value
}


// Feedback depth controls

// For input into L from delayed R
const fader3 = document.getElementById("slider3");
fader3.oninput = function() {
  tapeDelayL2Amp.volume.value = this.value
}

const fader4 = document.getElementById("slider4");
fader4.oninput = function() {
  tapeDelayRAmp.volume.value = this.value
}


// Input Gain
const fader5 = document.getElementById("slider5");
fader5.oninput = function() {
  userAmp.volume.value = this.value
}