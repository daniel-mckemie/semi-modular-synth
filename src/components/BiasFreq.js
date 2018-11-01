import React, { Component } from 'react';
import Tone from 'tone';
import { Knob } from 'react-rotary-knob'

const biasFreq = new Tone.Oscillator({
  frequency: 44000, // 44000 if not 192k
  modulationIndex: 0,
  modulationType: "sine",
  harmonicity: 0
}).toMaster()
.start()


class BiasFreq extends Component {

	render() {
		return (
			<div>Bias</div>
		);
	}
}

export default BiasFreq
