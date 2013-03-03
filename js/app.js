'use strict';
var App;

App = angular.module('app', ['app.controllers', 'app.services', 'app.directives', 'partials']);

App.config([
  '$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
      templateUrl: '/partials/main.html'
    });
    return $locationProvider.html5Mode(true);
  }
]);

App.config([
  '$httpProvider', function($httpProvider) {
    return delete $httpProvider.defaults.headers.common["X-Requested-With"];
  }
]);
'use strict';
var App;

App = angular.module('app', ['app.controllers', 'app.services', 'app.directives', 'partials']);

App.config([
  '$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
      templateUrl: '/partials/main.html'
    });
    return $locationProvider.html5Mode(true);
  }
]);

App.config([
  '$httpProvider', function($httpProvider) {
    return delete $httpProvider.defaults.headers.common["X-Requested-With"];
  }
]);
'use strict';
/* Controllers
*/

angular.module('app.controllers', ['app.services']).controller('AppCtrl', [
  '$scope', '$http', 'WeatherService', 'ZybaseService', function($scope, $http, WeatherService, ZybaseService) {
    var refreshInSideWeatherFn, refreshOutSideWeatherFn;
    refreshOutSideWeatherFn = function() {
      return WeatherService.weatherConditions(function(weather) {
        return $scope.outsideWeather = weather;
      });
    };
    $scope.refreshOutSideWeather = refreshOutSideWeatherFn;
    $scope.$on("$viewContentLoaded", refreshOutSideWeatherFn);
    refreshInSideWeatherFn = function() {
      return ZybaseService.sensorsValue(29, function(value) {
        return $scope.homeTemperature = value / 10;
      });
    };
    $scope.refreshInSideWeather = refreshInSideWeatherFn;
    return $scope.$on("$viewContentLoaded", refreshInSideWeatherFn);
  }
]);
'use strict';
/* Directives
*/

angular.module('app.directives', ['app.services']).directive('trendIcon', function() {
  var desc;
  return desc = {
    restrict: 'E',
    scope: {
      trendValue: '='
    },
    template: "<i ng-class=\"trendClass\"></i>",
    link: function(scope, elm, attrs, ctrl) {
      var trendClass;
      trendClass = function() {
        var v;
        v = scope.trendValue;
        return scope.trendClass = angular.isDefined(v) && angular.isNumber(v) ? v < 1 ? "icon-arrow-down negative-temperature" : v > 1 ? "icon-arrow-up positive-temperature" : "icon-exchange" : "";
      };
      return scope.$watch('trendValue', trendClass, true);
    }
  };
}).directive('thermometerCanvas', function() {
  var canvasTemplate, directiveDescriptor;
  canvasTemplate = function(id, w, h, fluidColor) {
    return "<canvas width=\"" + w + "\" height=\"" + h + "\" id=\"" + id + "\"></canvas>";
  };
  return directiveDescriptor = {
    restrict: 'E',
    scope: {
      width: '@',
      height: '@',
      temperature: '=',
      positiveColor: '@',
      negativeColor: '@'
    },
    compile: function(tElement, tAttrs, transclude) {
      var height, negativeColor, positiveColor, thermometerCtrl, thermometerId, width;
      thermometerId = tAttrs['temperature'];
      width = tAttrs['width'];
      height = tAttrs['height'];
      positiveColor = tAttrs['positiveColor'];
      negativeColor = tAttrs['negativeColor'];
      tElement.append(canvasTemplate(thermometerId, width, height));
      thermometerCtrl = new ThermometerCanvasCtrl('images/thermometer.png', thermometerId, positiveColor, negativeColor);
      return function(scope, elm, attrs, model) {
        var render;
        render = function() {
          thermometerCtrl.setTemperature(scope.temperature);
          return thermometerCtrl.draw();
        };
        scope.$watch('temperature', render, true);
        return thermometerCtrl.init();
      };
    }
  };
});
'use strict';
/* Filters
*/

angular.module('app.filters', []).filter('interpolate', [
  'version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    };
  }
]).filter('default', function() {
  return function(text, defaultValue) {
    if (angular.isDefined(text)) {
      return text;
    } else {
      return defaultValue;
    }
  };
});
'use strict';
/* Sevices
*/

angular.module('app.services', []).service('WeatherService', function($http) {
  return {
    weatherConditions: function(callback) {
      var halloville, tokenId, tomorrowTrend, url, ville;
      halloville = {
        longitude: 6.866666793823242,
        latitude: 48.54999923706055
      };
      ville = halloville;
      tokenId = "ed98933e537e6811";
      url = "http://api.wunderground.com/api/" + tokenId + "/conditions/forecast/lang:FR/q/" + ville.latitude + "," + ville.longitude + ".json?callback=JSON_CALLBACK";
      tomorrowTrend = function(forecasts) {
        var todayMax, todayMean, todayMin, tomorrowMax, tomorrowMean, tomorrowMin;
        todayMin = parseInt(forecasts[0].low.celsius);
        todayMax = parseInt(forecasts[0].high.celsius);
        tomorrowMin = parseInt(forecasts[1].low.celsius);
        tomorrowMax = parseInt(forecasts[1].high.celsius);
        todayMean = (todayMax + todayMin) / 2;
        tomorrowMean = (tomorrowMax - tomorrowMin) / 2;
        return tomorrowMean - todayMean;
      };
      return $http.jsonp(url).then(function(response) {
        var current, weather;
        current = response.data.current_observation;
        current.weather;
        current.temp_c;
        current.feelslike_c;
        current.icon;
        current.icon_url;
        weather = {
          temperature: response.data.current_observation.temp_c,
          feelslike: response.data.current_observation.feelslike_c,
          icon_url: "http://icons.wxug.com/i/c/i/" + response.data.current_observation.icon + ".gif",
          icon_alt: response.data.current_observation.weather,
          trend: tomorrowTrend(response.data.forecast.simpleforecast.forecastday)
        };
        return callback(weather);
      });
    }
  };
}).service('ZybaseService', function($http) {
  return {
    sensorsStatus: function(callback) {
      var url, x2js;
      url = "http://localhost:3333/json/sensors.xml";
      x2js = new X2JS();
      return $http.get(url).then(function(response) {
        return callback(x2js.xml_str2json(response.data));
      });
    },
    sensorsValue: function(sensorNumber, callback) {
      return this.sensorsStatus(function(data) {
        return callback(data.doc.vars["var"][sensorNumber]._val);
      });
    }
  };
});
'use strict';
var ImageLoader, ThermometerCanvasCtrl,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

