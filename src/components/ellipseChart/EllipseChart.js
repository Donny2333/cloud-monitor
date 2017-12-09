;(function(angular) {
  'use strict'

  angular
    .module('cloud-monitor.directives')

    .directive('ellipseChart', [
      '$timeout',
      function($timeout) {
        return {
          restrict: 'E',
          templateUrl: 'src/components/ellipseChart/EllipseChart.html',
          transclude: true,
          replace: true,
          scope: {
            chart: '='
          },
          bindToController: true,
          link: function(scope, element, attrs, ctrl) {
            var svg = d3.select(element[0]).selectAll('.ellipseChart'),
              rx = parseFloat(attrs.rx),
              ry = parseFloat(attrs.ry),
              h = parseFloat(attrs.h),
              x0 = parseFloat(attrs.x0),
              y0 = parseFloat(attrs.y0),
              deltaX = parseFloat(attrs.deltaX),
              deltaH = parseFloat(attrs.deltaH)

            var dataList, colorList, barColorList

            function drawText() {}

            function drawsvg() {
              // ellipse.bottom
              var updateE1 = svg.selectAll('ellipse.bottom').data(dataList),
                enterE1 = updateE1.enter(),
                exitE1 = updateE1.exit()

              updateE1
                .transition()
                .duration(1000)
                .ease(d3.easeCubicOut)
                .attr('cy', function(d, i) {
                  return y0 + h - d
                })

              enterE1
                .append('ellipse')
                .attr('cx', function(d, i) {
                  return x0 + rx + i * deltaX
                })
                .attr('cy', function(d, i) {
                  return y0 + h - d
                })
                .attr('rx', function(d, i) {
                  return rx
                })
                .attr('ry', function(d, i) {
                  return ry
                })
                .attr('fill', function(d, i) {
                  return colorList[i]
                })
                .attr('class', 'bottom')

              exitE1.remove()

              // path.bottom
              var updateP1 = svg.selectAll('path.bottom').data(dataList),
                enterP1 = updateP1.enter(),
                exitP1 = updateP1.exit()

              updateP1
                .transition()
                .duration(1000)
                .ease(d3.easeCubicOut)
                .attr('d', function(d, i) {
                  return _.concat(
                    ['M', x0 + 2 * rx + deltaX * i, h + y0],
                    ['A', rx, ry, 0, 0, 1, x0 + deltaX * i, h + y0],
                    ['V', h - d + y0],
                    ['A', rx, ry, 0, 0, 0, x0 + 2 * rx + deltaX * i, h - d + y0]
                  ).join(' ')
                })

              enterP1
                .append('path')
                .attr('fill', function(d, i) {
                  return barColorList[i]
                })
                .attr('d', function(d, i) {
                  return _.concat(
                    ['M', x0 + 2 * rx + deltaX * i, h + y0],
                    ['A', rx, ry, 0, 0, 1, x0 + deltaX * i, h + y0],
                    ['V', h - d + y0],
                    ['A', rx, ry, 0, 0, 0, x0 + 2 * rx + deltaX * i, h - d + y0]
                  ).join(' ')
                })
                .attr('class', 'bottom')

              exitP1.remove()

              // ellipse.top
              var updateE2 = svg.selectAll('ellipse.top').data(dataList),
                enterE2 = updateE2.enter(),
                exitE2 = updateE2.exit()

              enterE2
                .append('ellipse')
                .attr('cx', function(d, i) {
                  return x0 + rx + i * deltaX
                })
                .attr('cy', function(d, i) {
                  return y0 + ry
                })
                .attr('rx', function(d, i) {
                  return rx
                })
                .attr('ry', function(d, i) {
                  return ry
                })
                .attr('fill', '#F7F7F8')
                .attr('opacity', 0.3)
                .attr('class', 'top')

              exitE2.remove()

              // path.top
              var updateP2 = svg.selectAll('path.top').data(dataList),
                enterP2 = updateP2.enter(),
                exitP2 = updateP2.exit()

              updateP2
                .transition()
                .duration(1000)
                .ease(d3.easeCubicOut)
                .attr('d', function(d, i) {
                  return _.concat(
                    ['M', x0 + 2 * rx + deltaX * i, h - d + deltaH + y0],
                    [
                      'A',
                      rx,
                      ry,
                      0,
                      0,
                      1,
                      x0 + deltaX * i,
                      h - d + deltaH + y0
                    ],
                    ['V', ry + y0],
                    ['A', rx, ry, 0, 0, 0, x0 + 2 * rx + deltaX * i, ry + y0]
                  ).join(' ')
                })

              enterP2
                .append('path')
                .attr('fill', '#AEADB3')
                .attr('opacity', 0.3)
                .attr('d', function(d, i) {
                  return _.concat(
                    ['M', x0 + 2 * rx + deltaX * i, h - d + deltaH + y0],
                    [
                      'A',
                      rx,
                      ry,
                      0,
                      0,
                      1,
                      x0 + deltaX * i,
                      h - d + deltaH + y0
                    ],
                    ['V', ry + y0],
                    ['A', rx, ry, 0, 0, 0, x0 + 2 * rx + deltaX * i, ry + y0]
                  ).join(' ')
                })
                .attr('class', 'top')

              exitP2.remove()
            }

            scope.$watch(
              function() {
                return ctrl.chart
              },
              function(value) {
                dataList = value.dataList
                colorList = value.colorList
                barColorList = value.barColorList
                drawText()
                drawsvg()
              }
            )
          },
          controller: function() {},
          controllerAs: 'EllipseChartCtrl'
        }
      }
    ])
})(angular)
