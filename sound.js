// Components go from bottom up...
// (Source --> Effects --> Output)

// Cross coupling feedback environment...
// (Figure 8a in 'Tape Delay Techniques///')
 

let rightChannel = new Tone.Panner(1).toMaster()

// Delay of second Left channel to route out of Right channel
let tapeDelayR = new Tone.Delay(4, 4).connect(rightChannel)

// Feedback depth for input at L channel from R channel coming back
const tapeDelayRAmp = new Tone.Volume({
  volume: -24,
}).connect(tapeDelayR)

// 'Phantom' Left channel, to appease orders of declaration
// in Javascript and to prevent 'true' feedback loop
let leftChannel2 = new Tone.Panner(-1).connect(tapeDelayRAmp).toMaster()

// This delay doubles signal back to Left Channel
let tapeDelayL2 = new Tone.Delay(4, 4).connect(leftChannel2)

// Feedback depth for L channel coupled back into input
const tapeDelayL2Amp = new Tone.Volume({
  volume: -24,
}).connect(tapeDelayL2)

let tapeDelayL = new Tone.Delay(4, 4).chain(rightChannel, tapeDelayL2Amp)

let leftChannel = new Tone.Panner(-1).connect(tapeDelayL).toMaster()
let machineReverb = new Tone.FeedbackDelay(0.133, 0.01).connect(leftChannel)


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