ImageLoader = (function() {

  ImageLoader.prototype.img = new Image;

  ImageLoader.prototype.loadedCallBackFns = [];

  ImageLoader.prototype.loaded = false;

  function ImageLoader(url) {
    var _this = this;
    this.url = url;
    this.onLoad(function() {
      return _this.loaded = true;
    });
  }

  ImageLoader.prototype.load = function() {
    var _this = this;
    this.img.onload = function() {
      var cb, _i, _len, _ref, _results;
      _ref = _this.loadedCallBackFns;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        cb = _ref[_i];
        _results.push(cb());
      }
      return _results;
    };
    return this.img.src = this.url;
  };

  ImageLoader.prototype.onLoad = function(cb) {
    if (this.loaded) {
      return cb();
    } else {
      return this.loadedCallBackFns.push(cb);
    }
  };

  ImageLoader.prototype.getImage = function() {
    return this.img;
  };

  return ImageLoader;

})();

ThermometerCanvasCtrl = (function() {

  ThermometerCanvasCtrl.prototype.imageWidth = 180;

  ThermometerCanvasCtrl.prototype.imageHeight = 895;

  function ThermometerCanvasCtrl(backgroundImageUrl, canvasId, positiveColor, negativeColor) {
    var _this = this;
    this.backgroundImageUrl = backgroundImageUrl;
    this.canvasId = canvasId;
    this.positiveColor = positiveColor;
    this.negativeColor = negativeColor;
    this.draw = __bind(this.draw, this);
    this.temperature = void 0;
    this.backgroundLoader = new ImageLoader(backgroundImageUrl);
    this.backgroundLoader.onLoad(function() {
      return _this.draw();
    });
  }

  ThermometerCanvasCtrl.prototype.init = function() {
    this.backgroundLoader.load();
    this.canvas = document.getElementById(this.canvasId);
    this.context = this.scaleAndCenter(this.canvas.getContext('2d'));
    return this.draw();
  };

  ThermometerCanvasCtrl.prototype.scaleAndCenter = function(ctx) {
    var scale, xOffset, xScale, yOffset, yScale;
    xScale = ctx.canvas.height / this.imageHeight;
    yScale = ctx.canvas.width / this.imageWidth;
    scale = Math.min(xScale, yScale);
    xOffset = (ctx.canvas.width - this.imageWidth * scale) / 2;
    yOffset = (ctx.canvas.height - this.imageHeight * scale) / 2;
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.translate(xOffset, yOffset);
    ctx.scale(scale, scale);
    ctx.translate(-25, -10);
    return ctx;
  };

  ThermometerCanvasCtrl.prototype.draw = function() {
    if (this.context) {
      if (this.backgroundLoader.loaded) {
        this.drawBackground();
      }
      if (this.temperature != null) {
        return this.drawFluid(this.temperature);
      }
    }
  };

  ThermometerCanvasCtrl.prototype.drawBackground = function() {
    return this.context.drawImage(this.backgroundLoader.getImage(), 0, 0);
  };

  ThermometerCanvasCtrl.prototype.drawFluid = function(temperature) {
    var fluidWidth, xPos, yOffset, yPos, yTemperature;
    yTemperature = this.temperatureToScreeCoord(temperature);
    xPos = 111;
    yPos = 7;
    yOffset = 686;
    fluidWidth = 35;
    this.context.fillStyle = temperature > 0 ? this.positiveColor : this.negativeColor;
    this.context.fillRect(xPos, yTemperature, yPos, yOffset - yTemperature);
    this.context.fillRect(xPos, yOffset, yPos, fluidWidth);
    return this.context.stroke();
  };

  ThermometerCanvasCtrl.prototype.temperatureToScreeCoord = function(temperature) {
    var maxTemperature, offset;
    maxTemperature = 50;
    offset = 147;
    return offset + (this.ratio(temperature) * (maxTemperature - temperature));
  };

  ThermometerCanvasCtrl.prototype.ratio = function(temperature) {
    var ratio;
    if (temperature > 0) {
      ratio = 7.1;
    }
    if (temperature <= 0) {
      ratio = 6.9;
    }
    if (temperature < -20) {
      ratio = 6.77;
    }
    return ratio;
  };

  ThermometerCanvasCtrl.prototype.setTemperature = function(value) {
    if (angular.isNumber(value)) {
      if (value > 50) {
        this.temperature = 50;
      } else if (value < -30) {
        this.temperature = -30;
      } else {
        this.temperature = value;
      }
      this.draw();
    }
    return value;
  };

  return ThermometerCanvasCtrl;

})();
