'use strict';

var zybaseDeviceId='ZIBASE00542b'
var zybaseToken='b2b2068c7d'
var zybaseIp='192.168.1.55'

var zybaseGetSensorsUrlFn=function(device,token) {
		//return 'http://zibase.net/m/get_xml_sensors.php?device='+device+'&token='+token;
		return 'http://'+zybaseIp+'/sensors.xml';		
	}

var zybaseGetSensorsHttpFn=function($http){
	$http({
		method : 'GET',
		url : zybaseGetSensorsUrlFn(zybaseDeviceId,zybaseToken),
		headers : {
			'Accept': 'text/xml'
		},
		transformResponse: function(data, headersGetter) {
			return x2js.xml_str2json(data);
		},
		cache:false
	}).success( function(response) {		
			$scope.zybaseData=JSON.stringify(response, null, 4)
	});
}

var xxxApp = angular.module('xxxApp');

xxxApp.config(['$httpProvider', function($httpProvider) {
    delete $httpProvider.defaults.headers.common["X-Requested-With"]
}]);

xxxApp.controller('MainCtrl', function ($scope,$http) {

	var refreshOutSideWeatherFn = function() {    	
    	var url='json/paris_forecast_json.txt'		
		$http.get(url).success( function ( response ) {
			$scope.response=JSON.stringify(response, null, 4)
			//var temp=response.data.current_observation.temp_c		  	    	
	    	//var icon_url = "http://icons.wxug.com/i/c/i/"+response.data.current_observation.icon+".gif"	    	
			//$scope.outside_temp = temp			
			//$scope.img_temp=icon_url
		});    	
    }

	$scope.refreshOutSideWeather = refreshOutSideWeatherFn

	 $scope.$on("$viewContentLoaded",refreshOutSideWeatherFn)   

	 $scope.refreshOutSideWeatherProd=function() {    	
	    	var url='http://api.wunderground.com/api/ed98933e537e6811/conditions/lang:FR/q/France/Paris.json?callback=JSON_CALLBACK'		
			$http.jsonp(url).then( function ( response ) {		  
	    	$scope.response=JSON.stringify(response, null, 4)
				//alert('refreshOutSideWeather done' + response.data.temp_c+ ' ' +response.data.icon_url);
				/*$scope.outsideWeather={
					temperature: response.data.temp_c,
					icon_url: response.data.icon_url
				}*/
			});    	
			
			$scope.outside_temp = '!!!'
	    }

//    $scope.outsideWeather=undefined;
//    $scope.outside_temp=outsideWeather.temperature;
    $scope.inside_temp='2'
    $scope.heat_temp='0'

	$scope.refreshZybaseInfo = function() {
		zybaseGetSensorsHttpFn($http)
	}

  });
