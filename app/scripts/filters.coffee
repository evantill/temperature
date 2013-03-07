'use strict'

### Filters ###

angular.module('app.filters', [])

  .filter('interpolate', [
    'version',

    (version) ->
      (text) ->
        String(text).replace(/\%VERSION\%/mg, version)
  ])

  .filter('default', () ->
    (text, defaultValue) ->
      if(angular.isDefined(text)) then text else defaultValue
  )
