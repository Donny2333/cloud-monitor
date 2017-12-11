import angular from 'angular'
import _ from 'lodash'
import d3 from 'd3'

const CircleChart = angular
  .module('cloud-monitor.directives')
  .directive('circleChart', [
    '$interval',
    function($interval) {
      return {
        restrict: 'E',
        templateUrl: 'src/components/circleChart/CircleChart.html',
        replace: true,
        bindToController: true,
        scope: {
          color: '=',
          title: '=',
          detail: '='
        },
        link: function(scope, element, attrs, ctrl) {
          const svg = d3.select(element[0]).selectAll('svg')
          const cx = 150
          const cy = 150
          const r = 120

          ctrl.percent = ctrl.detail.usageValue / ctrl.detail.totalValue * 100

          function drawsvg() {
            const updateP = svg.selectAll('path').data([ctrl.percent])
            const enterP = updateP.enter()
            const exitP = updateP.exit()

            updateP.attr('d', function(d, i) {
              var angle = 2 * Math.PI * d / 100

              return _.concat(
                ['M', cx + r, cy],
                [
                  'A',
                  r,
                  r,
                  0,
                  Math.floor(d / 50),
                  1,
                  cx + Math.cos(angle) * r,
                  cy + Math.sin(angle) * r
                ]
              ).join(' ')
            })

            enterP
              .append('path')
              .attr('fill', 'none')
              .attr('stroke-width', 30)
              .attr('stroke-linecap', 'round')
              .attr('stroke-miterlimit', 10)
              .attr('stroke', function(d, i) {
                return ctrl.color
              })
              .attr('d', function(d, i) {
                var angle = 2 * Math.PI * d / 100
                return _.concat(
                  ['M', cx + r, cy],
                  [
                    'A',
                    r,
                    r,
                    0,
                    Math.floor(d / 50),
                    1,
                    cx + Math.cos(angle) * r,
                    cy + Math.sin(angle) * r
                  ]
                ).join(' ')
              })

            exitP.remove()
          }

          scope.$watch(
            function() {
              return ctrl.detail.usageValue
            },
            function(value) {
              ctrl.percent =
                ctrl.detail.usageValue / ctrl.detail.totalValue * 100
              drawsvg()
            }
          )
        },
        controller: function() {},
        controllerAs: 'CircleChartCtrl'
      }
    }
  ])

module.exports = CircleChart.name
