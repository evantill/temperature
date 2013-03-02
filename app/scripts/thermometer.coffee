'use strict'

#manage onLoad callback
class ImageLoader
  img: new Image

  loadedCallBackFns: []

  loaded: false

  constructor: (@url) -> @onLoad(=>@loaded = true)

  load: ->
    @img.onload = =>
      for cb in @loadedCallBackFns
        cb()
    @img.src = @url

  onLoad: (cb) ->
    if @loaded
      cb()
    else
      @loadedCallBackFns.push(cb)

  getImage: -> @img

#used to draw thermometer on an HTML canvas
class ThermometerCanvasCtrl
  imageWidth:180
  imageHeight:895
  #positiveColor:"rgb(200,0,0)"
  #negativeColor:"rgb(0, 102, 198)"

  constructor: (@backgroundImageUrl,@canvasId,@positiveColor,@negativeColor) ->
    @temperature=undefined
    @backgroundLoader = new ImageLoader(backgroundImageUrl)
    @backgroundLoader.onLoad(=>@draw())

  init: ->
    @backgroundLoader.load()
    @canvas=document.getElementById(@canvasId)
    @context=@scaleAndCenter(@canvas.getContext('2d'))
    @draw()

  scaleAndCenter: (ctx) ->
    xScale=ctx.canvas.height/@imageHeight
    yScale=ctx.canvas.width/@imageWidth
    scale=Math.min(xScale,yScale)
    xOffset=(ctx.canvas.width-@imageWidth*scale)/2
    yOffset=(ctx.canvas.height-@imageHeight*scale)/2
    ctx.fillStyle = "#FFFFFF"
    ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height)
    ctx.translate(xOffset,yOffset)
    ctx.scale(scale,scale)
    ctx.translate(-25, -10)
    return ctx

  draw: =>
    console.debug("draw loaded=#{@backgroundLoader.loaded} temperature=#{@temperature}")
    if @context
      @drawBackground() if @backgroundLoader.loaded
      @drawFluid(@temperature) if @temperature?

  drawBackground: () ->
    @context.drawImage(@backgroundLoader.getImage(), 0, 0)

  drawFluid: (temperature) ->
    yTemperature = @temperatureToScreeCoord(temperature)
    xPos = 111
    yPos = 7
    yOffset = 686
    fluidWidth = 35
    @context.fillStyle = if temperature>0 then @positiveColor else @negativeColor
    #Draw rectangle from -30 to yTemperature
    @context.fillRect(xPos, yTemperature, yPos, yOffset - yTemperature)
    #Draw rectangle from botton to -30
    @context.fillRect(xPos, yOffset, yPos, fluidWidth)
    @context.stroke()

  temperatureToScreeCoord: (temperature) ->
    maxTemperature = 50
    offset = 147
    return offset + (@ratio(temperature) * (maxTemperature - temperature))

  ratio: (temperature) ->
    ratio = 7.1 if temperature > 0
    ratio = 6.9 if temperature <= 0
    ratio = 6.77 if temperature < -20
    return ratio

  setTemperature: (value) ->
    if angular.isNumber(value)
      if value>50
        @temperature = 50
      else if value<-30
        @temperature = -30
      else
        @temperature = value
      @draw()
    value

