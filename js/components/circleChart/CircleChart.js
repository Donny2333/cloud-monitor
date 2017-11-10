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

          function drawsvg() {
            var updateP = svg.selectAll('path').data([ctrl.percent]),
              enterP = updateP.enter(),
              exitP = updateP.exit();

            updateP
              .attr('d', function (d, i) {
                var angle = 2 * Math.PI * d / 100;

                return _.concat(['M', cx + r, cy],
                  ['A', r, r, 0, Math.floor(d / 50), 1, cx + Math.cos(angle) * r, cy + Math.sin(angle) * r]
                ).join(' ');
              });

            enterP.append('path')
              .attr('fill', 'none')
              .attr('stroke-width', 30)
              .attr('stroke-linecap', 'round')
              .attr('stroke-miterlimit', 10)
              .attr('stroke', function (d, i) {
                return 'url(' + ctrl.color + ')';
              })
              .attr('d', function (d, i) {
                var angle = 2 * Math.PI * d / 100;
                return _.concat(['M', cx + r, cy],
                  ['A', r, r, 0, Math.floor(d / 50), 1, cx + Math.cos(angle) * r, cy + Math.sin(angle) * r]
                ).join(' ');
              });

            exitP.remove();
          }


          scope.$watch(function () {
            return ctrl.detail.usageValue;
          }, function (value) {
            ctrl.percent = ctrl.detail.usageValue / ctrl.detail.totalValue * 100;
            drawsvg();
          });
        },
        controller: function () {

        },
        controllerAs: 'CircleChartCtrl'
      }
    }])
})(angular);
