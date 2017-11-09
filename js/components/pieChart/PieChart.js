(function (angular) {
  'use strict';

  angular.module('cloud-monitor.directives')
    .directive('pieChart', ['$interval', function ($interval) {
      return {
        restrict: 'E',
        templateUrl: 'js/components/pieChart/PieChart.html',
        replace: true,
        bindToController: true,
        link: function (scope, element, attrs, ctrl) {

        },
        controller: function () {

        },
        controllerAs: 'PieChartCtrl'
      }
    }])
})(angular);
