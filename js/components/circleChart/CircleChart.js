(function (angular) {
  'use strict';

  angular.module('cloud-monitor.directives')
    .directive('circleChart', ['$interval', function ($interval) {
      return {
        restrict: 'E',
        templateUrl: 'js/components/circleChart/CircleChart.html',
        replace: true,
        bindToController: true,
        scope: {
          color: '=',
          title: '=',
          detail: '='
        },
        link: function (scope, element, attrs, ctrl) {
          var svg = d3.select(element[0]).selectAll('svg'),
            cx = 150,
            cy = 150,
            r = 120;

          ctrl.percent = ctrl.detail.usageValue / ctrl.detail.totalValue * 100;

          var updateP = svg.selectAll('path').data([ctrl.percent]),
            enterP = updateP.enter(),
            exitP = updateP.exit();

          enterP.append('path')
            .attr('fill', 'none')
            .attr('stroke-width', 30)
            .attr('stroke-linecap', 'round')
            .attr('stroke-miterlimit', 10)
            .attr('stroke', function (d, i) {
              return 'url(' + ctrl.color + ')';
            })
            .attr('d', function (d, i) {

              return _.concat(['M', cx + r, r],
                ['A', r, r, 0, 0, 1, cx + Math.cos(360 * d / 100) * r, cy + Math.sin(360 * d / 100) * r]
              ).join(' ');
            });

          exitP.remove();
        },
        controller: function () {

        },
        controllerAs: 'CircleChartCtrl'
      }
    }])
})(angular);
