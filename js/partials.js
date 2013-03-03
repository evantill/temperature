angular.module('partials', [])
.run(['$templateCache', function($templateCache) {
  return $templateCache.put('/partials/main.html', [
'',
'<div class="container">',
'  <div class="page-header">',
'    <h1>Températures à Halloville <small>(Stage Alexandre Belin)</small></h1>',
'  </div>',
'  <div class="row-fluid">',
'    <div class="span4 well">',
'      <div class="therm_location">',
'        <div class="centrage"><img ng-hide="!outsideWeather.icon_url" ng-src="{{outsideWeather.icon_url}}"/><i ng-show="!outsideWeather.icon_url" class="icon-globe icon-4x"></i></div>',
'      </div>',
'      <div class="therm_graph">',
'        <div class="centrage">',
'          <thermometer-canvas temperature="outsideWeather.temperature" width="90" height="447.5" positive-color="rgb(200,0,0)" negative-color="rgb(0, 102, 198)"></thermometer-canvas>',
'        </div>',
'      </div>',
'      <div class="therm_info">',
'        <div class="centrage">',
'          <trend-icon trend-value="outsideWeather.trend"></trend-icon><span class="temperature"><strong>{{outsideWeather.temperature|number:1}} °C</strong></span><span ng-click="refreshOutSideWeather()"><i class="icon-refresh icon"></i></span>',
'        </div>',
'      </div>',
'    </div>',
'    <div class="span4 well">',
'      <div class="therm_location">',
'        <div class="centrage"><i class="icon-home icon-4x"></i></div>',
'      </div>',
'      <div class="therm_graph">',
'        <div class="centrage">',
'          <thermometer-canvas temperature="homeTemperature" width="90" height="447.5" positive-color="rgb(200,0,0)" negative-color="rgb(0, 102, 198)"></thermometer-canvas>',
'        </div>',
'      </div>',
'      <div class="therm_info">',
'        <div class="centrage">',
'          <!--i.icon-arrow-up.icon-2x--><span class="temperature"><strong>{{homeTemperature|number:1}}°C</strong></span><span ng-click="refreshInSideWeather()"><i class="icon-refresh icon"></i></span>',
'        </div>',
'      </div>',
'    </div>',
'    <div class="span4 well">',
'      <div class="therm_location">',
'        <div class="centrage"><i class="icon-fire icon-4x"></i></div>',
'      </div>',
'      <div class="therm_graph">',
'        <div class="centrage">',
'          <thermometer-canvas temperature="heat.temperature" width="90" height="447.5" positive-color="rgb(200,0,0)" negative-color="rgb(0, 102, 198)"></thermometer-canvas>',
'        </div>',
'      </div>',
'      <div class="therm_info">',
'        <div class="centrage"><i class="icon-circle icon-2x"></i><span class="temperature"><strong>{{heat_temp}}°C</strong></span><i class="icon-minus icon-2x"></i><i class="icon-plus icon-2x"></i><span ng-click="refreshZybaseInfo()"><i class="icon-refresh icon"></i></span></div>',
'      </div>',
'    </div>',
'  </div>',
'</div>',''].join("\n"));
}]);