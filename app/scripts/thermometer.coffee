
#manage onLoad callback
class ImageLoader 
	img = new Image

	loadedCallBackFns: [] 

	loaded=false

	constructor: (@url) ->						
		onLoad(=>@loaded = true)

	load: ->		
		@img.onload => 
			for cb in loadedCallBackFns
				cb()
		@img.src = @url

	onLoad: (cb) ->
		if @loaded
			cb()
		else
			@loadedCallBackFns.push(cb)

	getImage: -> @img

#used to draw thermometer on an HTML canvas
class ThermometerCanvas 	

	constructor: (@backgroundImageUrl, @canvas) ->
		@temperature=undefined
		@backgroundLoader = new ImageLoader(backgroundImageUrl)
		@backgroundLoader.onLoad(->draw())
	
	draw: ->		
		console.log('draw...')
		ctx = @canvas.getContext('2d');
		@drawBackground(ctx) if @backgroundLoader.loaded
		@drawFluid(ctx) if not @temperature?

	drawBackground: (ctx) ->		
		console.log('draw fluid')
		ctx.drawImage(@backgroundLoader.getImage, 0, 0);			

	drawFluid: (ctx) ->		
		console.log('draw fluid')		
		yTemperature = @temperatureToScreeCoord()
		xPos = 11
		yPos = 7
		yOffset = 686
		fluidWidth = 35
		#color
		ctx.fillStyle = "rgb(200,0,0)"
		#Draw rectangle from -30 to yTemperature
		ctx.fillRect(xPos, yTemperature, yPos, yOffset - yTemperature)
		#Draw rectangle from botton to -30
		ctx.fillRect(xPos, yOffset, yPos, fluidWidth)
		ctx.stroke()

	temperatureToScreeCoord: ->
		maxTemperature = 50
		offset = 147
		return offset + (@ratio() * (maxTemperature - @temperature))

	ratio: ->
		ratio = 7.1 if @temperature > 0
		ratio = 6.9 if @temperature <= 0
		ratio = 6.77 if @temperature < -20
		return ratio

	setTemperature: (value) ->
		if value>50
			@temperature = 50 
		else if value<-30
			@temperature = -30 
		else
			@temperature = value
		@draw()
