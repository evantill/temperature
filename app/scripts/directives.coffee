'use strict'

### Directives ###

# register the module with Angular
angular.module('app.directives', [
  # require the 'app.service' module
  'app.services'
])

.directive('trendIcon', () ->
  desc =
    restrict: 'E'
    scope: {
      trendValue : '='
    }
    template: """<i ng-class="trendClass"></i>"""
    link: (scope, elm, attrs, ctrl) ->
      trendClass = () ->
        v=scope.trendValue
        scope.trendClass=
          if angular.isDefined(v) and angular.isNumber(v)
            if(v<1)
              "icon-arrow-down negative-temperature"
            else if(v>1)
              "icon-arrow-up positive-temperature"
            else
              "icon-exchange"
          else
            ""
      scope.$watch('trendValue',trendClass,true)
)

.directive('thermometerCanvas', () ->
  canvasTemplate=(id,w,h,fluidColor) -> """<canvas width="#{w}" height="#{h}" id="#{id}"></canvas>"""
  directiveDescriptor =
    restrict: 'E'
    scope:
      width: '@'
      height: '@'
      temperature: '='
      positiveColor: '@'
      negativeColor: '@'
    compile: (tElement, tAttrs, transclude) ->
      thermometerId=tAttrs['temperature']
      width=tAttrs['width']
      height=tAttrs['height']
      positiveColor=tAttrs['positiveColor']
      negativeColor=tAttrs['negativeColor']
      tElement.append(canvasTemplate(thermometerId,width,height))
      thermometerCtrl=new ThermometerCanvasCtrl('images/thermometer.png',thermometerId,positiveColor,negativeColor)
      (scope, elm, attrs, model) ->
        render = ->
          thermometerCtrl.setTemperature(scope.temperature)
          thermometerCtrl.draw()

        scope.$watch('temperature', render,true)

        thermometerCtrl.init()

)
