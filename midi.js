// Interface setup

const dial = new Nexus.Dial('#dial',{
  'size': [150, 150],
  'interaction': 'radial', // "radial", "vertical", or "horizontal"
  'mode': 'relative', // "absolute" or "relative"
  'min': 0,
  'max': 127,
  'step': 0,
  'value': 0
})


const slider = new Nexus.Slider('#slider',{
    'size': [120,20],
    'mode': 'relative',  // 'relative' or 'absolute'
    'min': 0,
    'max': 127,
    'step': 0,
    'value': 0
})

// var modulator = new Tone.Oscillator(20, "square").toMaster().start()
var carrier = new Tone.FMOscillator({
	frequency: 200,
	modulationIndex: 2,
	modulationType: "sine",
	harmonicity: 1
}).toMaster()
.start()

dial.on('change', function(x){
  console.log(dial.value)
	carrier.frequency.value = x

})


slider.on('change', function(x) {
	carrier.harmonicity.value = x
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
    for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
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
		knob(velocity)
		break;
		case 2:
		fader(velocity)
		break;
	}
	// console.log('MIDI data', data)
}

function knob(x) {
	dial.value = x
	carrier.frequency.value = x * 3
}

function fader(x) {
	slider.value = x
	carrier.harmonicity.value = x
}








// WebMidi.js


// WebMidi.enable(function (err) {
// 	if(err) {
// 		console.log('WebMidi could not be enabled.', err);
// 	} else {
// 		console.log('WebMidi enabled!')
// 	}
// });

// WebMidi.enable(function (err) {
//     console.log(WebMidi.inputs);
//     console.log(WebMidi.outputs);
// });

// //By name
// const input = WebMidi.getInputByName("nanoKONTROL SLIDER/KNOB")

// // By Id 
// // const input = WebMidi.getInputById('-1966356167');

// //By Index
// // const input = WebMidi.inputs[0];

// input.addListener('controlchange', 'all',
// 	function(e) {
// 		console.log("Received 'controlchange' message.", e)
// 	});