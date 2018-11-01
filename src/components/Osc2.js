import React, { Component } from 'react';
import Tone from 'tone';
import { Knob } from 'react-rotary-knob'

const osc2 = new Tone.Oscillator({
  frequency: 0,
  modulationIndex: 0,
  modulationType: "sine",
  harmonicity: 0
}).toMaster()
.start()


class Osc2 extends Component {

	state = {
		value: 0
	}

	changeValue(val) {
		this.setState({value:val})
		osc2.frequency.value = val
	}

	render() {
		return (
			<Knob onChange={this.changeValue.bind(this)} min={0} max={400} value={this.state.value}/>
		);
	}
}

export default Osc2
