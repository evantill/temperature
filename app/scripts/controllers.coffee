'use strict'

### Controllers ###

angular.module('app.controllers', ['app.services'])
  .controller('AppCtrl', [
    '$scope'
    '$http'
    'WeatherService'

    ($scope, $http, WeatherService) ->
      refreshOutSideWeatherFn = ->
        WeatherService.weatherConditions( (weather) ->
          $scope.outsideWeather = weather
          $scope.debug = weather.debug
        )

      $scope.refreshOutSideWeather = refreshOutSideWeatherFn
      
      #$scope.$on("$viewContentLoaded",refreshOutSideWeatherFn)
])
