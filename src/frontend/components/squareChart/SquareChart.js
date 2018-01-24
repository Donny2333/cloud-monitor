import * as d3 from 'd3'

export default class SquareChart {
  constructor($timeout) {
    return {
      restrict: 'E',
      template: require('./SquareChart.html'),
      transclude: true,
      replace: true,
      scope: {
        chart: '='
      },
      bindToController: true,
      link: function (scope, element, attrs, ctrl) {
        const svg = d3.select(element[0]).selectAll('.squareChart')
        const a = parseFloat(attrs.a)
        const b = parseFloat(attrs.b)
        const h = parseFloat(attrs.h)
        const x0 = parseFloat(attrs.x0)
        const y0 = parseFloat(attrs.y0)
        const deltaX = parseFloat(attrs.deltaX)
        const deltaH = parseFloat(attrs.deltaH)

        let dataList, colorList, barColorList

        function drawSVG() {
          let updateP, enterP, exitP, _i

          // polygon.bottom
          for (_i = 0; _i <= 2; _i++) {
            updateP = svg.selectAll('polygon.bottom_' + _i).data(dataList)
            enterP = updateP.enter()
            exitP = updateP.exit()

            updateP
              .transition()
              .duration(1000)
              .ease(d3.easeCubicOut)
              .attr('points', (d, i) => {
                let points = []
                switch (_i) {
                  case 0:
                    points = [].concat(
                      [a + deltaX * i + x0, h - d + y0],
                      [2 * a + deltaX * i + x0, h - d + b + y0],
                      [a + deltaX * i + x0, h - d + 2 * b + y0],
                      [deltaX * i + x0, h - d + b + y0]
                    )
                    break

                  case 1:
                    points = [].concat(
                      [deltaX * i + x0, b + h - d + y0],
                      [a + deltaX * i + x0, 2 * b + h - d + y0],
                      [a + deltaX * i + x0, h + b + y0],
                      [deltaX * i + x0, h + y0]
                    )
                    break

                  case 2:
                    points = [].concat(
                      [2 * a + deltaX * i + x0, b + h - d + y0],
                      [a + deltaX * i + x0, 2 * b + h - d + y0],
                      [a + deltaX * i + x0, h + b + y0],
                      [2 * a + deltaX * i + x0, h + y0]
                    )
                    break

                  default:
                    break
                }
                return points.join(' ')
              })

            enterP
              .append('polygon')
              .attr('fill', (d, i) => {
                return barColorList[i][_i]
              })
              .attr('points', (d, i) => {
                let points = []
                switch (_i) {
                  case 0:
                    points = [].concat(
                      [a + deltaX * i + x0, h - d + y0],
                      [2 * a + deltaX * i + x0, h - d + b + y0],
                      [a + deltaX * i + x0, h - d + 2 * b + y0],
                      [deltaX * i + x0, h - d + b + y0]
                    )
                    break

                  case 1:
                    points = [].concat(
                      [deltaX * i + x0, b + h - d + y0],
                      [a + deltaX * i + x0, 2 * b + h - d + y0],
                      [a + deltaX * i + x0, h + b + y0],
                      [deltaX * i + x0, h + y0]
                    )
                    break

                  case 2:
                    points = [].concat(
                      [2 * a + deltaX * i + x0, b + h - d + y0],
                      [a + deltaX * i + x0, 2 * b + h - d + y0],
                      [a + deltaX * i + x0, h + b + y0],
                      [2 * a + deltaX * i + x0, h + y0]
                    )
                    break

                  default:
                    break
                }
                return points.join(' ')
              })
              .attr('class', 'bottom_' + _i)

            exitP.remove()
          }

          // polygon.top
          for (_i = 0; _i <= 2; _i++) {
            updateP = svg.selectAll('polygon.top_' + _i).data(dataList)
            enterP = updateP.enter()
            exitP = updateP.exit()

            updateP
              .transition()
              .duration(1000)
              .ease(d3.easeCubicOut)
              .attr('points', (d, i) => {
                let points = []
                switch (_i) {
                  case 0:
                    points = [].concat(
                      [a + deltaX * i + x0, y0],
                      [2 * a + deltaX * i + x0, b + y0],
                      [a + deltaX * i + x0, 2 * b + y0],
                      [deltaX * i + x0, b + y0]
                    )
                    break

                  case 1:
                    points = [].concat(
                      [deltaX * i + x0, b + y0],
                      [a + deltaX * i + x0, 2 * b + y0],
                      [a + deltaX * i + x0, 2 * b + h - d + deltaH + y0],
                      [deltaX * i + x0, b + h - d + deltaH + y0]
                    )
                    break

                  case 2:
                    points = [].concat(
                      [2 * a + deltaX * i + x0, b + y0],
                      [a + deltaX * i + x0, 2 * b + y0],
                      [a + deltaX * i + x0, 2 * b + h - d + deltaH + y0],
                      [2 * a + deltaX * i + x0, b + h - d + deltaH + y0]
                    )
                    break

                  default:
                    break
                }
                return points.join(' ')
              })

            enterP
              .append('polygon')
              .attr('fill', (d, i) => {
                return colorList[_i]
              })
              .attr('opacity', 0.3)
              .attr('points', (d, i) => {
                let points = []
                switch (_i) {
                  case 0:
                    points = [].concat(
                      [a + deltaX * i + x0, y0],
                      [2 * a + deltaX * i + x0, b + y0],
                      [a + deltaX * i + x0, 2 * b + y0],
                      [deltaX * i + x0, b + y0]
                    )
                    break

                  case 1:
                    points = [].concat(
                      [deltaX * i + x0, b + y0],
                      [a + deltaX * i + x0, 2 * b + y0],
                      [a + deltaX * i + x0, 2 * b + h - d + deltaH + y0],
                      [deltaX * i + x0, b + h - d + deltaH + y0]
                    )
                    break

                  case 2:
                    points = [].concat(
                      [2 * a + deltaX * i + x0, b + y0],
                      [a + deltaX * i + x0, 2 * b + y0],
                      [a + deltaX * i + x0, 2 * b + h - d + deltaH + y0],
                      [2 * a + deltaX * i + x0, b + h - d + deltaH + y0]
                    )
                    break

                  default:
                    break
                }
                return points.join(' ')
              })
              .attr('class', 'top_' + _i)

            exitP.remove()
          }
        }

        scope.$watch(() => {
          return ctrl.chart
        }, (value) => {
          dataList = value.dataList
          colorList = value.colorList
          barColorList = value.barColorList
          drawSVG()
        })
      },
      controller: function () {},
      controllerAs: 'SquareChartCtrl'
    }
  }
}
