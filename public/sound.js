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

// Refer back to previous commits where the audio recorder worked.
// The issue seems to be in the <audio> tag itself...

const recButton = document.getElementById('record-button')
recButton.addEventListener('click', function() {
  recButton.style.backgroundColor = "red";
  Tone.Transport.start();
  recorder.start();
});

const stopButton = document.getElementById('stop-button')
stopButton.addEventListener('click', function() {
  recButton.style.backgroundColor = "#ffffff";
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
let tapeDelayR = new Tone.Delay(8,8).connect(rightChannel)

// Feedback depth for input at L channel from R channel coming back
const tapeDelayRAmp = new Tone.Volume({
  volume: -24,
}).connect(tapeDelayR)

// 'Phantom' Left channel, to appease orders of declaration
// in Javascript and to prevent 'true' feedback loop
let leftChannel2 = new Tone.Panner(-1).chain(tapeDelayRAmp, dest).toMaster()

// This delay doubles signal back to Left Channel
let tapeDelayL2 = new Tone.Delay(8,8).connect(leftChannel2)

// Feedback depth for L channel coupled back into input
const tapeDelayL2Amp = new Tone.Volume({
  volume: -24,
}).connect(tapeDelayL2)

let tapeDelayL = new Tone.Delay(8,8).chain(rightChannel, tapeDelayL2Amp)
let leftChannel = new Tone.Panner(-1).chain(tapeDelayL, dest).toMaster()

let machineReverb = new Tone.FeedbackDelay(0.133, 0.01).connect(leftChannel)


// Oscillator amplitudes...In order for these to 
// read at an accurate scale of -12 to 12, the 
// internal computer volume must be set to 50%

const oscAmp1 = new Tone.Volume({
  volume: -12,
}).connect(machineReverb);

const oscAmp2 = new Tone.Volume({
  volume: -12,
}).connect(machineReverb);

const noiseAmp = new Tone.Volume({
  volume: -6,
}).connect(machineReverb);

// Connect direct user input or microphone, chosen
// input based on global computer specs...

const userAmp = new Tone.Volume({
  volume: -24,
}).connect(leftChannel);

const userInput = new Tone.UserMedia({
  volume: -12
}).connect(userAmp)

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
  frequency: 0,
  depth: 0,
  baseFrequency: 200
}).connect(oscAmp2.volume) // .connect(noiseAmp)
noise.connect(noiseFilter);

//ADSR Envelope
// const env = new Tone.Envelope({
//   attack: 0.01,
//   decay: 0.01,
//   sustain: 1,
//   release: 0.01
// }).connect(oscAmp1, oscAmp2)











