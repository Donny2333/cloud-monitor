import angular from 'angular'
import d3 from 'd3'

const EllipseChart = angular
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
          const svg = d3.select(element[0]).selectAll('.ellipseChart')
          const rx = parseFloat(attrs.rx)
          const ry = parseFloat(attrs.ry)
          const h = parseFloat(attrs.h)
          const x0 = parseFloat(attrs.x0)
          const y0 = parseFloat(attrs.y0)
          const deltaX = parseFloat(attrs.deltaX)
          const deltaH = parseFloat(attrs.deltaH)

          var dataList, colorList, barColorList

          function drawText() {}

          function drawsvg() {
            // ellipse.bottom
            const updateE1 = svg.selectAll('ellipse.bottom').data(dataList)
            const enterE1 = updateE1.enter()
            const exitE1 = updateE1.exit()

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
            const updateP1 = svg.selectAll('path.bottom').data(dataList)
            const enterP1 = updateP1.enter()
            const exitP1 = updateP1.exit()

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
            const updateE2 = svg.selectAll('ellipse.top').data(dataList)
            const enterE2 = updateE2.enter()
            const exitE2 = updateE2.exit()

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
            const updateP2 = svg.selectAll('path.top').data(dataList)
            const enterP2 = updateP2.enter()
            const exitP2 = updateP2.exit()

            updateP2
              .transition()
              .duration(1000)
              .ease(d3.easeCubicOut)
              .attr('d', function(d, i) {
                return _.concat(
                  ['M', x0 + 2 * rx + deltaX * i, h - d + deltaH + y0],
                  ['A', rx, ry, 0, 0, 1, x0 + deltaX * i, h - d + deltaH + y0],
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
                  ['A', rx, ry, 0, 0, 1, x0 + deltaX * i, h - d + deltaH + y0],
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

module.exports = EllipseChart.name
