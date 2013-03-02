'use strict'

# Declare app level module which depends on filters, and services
App = angular.module('app', [
  'app.controllers'
  'app.services'
  'app.directives'
  'partials'
])

App.config([
  '$routeProvider'
  '$locationProvider'

  ($routeProvider, $locationProvider) ->
    $routeProvider
      .when('/', {templateUrl: '/partials/main.html'})
    
      # Catch all
      # .otherwise({redirectTo: '/'})

    # Without server side support html5 must be disabled.
    $locationProvider.html5Mode(true)
])

App.config([
  '$httpProvider'
  ($httpProvider) ->
    delete $httpProvider.defaults.headers.common["X-Requested-With"]
])

