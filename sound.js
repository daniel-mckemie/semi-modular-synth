// Components go from bottom up...
// (Source --> Effects --> Output)
 
let rightChannel = new Tone.Panner(1).toMaster()
let tapeDelayR = new Tone.Delay(4, 4).connect(rightChannel)
let leftChannel2 = new Tone.Panner(-1).connect(tapeDelayR).toMaster()
let tapeDelayL2 = new Tone.Delay(4, 4).connect(leftChannel2)
let tapeDelayL = new Tone.Delay(4, 4).chain(rightChannel, tapeDelayL2)
let leftChannel = new Tone.Panner(-1).connect(tapeDelayL).toMaster()
let machineReverb = new Tone.FeedbackDelay(0.133, 0.01).connect(leftChannel)
// let tapeDelayR = new Tone.Delay(4, 4).connect(leftChannel)

// Oscillator amplitudes...In order for these to 
// read at an accurate scale of -12 to 12, the 
// internal computer volume must be set to 50%
const oscAmp1 = new Tone.Volume({
  volume: -12,
}).connect(machineReverb)

const oscAmp2 = new Tone.Volume({
  volume: -12,
}).connect(machineReverb)

// Oscillators
const osc1 = new Tone.Oscillator({
	frequency: 0,
	modulationIndex: 0,
	modulationType: "sine",
	harmonicity: 0
}).connect(oscAmp1).start()

const osc2 = new Tone.Oscillator({
  frequency: 0,
  modulationIndex: 0,
  modulationType: "sine",
  harmonicity: 0
}).connect(oscAmp2).start()


// Bias frequency to emulate tape machine
const biasFreq = new Tone.Oscillator({
  frequency: 44000,
  modulationIndex: 0,
  modulationType: "sine",
  harmonicity: 0
}).connect(machineReverb)
.start()






