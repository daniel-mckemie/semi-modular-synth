const dial = new Nexus.Dial('#dial',{
  'size': [150, 150],
  'interaction': 'radial', // "radial", "vertical", or "horizontal"
  'mode': 'relative', // "absolute" or "relative"
  'min': 0,
  'max': 400,
  'step': 0,
  'value': 0
})

var osc = new Tone.Oscillator(440, "sine").toMaster().start()

dial.on('change', function(x){
	osc.frequency.value = x

})

const slider = new Nexus.Slider('#slider')

slider.on('change', function(x) {
	console.log(x)
})





