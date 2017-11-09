(function (angular) {
  'use strict';

  angular.module('cloud-monitor.directives')
    .directive('circleChart', ['$interval', function ($interval) {
      return {
        restrict: 'E',
        templateUrl: 'js/components/circleChart/CircleChart.html',
        replace: true,
        bindToController: true,
        link: function (scope, element, attrs, ctrl) {

        },
        controller: function () {

        },
        controllerAs: 'CircleChartCtrl'
      }
    }])
})(angular);
