import React, { Component } from "react";
import Tone from 'tone';

import Osc1 from '../components/Osc1.js';
import Osc2 from '../components/Osc2.js';
import BiasFreq from '../components/BiasFreq.js';


import "./style.css";

let feedbackDelay = new Tone.Reverb(0.133, 0.01).toMaster()



// // MIDI setup

// let midi; 
// let data;
// // request MIDI access
// if (navigator.requestMIDIAccess) {
//     navigator.requestMIDIAccess({
//         sysex: false // this defaults to 'false' and we won't be covering sysex in this article. 
//     }).then(onMIDISuccess, onMIDIFailure);
// } else {
//     alert("No MIDI support in your browser.");
// }

// // midi functions
// function onMIDISuccess(midiAccess) {
//     midi = midiAccess; // this is our raw MIDI data, inputs, outputs, and sysex status 
//     // when we get a succesful response, run this code
//     const inputs = midi.inputs.values();
//     // loop over all available inputs and listen for any MIDI input
//     for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
//     	// each time there is a midi message call the onMIDIMessage function
//     	input.value.onmidimessage = onMIDIMessage;
//     }
//     // console.log('MIDI Access Object', midiAccess);
// }

// function onMIDIFailure(e) {
//     // when we get a failed response, run this code
//     console.log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + e);
// }

// let velocity

// const onMIDIMessage = message => {
// 	data = event.data,
// 	cmd = data[0] >> 4,
// 	channel = data[0] & 0xf,
// 	type = data[0] & 0xf0, // channel agnostic message type
// 	note = data[1],
// 	velocity = data[2];

// 	switch (note) {
// 		case 14:
// 		knob1(velocity)
// 		break;
// 		case 15:
// 		knob2(velocity)
// 		break;
// 	}
// 	// console.log('MIDI data', data)
// }


class App extends Component {
  render() {
    return (
    <div>
    <div className="App">Hello World</div>
    <Osc1></Osc1>
    <Osc2></Osc2>
    <BiasFreq />
    </div>
    )
  }
}

export default App;
