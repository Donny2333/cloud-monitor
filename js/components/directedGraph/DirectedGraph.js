(function (angular) {
  'use strict';

  angular.module('cloud-monitor.directives')
    .directive('directedGraph', ['$interval', function ($interval) {
      return {
        restrict: 'E',
        templateUrl: 'js/components/directedGraph/DirectedGraph.html',
        replace: true,
        bindToController: true,
        link: function (scope, element, attrs, ctrl) {
          var svg = d3.select(element[0]).selectAll('svg.directed'),
            rx = 400,
            ry = 300,
            v = [[0.5, 0.25], [0.75, 0.15], [1, 0.12], [1.25, 0.15], [1.5, 0.25],
              [0.3, 0.4], [0.5, 0.5], [0.75, 0.35], [1.25, 0.35], [1.5, 0.5], [1.7, 0.4],
              [0.18, 0.7], [0.35, 0.75], [1.65, 0.75], [1.88, 0.7],
              [0.15, 1], [1.85, 1],
              [0.18, 1.3], [0.35, 1.25], [1.7, 1.25], [1.88, 1.3],
              [0.3, 1.6], [0.45, 1.5], [0.75, 1.65], [1.25, 1.65], [1.5, 1.5], [1.7, 1.6],
              [0.5, 1.75], [0.75, 1.85], [1, 1.88], [1.25, 1.85], [1.5, 1.75]],
            d = [],
            i;

          function move() {
            for (i = 0; i < v.length; i++) {
              d[i] = [];
              d[i][0] = v[i][0] + (Math.random() - 1) % 0.05;
              d[i][1] = v[i][1] + (Math.random() - 1) % 0.05;
            }
          }

          function drawsvg() {
            var updateC = svg.selectAll('circle').data(d),
              enterC = updateC.enter(),
              exitC = updateC.exit();

            updateC.transition()
              .duration(2000)
              .ease(d3.easeCubicOut)
              .attr('cx', function (d, i) {
                return rx * d[0];
              })
              .attr('cy', function (d, i) {
                return ry * d[1];
              })
              .attr('r', function (d, i) {
                return 25 * Math.sqrt(Math.pow(d[0] - 1, 2) + Math.pow(d[1] - 1, 2));
              });

            enterC.append('circle')
              .attr('cx', function (d, i) {
                return rx * d[0];
              })
              .attr('cy', function (d, i) {
                return ry * d[1];
              })
              .attr('r', function (d, i) {
                return 25 * Math.sqrt(Math.pow(d[0] - 1, 2) + Math.pow(d[1] - 1, 2));
              })
              .attr('class', 'green breath');

            exitC.remove();
          }

          drawsvg();

          $interval(function () {
            move();
            drawsvg();
          }, 5000);
        },
        controller: function () {

        },
        controllerAs: 'DirectedGraphCtrl'
      }
    }])
})(angular);
