'use strict';

/*
thermometer :
un canvas pour chaque thermometer
une image pour chaque thermometre (a mutualiser)
une valeur temperature

ecoute sur la valeur de temperature

$scope.thermometer
*/
thermometerApp.directive('thermometer', function factory() {
  var directiveDefinitionObject = {    
    template: '<canvas id="{{thermometer.id}}"></canvas>',        
    restrict: 'E',
    scope: false,   
    controller:function ($scope) {


    },
    link: function postLink(scope, elm, attrs, ctrl) { 
    	attrs.$set('ngModel','{{thermometer.bindingName}}')
    	 attrs.$observe('ngModel', function(value) {
    	 	console.log('ngModel has changed value to ' + value);
    	 });
    }
  };
  return directiveDefinitionObject;
});
