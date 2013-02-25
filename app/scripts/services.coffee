'use strict'

### Sevices ###
angular.module('app.services', [])
.factory('version', -> "0.1")

.service 'WeatherService', ($http) ->
  weatherConditions: (callback) ->
    pays = 'France'
    ville = 'Paris'
    tokenId = 'ed98933e537e6811'
    url = 'http://api.wunderground.com/api/'+tokenId+'/conditions/lang:FR/q/'+pays+'/'+ville+'.json?callback=JSON_CALLBACK'

    $http.jsonp(url).then( (response) ->
      ###response.data.forecast.simpleforecast###
      weather =
        temperature: response.data.current_observation.temp_c
        icon_url: 'http://icons.wxug.com/i/c/i/'+response.data.current_observation.icon+'.gif'
        icon_alt: response.data.current_observation.weather

      callback(weather)
    )
