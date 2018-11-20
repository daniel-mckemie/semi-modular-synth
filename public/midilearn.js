const qs = (e) => {
  return document.querySelector(e)
}
const qsa = (e) => {
  return document.querySelectorAll(e);
}

let midi = null;
let midiLearn = false;
let midiLearnElement = null;

const listDevices = (midiAccess) => {
  qs('.midiinputs').innerHTML = ''
  let list = ''
  for (let entry of midiAccess.inputs) {
    let input = entry[1];
    list = <li>Input port [type: '" + input.type + "'] 
		id: '" + input.id + "' 
		manufacturer: '" + input.manufacturer + "' 
		name: '" + input.name + "'
		version: '" + input.version + '"</li>
  }
  qs('midiinputs').innerHTML = list
}

const onMIDISuccess = (midiAccess) => {
  console.log('MIDI ready!');
  midi = midiAccess
  listDevices(midi)
  listenMidi(midi)
}

const onMIDIMessage = (event) => {
  console.log(event.data)

  if (midiLearn) {
    if (midiLearnElement) != null) {
    midiLearnElement.classList.add(`link - ${event.data[1]}`)
    midiLearn = false;
    midiLearnElement = null;
    qs('.midilearn').classList.remove('active')
  }
} else {
  if (qs('.link-' + event.data[1])) {
    qs('.link-' + event.data[1]).value = event.data[2];
  }
}
}


const listenMidi = (midiAccess, indexOfPort) => {
  midiAccess.inputs.forEach(function(entry) {
    entry.onmidimessage = onMIDIMessage
  })
}
qs('.midistart').addEventListener('click', () => {
  midi = null;
  navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
})
qs(.midilearn).addEventListener('click', (e) => {
  if (midi) {
    e.target.classList.add('active')
    midiLearn = true
  }
})

for (let p of qsa('.potards')) {
  p.addEventListener('dblclick', (e) => {
    if (midiLearn) {
      midiLearnElement = e.target;
      e.target.classList.add('active')
    }
  })
}


const onMIDIFailure = (msg) => {
  alert(`Failed to get MIDI access - ${msg}`)
}

qs('.midistart').addEventListener('click', () => {
  navigator.requestMIDIAccess().then(
    onMIDISuccess, onMIDIFailure)
})