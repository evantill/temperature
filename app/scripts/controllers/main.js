'use strict';

thermometerApp.controller('MainCtrl', function ($scope,$http,WeatherService) {
	
	var refreshOutSideWeatherFn = function() {    	
		WeatherService.weatherConditions(function(weather){
			$scope.outsideTemp = weather.temperature
			$scope.outsideTempIcon = weather.icon_url
			$scope.outsideTempIconAlt = weather.icon_alt
		});
	}
	
	$scope.refreshOutSideWeather = refreshOutSideWeatherFn

	$scope.$on("$viewContentLoaded",refreshOutSideWeatherFn)   

  });
