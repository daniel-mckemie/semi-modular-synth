panel = new Interface.Panel({ useRelativeSizesAndPositions: true }) // panel fills page by default, alternatively you can specify boundaries

slider1 = new Interface.Slider({
  bounds: [0, 0, .1, .5],
  min: 0,
  max: 200,
  value: 50,
  ontouchmousestart: function() { 
    console.log('touch or mouse down on slider'),
  }
})



slider2 = new Interface.Slider({
  bounds: [.1, 0, .1, .5],
})

panel.add(slider1, slider2)
