'use strict';


thermometerApp.service('WeatherService', function($http) {
		
		this.weatherConditions = function(callback) {
			var pays='France'
			var ville='Paris'
			var tokenId='ed98933e537e6811'
			var url='off';//http://api.wunderground.com/api/'+tokenId+'/conditions/forecast/lang:FR/q/'+pays+'/'+ville+'.json?callback=JSON_CALLBACK'

			$http.jsonp(url).then( function ( response ) {		  
				response.data.forecast.simpleforecast
				var weather = {
					temperature: response.data.current_observation.temp_c,
					icon_url: 'http://icons.wxug.com/i/c/i/'+response.data.current_observation.icon+'.gif',
					icon_alt: response.data.current_observation.weather
				}
	    		callback(weather)	    		
	    	});
	    }
	});
