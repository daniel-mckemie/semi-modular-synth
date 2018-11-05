// Components go from bottom up...
// (Source --> Effects --> Output)

// Cross coupling feedback environment...
// (Figure 8a in 'Tape Delay Techniques///')


// Record output
console.clear();

const audio = document.querySelector('audio');
const actx = Tone.context;
const dest = actx.createMediaStreamDestination();
const recorder = new MediaRecorder(dest.stream);

const chunks = [];


document.getElementById('record-button')
.addEventListener('click', function() {
  Tone.Transport.start();
  recorder.start();
});

document.getElementById('stop-button')
.addEventListener('click', function() {
  recorder.stop();
  Tone.Transport.stop();
});

recorder.ondataavailable = evt => chunks.push(evt.data);
recorder.onstop = evt => {
  let blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
  audio.src = URL.createObjectURL(blob);
};



let rightChannel = new Tone.Panner(1).connect(dest).toMaster()

// Delay of second Left channel to route out of Right channel
let tapeDelayR = new Tone.Delay(4, 4).connect(rightChannel)

// Feedback depth for input at L channel from R channel coming back
const tapeDelayRAmp = new Tone.Volume({
  volume: -24,
}).connect(tapeDelayR)

// 'Phantom' Left channel, to appease orders of declaration
// in Javascript and to prevent 'true' feedback loop
let leftChannel2 = new Tone.Panner(-1).connect(tapeDelayRAmp).connect(dest).toMaster()

// This delay doubles signal back to Left Channel
let tapeDelayL2 = new Tone.Delay(4, 4).connect(leftChannel2)

// Feedback depth for L channel coupled back into input
const tapeDelayL2Amp = new Tone.Volume({
  volume: -24,
}).connect(tapeDelayL2)

let tapeDelayL = new Tone.Delay(4, 4).chain(rightChannel, tapeDelayL2Amp)

let leftChannel = new Tone.Panner(-1).connect(tapeDelayL).connect(dest).toMaster()
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

const noiseAmp = new Tone.Volume({
  volume: -12,
}).connect(machineReverb)

const userAmp = new Tone.Volume({
  volume: -24,
}).connect(machineReverb)

// Oscillators
const osc1 = new Tone.AMOscillator({
  frequency: 0,
  type: 'sine',
  modulationType: 'square',
  harmonicity: 0
}).connect(oscAmp1)

const osc2 = new Tone.FMOscillator({
  frequency: 0,
  modulationIndex: 0,
  modulationType: 'square',
  harmonicity: 1
}).connect(oscAmp2)

//Noise Filter
const noise = new Tone.Noise('white')
const noiseFilter = new Tone.AutoFilter({
  frequency: 20,
  depth: 0,
  baseFrequency: 200
}).connect(noiseAmp)
noise.connect(noiseFilter)

// Connect direct user input or microphone, chosen
// input based on global computer specs...
const userInput = new Tone.UserMedia({
  volume: -12
})

userInput.connect(userAmp);