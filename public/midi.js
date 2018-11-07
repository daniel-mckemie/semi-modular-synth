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
      amFreq(velocity)
      break;
    case 15: // korg knob 2
      amTune(velocity)
      break;
    case 16: // korg knob 3
      fmFreq(velocity)
      break;
    case 17:
      fmMod(velocity)
      break;
    case 18:
      noiseFreq(velocity)
      break;
    case 2: // korg slider 1
      userIn(velocity)
      break;
    case 3: // korg slider 2
      amHarm(velocity)
      break;
    case 5: // korg slider 3
      fmHarm(velocity)
      break;
    case 6:
      noiseDepth(velocity)
      break;
    case 9: // korg slider 7
      crossCouple(velocity)
      break;
    case 12: // korg slider 8
      rightToLeft(velocity)
      break;
    case 33: // korg button 1B
      inputOn(velocity)
      break;
    case 24: // korg button 4A
      amModType(velocity)
      break;
    case 25: // korg button 3A
      amFmSwitch(velocity)
      break;
    case 26: // korg button 4A
      fmModType(velocity)
      break;
    case 27: // korg button 5A
      noiseFilterSwitch(velocity)
      break;
  }

  switch(type) {
    case 144: // note on
      noteOn(note, velocity)
    case 160: // note on (louder)    
      noteOn(note, velocity)  
      break;
    case 128:
      noteOff(note, velocity) // note off
      break;
  }
  // console.log('MIDI data', data) // Reads all MIDI data
  // console.log('MIDI data', note)
}

function frequencyFromNoteNumber(note) {
  return 440 * Math.pow(2, (note - 69) / 12)
}

let context = new AudioContext();
console.clear()

function noteOn(midiNote, velocity) {
  osc1.frequency.value = frequencyFromNoteNumber(midiNote)
  oscAmp1.volume.setTargetAtTime(-12, context.currentTime, 0.015) 
  osc2.frequency.value = frequencyFromNoteNumber(midiNote)
  oscAmp2.volume.setTargetAtTime(-12, context.currentTime, 0.015) 
  
}



function noteOff(midiNote, velocity) {
    oscAmp1.volume.setTargetAtTime(-66, context.currentTime, 0.015) 
    oscAmp2.volume.setTargetAtTime(-66, context.currentTime, 0.015)
}


const oldRange = 127 - 0 // MIDI range

function amFreq(x) {
  // logarathmic knob
  const min = 0
  const max = 127
  const logMin = Math.log(1)
  const logMax = Math.log(5000)
  const scale = (logMax - logMin) / (max - min)
  let newValue = Math.exp(logMin + scale * (x - min)).toFixed(8)
  amFreqDial.value = newValue
  osc1.frequency.value = newValue
  console.log(osc1.frequency.value)
}

function amTune(x) {
  const newValue = (x * 7.874).toFixed(8)
  amTuneDial.value = newValue
  osc1.detune.value = newValue
  console.log(osc1.detune.value)
}

function fmFreq(x) {
  // logarathmic knob
  const min = 0
  const max = 127
  const logMin = Math.log(1)
  const logMax = Math.log(5000)
  const scale = (logMax - logMin) / (max - min)
  let newValue = Math.exp(logMin + scale * (x - min)).toFixed(8)
  fmFreqDial.value = newValue
  osc2.frequency.value = newValue
  console.log(osc2.frequency.value)
}


function fmMod(x) {
  const newValue = (x * .7874).toFixed(8)
  fmModDial.value = newValue
  osc2.modulationIndex.value = newValue
  console.log(osc2.modulationIndex.value)
}



// Input Gain - Slider 1
function userIn(x) {
  const newRange = 12 - (-24)
  const newValue = ((x - 127) * newRange) / oldRange + 12
  userVol.value = newValue.toFixed(8)
  userAmp.volume.value = newValue.toFixed(8)
  console.log(userAmp.volume.value)
}

// AM Osc Harmonicity - Slider 2
function amHarm(x) {
  const newValue = (x * 0.007874).toFixed(16)
  amHarmSlider.value = newValue
  osc1.harmonicity.value = newValue
  console.log(osc1.harmonicity.value)
}

// FM Osc Harmonicity - Slider 4
function fmHarm(x) {
  const newValue = (x * 0.007974).toFixed(16)
  fmHarmSlider.value = newValue
  osc2.harmonicity.value = newValue
  console.log(osc2.harmonicity.value)
}


// Feedback Amps
function crossCouple(x) {
  const newRange = 12 - (-24)
  const newValue = ((x - 127) * newRange) / oldRange + 12
  crossCoupleSlider.value = newValue.toFixed(8)
  tapeDelayL2Amp.volume.value = newValue.toFixed(8)
  console.log(tapeDelayL2Amp.volume.value)
}

function rightToLeft(x) {
  const newRange = 12 - (-24)
  const newValue = ((x - 127) * newRange) / oldRange + 12
  delayDepthSlider.value = newValue.toFixed(8)
  tapeDelayRAmp.volume.value = newValue.toFixed(8)
  console.log(tapeDelayRAmp.volume.value)
}


function inputOn(x) {
  if (x === 127) {
    inputSwitch.state = true
  } else { inputSwitch.state = false }
}

function amFmSwitch(x) {
  if (x === 127) {
    modType.state = true
  } else { modType.state = false }
}

function amModType(x) {
  if (x === 127) {
    amModSwitch.state = true
  } else { amModSwitch.state = false }
}

function fmModType(x) {
  if (x === 127) {
    fmModSwitch.state = true
  } else { fmModSwitch.state = false }
}

function noiseFilterSwitch(x) {
  if (x === 127) {
    filterSwitch.state = true
  } else { filterSwitch.state = false }
}

function noiseFreq(x) {
  // logarathmic knob
  const min = 0
  const max = 127
  const logMin = Math.log(1)
  const logMax = Math.log(40)
  const scale = (logMax - logMin) / (max - min)
  let newValue = Math.exp(logMin + scale * (x - min)).toFixed(8)
  noiseFreqSlider.value = newValue
  noiseFilter.frequency.value = newValue
  console.log(noiseFilter.frequency.value)
}

// FM Osc Harmonicity - Slider 4
function noiseDepth(x) {
  const newValue = (x * 0.00787401).toFixed(16)
  noiseDepthSlider.value = newValue
  noiseFilter.depth.value = newValue
  console.log(noiseFilter.depth.value)
}





