// Components go from bottom up...
// (Source --> Effects --> Output)

let feedbackDelay = new Tone.FeedbackDelay(0.133, 0.01).toMaster()

// Oscillator amplitudes...In order for these to 
// read at an accurate scale of -12 to 12, the 
// internal computer volume must be set to 50%
const oscAmp1 = new Tone.Volume({
  volume: -12,
}).toMaster()

const oscAmp2 = new Tone.Volume({
  volume: -12,
}).toMaster()

// Oscillators
const osc1 = new Tone.Oscillator({
	frequency: 0,
	modulationIndex: 0,
	modulationType: "sine",
	harmonicity: 0
}).chain(feedbackDelay, oscAmp1).start()

const osc2 = new Tone.Oscillator({
  frequency: 0,
  modulationIndex: 0,
  modulationType: "sine",
  harmonicity: 0
}).chain(feedbackDelay, oscAmp2).start()


// Bias frequency to emulate tape machine
const biasFreq = new Tone.Oscillator({
  frequency: 44000,
  modulationIndex: 0,
  modulationType: "sine",
  harmonicity: 0
}).chain(feedbackDelay).toMaster()
.start()
