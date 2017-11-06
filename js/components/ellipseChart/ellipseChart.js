(function (angular) {
  'use strict';

  angular.module('cloud-monitor.directives')

    .directive('ellipseChart', ['$timeout', function ($timeout) {
      return {
        restrict: 'E',
        templateUrl: 'js/components/ellipseChart/ellipseChart.html',
        replace: true,
        link: function (scope, element, attrs) {
          var svg = d3.select(element[0]);

        }
      }
    }])
})(angular);
