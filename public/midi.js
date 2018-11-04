// MIDI setup

let midi;
let data;
// request MIDI access
if (navigator.requestMIDIAccess) {
  navigator.requestMIDIAccess({
    sysex: false // this defaults to 'false'
  }).then(onMIDISuccess, onMIDIFailure);
} else {
  alert("No MIDI support in your browser.");
}

// MIDI functions
function onMIDISuccess(midiAccess) {
  midi = midiAccess; // this is our raw MIDI data, inputs, outputs, and sysex status 
  // when we get a succesful response, run this code
  const inputs = midi.inputs.values();
  // loop over all available inputs and listen for any MIDI input
  for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
    // each time there is a midi message call the onMIDIMessage function
    input.value.onmidimessage = onMIDIMessage;
  }
  // console.log('MIDI Access Object', midiAccess);
}

function onMIDIFailure(e) {
  // when we get a failed response, run this code
  console.log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + e);
}

let velocity

const onMIDIMessage = message => {
  data = event.data,
    cmd = data[0] >> 4,
    channel = data[0] & 0xf,
    type = data[0] & 0xf0, // channel agnostic message type
    note = data[1],
    velocity = data[2];

  switch (note) {
    case 14: // korg knob 1
      knob1(velocity)
      break;
    case 15: // korg knob 1
      knob2(velocity)
      break;
    case 2: // korg slider 1
      amp1(velocity)
      break;
    case 3: // korg slider 2
      amp2(velocity)
      break;
    case 4: // korg slider 3
      amp3(velocity)
      break;
    case 5: // korg slider 4
      amp4(velocity)
      break;
    case 6: // korg slider 4
      amp5(velocity)
      break;
    case 23: // korg button 1A
      oscOn(velocity)
      break;
    case 33: // korg button 1A
      inputOn(velocity)
      break;

  }
  // console.log('MIDI data', data) // Reads all MIDI data
}

function knob1(x) {
  dial1.value = x * 95 + 22200 // x * 190 if 96k (check for quality @ 192k!)
  osc1.frequency.value = x * 95 + 22200
  // console.log(osc1.frequency.value)
}

function knob2(x) {
  dial2.value = x * 100 + 22000 // x * 200 if 96k (check for quality @ 192k!)
  osc2.frequency.value = x * 100 + 22000
  // console.log(osc2.frequency.value)
}

// Oscillator amps
function amp1(x) {
  const oldRange = 127 - 0
  const newRange = 12 - (-12)
  const newValue = ((x - 127) * newRange) / oldRange + 12
  fader1.value = newValue.toFixed(8)
  oscAmp1.volume.value = newValue.toFixed(8)
  // console.log(oscAmp1.volume.value)
}

function amp2(x) {
  const oldRange = 127 - 0
  const newRange = 12 - (-12)
  const newValue = ((x - 127) * newRange) / oldRange + 12
  fader2.value = newValue.toFixed(8)
  oscAmp2.volume.value = newValue.toFixed(8)
  // console.log(oscAmp2.volume.value)
}


// Feedback Amps
function amp3(x) {
  const oldRange = 127 - 0
  const newRange = 0 - (-24)
  const newValue = ((x - 127) * newRange) / oldRange
  fader3.value = newValue.toFixed(8)
  tapeDelayL2Amp.volume.value = newValue.toFixed(8)
  // console.log(tapeDelayL2Amp.volume.value)
}

function amp4(x) {
  const oldRange = 127 - 0
  const newRange = 0 - (-24)
  const newValue = ((x - 127) * newRange) / oldRange
  fader4.value = newValue.toFixed(8)
  tapeDelayRAmp.volume.value = newValue.toFixed(8)
  // console.log(tapeDelayRAmp.volume.value)
}

// Input Gain
function amp5(x) {
  const oldRange = 127 - 0
  const newRange = 12 - (-24)
  const newValue = ((x - 127) * newRange) / oldRange + 12
  fader5.value = newValue.toFixed(8)
  userAmp.volume.value = newValue.toFixed(8)
  console.log(userAmp.volume.value)
}

function oscOn(x) {
  if (x === 127) {
    power.state = true
  } else { power.state = false }
}

function inputOn(x) {
  if (x === 127) {
    inputSwitch.state = true
  } else { inputSwitch.state = false }
}