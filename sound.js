// Components go from bottom up...
// (Source --> Effects --> Output)

// TO DO:
// FIGURE OUT HOW TO DELAY INTO RIGHT CHANNEL

let rightChannel = new Tone.Panner(1).connect(machineReverb).toMaster()
let tapeDelay = new Tone.Delay(8, 8).connect(rightChannel)
let leftChannel = new Tone.Panner(-1).connect(tapeDelay).toMaster()
let machineReverb = new Tone.FeedbackDelay(0.133, 0.01).connect(leftChannel, tapeDelay)


// Oscillator amplitudes...In order for these to 
// read at an accurate scale of -12 to 12, the 
// internal computer volume must be set to 50%
const oscAmp1 = new Tone.Volume({
  volume: -12,
}).connect(leftChannel)

const oscAmp2 = new Tone.Volume({
  volume: -12,
}).connect(leftChannel)

// Oscillators
const osc1 = new Tone.Oscillator({
	frequency: 0,
	modulationIndex: 0,
	modulationType: "sine",
	harmonicity: 0
}).chain(machineReverb, oscAmp1).start()

const osc2 = new Tone.Oscillator({
  frequency: 0,
  modulationIndex: 0,
  modulationType: "sine",
  harmonicity: 0
}).chain(machineReverb, oscAmp2).start()


// Bias frequency to emulate tape machine
const biasFreq = new Tone.Oscillator({
  frequency: 44000,
  modulationIndex: 0,
  modulationType: "sine",
  harmonicity: 0
}).chain(machineReverb).toMaster()
.start()
