'use strict'

### Controllers ###

angular.module('app.controllers', ['app.services'])
.controller('AppCtrl', [
  '$scope'
  '$http'
  'WeatherService'
  'ZybaseService'

  ($scope, $http, WeatherService, ZybaseService) ->
    refreshOutSideWeatherFn = ->
      WeatherService.weatherConditions( (weather) ->
        $scope.outsideWeather = weather
      )

    $scope.refreshOutSideWeather = refreshOutSideWeatherFn
    $scope.$on("$viewContentLoaded",refreshOutSideWeatherFn)

    refreshInSideWeatherFn = ->
      ZybaseService.sensorsValue( 29,(value) ->
        $scope.homeTemperature = value/10
      )

    $scope.refreshInSideWeather = refreshInSideWeatherFn
    $scope.$on("$viewContentLoaded",refreshInSideWeatherFn)
])
