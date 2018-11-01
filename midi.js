// Interface setup

const dial1 = new Nexus.Dial('#dial',{
  'size': [150, 150],
  'interaction': 'radial', // "radial", "vertical", or "horizontal"
  'mode': 'relative', // "absolute" or "relative"
  'min': 22000,
  'max': 46330, // 46330 if 96k
  'step': 0,
  'value': 0
})


const dial2 = new Nexus.Dial('#dial2',{
    'size': [150,150],
    'mode': 'relative',  // 'relative' or 'absolute'
    'min': 22000,
    'max': 47400, // 47400 if 96k
    'step': 0,
    'value': 0
})


let feedbackDelay = new Tone.Reverb(0.133, 0.01).toMaster()

const osc1 = new Tone.Oscillator({
	frequency: 0,
	modulationIndex: 0,
	modulationType: "sine",
	harmonicity: 0
}).connect(feedbackDelay).toMaster()
.start()

const osc2 = new Tone.Oscillator({
  frequency: 0,
  modulationIndex: 0,
  modulationType: "sine",
  harmonicity: 0
}).connect(feedbackDelay).toMaster()
.start()

const biasFreq = new Tone.Oscillator({
  frequency: 44000, // 44000 if not 192k
  modulationIndex: 0,
  modulationType: "sine",
  harmonicity: 0
}).connect(feedbackDelay).toMaster()
.start()


dial1.on('change', function(x){
	osc1.frequency.value = x

})


dial2.on('change', function(x) {
	osc2.frequency.value = x
})





// MIDI setup

let midi; 
let data;
// request MIDI access
if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess({
        sysex: false // this defaults to 'false' and we won't be covering sysex in this article. 
    }).then(onMIDISuccess, onMIDIFailure);
} else {
    alert("No MIDI support in your browser.");
}

// midi functions
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
		case 14:
		knob1(velocity)
		break;
		case 15:
		knob2(velocity)
		break;
	}
	// console.log('MIDI data', data)
}

function knob1(x) {
	dial1.value = x * 190 + 22200 // x * 190 if 96k (check for quality @ 192k!)
	osc1.frequency.value = x * 190 + 22200
  console.log(osc1.frequency.value)
}

function knob2(x) {
	dial2.value = x * 200 + 22000 // x * 200 if 96k (check for quality @ 192k!)
	osc2.frequency.value = x * 200 + 22000
  console.log(osc2.frequency.value)
}