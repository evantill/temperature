'use strict'

### Sevices ###
angular.module('app.services', [])
.service('WeatherService', ($http) ->
  weatherConditions: (callback) ->
    halloville =
      longitude: 6.866666793823242
      latitude: 48.54999923706055
    ville = halloville
    tokenId = "ed98933e537e6811"
    url = "http://api.wunderground.com/api/#{tokenId}/conditions/forecast/lang:FR/q/#{ville.latitude},#{ville.longitude}.json?callback=JSON_CALLBACK"

    tomorrowTrend=(forecasts) ->
      todayMin = parseInt(forecasts[0].low.celsius)
      todayMax = parseInt(forecasts[0].high.celsius)
      tomorrowMin = parseInt(forecasts[1].low.celsius)
      tomorrowMax = parseInt(forecasts[1].high.celsius)
      todayMean= (todayMax+todayMin)/2
      tomorrowMean=(tomorrowMax-tomorrowMin)/2
      tomorrowMean-todayMean

    $http.jsonp(url).then( (response) ->
      current = response.data.current_observation
      current.weather
      current.temp_c
      current.feelslike_c
      current.icon
      current.icon_url
      weather =
        temperature: response.data.current_observation.temp_c
        feelslike: response.data.current_observation.feelslike_c
        icon_url: "http://icons.wxug.com/i/c/i/#{response.data.current_observation.icon}.gif"
        icon_alt: response.data.current_observation.weather
        trend: tomorrowTrend(response.data.forecast.simpleforecast.forecastday)
      callback(weather)
    )
)
.service('ZybaseService', ($http)->
  sensorsStatus: (callback)->
    url = "http://localhost:3333/json/sensors.xml"
    x2js= new X2JS()
    $http.get(url).then( (response) ->
      callback(x2js.xml_str2json(response.data))
    )
  sensorsValue: (sensorNumber,callback)->
    @sensorsStatus( (data)->
      callback(data.doc.vars["var"][sensorNumber]._val)
    )
)