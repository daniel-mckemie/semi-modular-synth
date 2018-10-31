const dial = new Nexus.Dial('#dial',{
  'size': [150, 150],
  'interaction': 'radial', // "radial", "vertical", or "horizontal"
  'mode': 'relative', // "absolute" or "relative"
  'min': 0,
  'max': 2000,
  'step': 0,
  'value': 0
})

const slider = new Nexus.Slider('#slider',{
    'size': [120,20],
    'mode': 'relative',  // 'relative' or 'absolute'
    'min': 1,
    'max': 5,
    'step': 0,
    'value': 0
})

// var modulator = new Tone.Oscillator(20, "square").toMaster().start()
var carrier = new Tone.FMOscillator({
	frequency: 200,
	modulationIndex: 2,
	modulationType: "sine",
	harmonicity: 1
}).toMaster().start()

dial.on('change', function(x){
	carrier.frequency.value = x

})


slider.on('change', function(x) {
	carrier.harmonicity.value = x
})





