(function (angular) {
  'use strict';

  angular.module('cloud-monitor.directives')

    .directive('squareChart', ['$timeout', function ($timeout) {
      return {
        restrict: 'E',
        templateUrl: 'js/components/squareChart/SquareChart.html',
        transclude: true,
        replace: true,
        scope: {
          chart: "="
        },
        bindToController: true,
        link: function (scope, element, attrs, ctrl) {
          var height = $(element[0]).height();
          var width = $(element[0]).width();

          var svg = d3.select(element[0]).selectAll('.squareChart'),
            g = svg.selectAll('g.bar'),
            a = parseFloat(attrs.a),
            b = parseFloat(attrs.b),
            h = parseFloat(attrs.h),
            x0 = parseFloat(attrs.x0),
            y0 = parseFloat(attrs.y0),
            deltaX = parseFloat(attrs.deltaX),
            deltaH = parseFloat(attrs.deltaH);

          var dataList, colorList, barColorList;

          function drawsvg() {
            var updateP, enterP, exitP, _i;

            // polygon.bottom
            for (_i = 0; _i <= 2; _i++) {
              updateP = svg.selectAll('polygon.bottom_' + _i).data(dataList);
              enterP = updateP.enter();
              exitP = updateP.exit();

              updateP.transition()
                .duration(1000)
                .ease(d3.easeCubicOut)
                .attr("points", function (d, i) {
                  var points = [];
                  switch (_i) {
                    case 0:
                      points = _.concat([a + deltaX * i + x0, h - d + y0],
                        [2 * a + deltaX * i + x0, h - d + b + y0],
                        [a + deltaX * i + x0, h - d + 2 * b + y0],
                        [deltaX * i + x0, h - d + b + y0]);
                      break;

                    case 1:
                      points = _.concat([deltaX * i + x0, b + h - d + y0],
                        [a + deltaX * i + x0, 2 * b + h - d + y0],
                        [a + deltaX * i + x0, h + b + y0],
                        [deltaX * i + x0, h + y0]);
                      break;

                    case 2:
                      points = _.concat([2 * a + deltaX * i + x0, b + h - d + y0],
                        [a + deltaX * i + x0, 2 * b + h - d + y0],
                        [a + deltaX * i + x0, h + b + y0],
                        [2 * a + deltaX * i + x0, h + y0]);
                      break;

                    default:
                      break;
                  }
                  return points.join(' ');
                });

              enterP.append('polygon')
                .attr("fill", (function (d, i) {
                  return barColorList[i][_i];
                }))
                .attr("points", function (d, i) {
                  var points = [];
                  switch (_i) {
                    case 0:
                      points = _.concat([a + deltaX * i + x0, h - d + y0],
                        [2 * a + deltaX * i + x0, h - d + b + y0],
                        [a + deltaX * i + x0, h - d + 2 * b + y0],
                        [deltaX * i + x0, h - d + b + y0]);
                      break;

                    case 1:
                      points = _.concat([deltaX * i + x0, b + h - d + y0],
                        [a + deltaX * i + x0, 2 * b + h - d + y0],
                        [a + deltaX * i + x0, h + b + y0],
                        [deltaX * i + x0, h + y0]);
                      break;

                    case 2:
                      points = _.concat([2 * a + deltaX * i + x0, b + h - d + y0],
                        [a + deltaX * i + x0, 2 * b + h - d + y0],
                        [a + deltaX * i + x0, h + b + y0],
                        [2 * a + deltaX * i + x0, h + y0]);
                      break;

                    default:
                      break;
                  }
                  return points.join(' ');
                }).attr('class', 'bottom_' + _i);

              exitP.remove();
            }

            // polygon.top
            for (_i = 0; _i <= 2; _i++) {
              updateP = svg.selectAll('polygon.top_' + _i).data(dataList);
              enterP = updateP.enter();
              exitP = updateP.exit();

              updateP.transition()
                .duration(1000)
                .ease(d3.easeCubicOut)
                .attr("points", function (d, i) {
                  var points = [];
                  switch (_i) {
                    case 0:
                      points = _.concat([a + deltaX * i + x0, y0],
                        [2 * a + deltaX * i + x0, b + y0],
                        [a + deltaX * i + x0, 2 * b + y0],
                        [deltaX * i + x0, b + y0]);
                      break;

                    case 1:
                      points = _.concat([deltaX * i + x0, b + y0],
                        [a + deltaX * i + x0, 2 * b + y0],
                        [a + deltaX * i + x0, 2 * b + h - d + deltaH + y0],
                        [deltaX * i + x0, b + h - d + deltaH + y0]);
                      break;

                    case 2:
                      points = _.concat([2 * a + deltaX * i + x0, b + y0],
                        [a + deltaX * i + x0, 2 * b + y0],
                        [a + deltaX * i + x0, 2 * b + h - d + deltaH + y0],
                        [2 * a + deltaX * i + x0, b + h - d + deltaH + y0]);
                      break;

                    default:
                      break;
                  }
                  return points.join(' ');
                });

              enterP.append('polygon')
                .attr("fill", (function (d, i) {
                  return colorList[_i];
                }))
                .attr('opacity', 0.3)
                .attr("points", function (d, i) {
                  var points = [];
                  switch (_i) {
                    case 0:
                      points = _.concat([a + deltaX * i + x0, y0],
                        [2 * a + deltaX * i + x0, b + y0],
                        [a + deltaX * i + x0, 2 * b + y0],
                        [deltaX * i + x0, b + y0]);
                      break;

                    case 1:
                      points = _.concat([deltaX * i + x0, b + y0],
                        [a + deltaX * i + x0, 2 * b + y0],
                        [a + deltaX * i + x0, 2 * b + h - d + deltaH + y0],
                        [deltaX * i + x0, b + h - d + deltaH + y0]);
                      break;

                    case 2:
                      points = _.concat([2 * a + deltaX * i + x0, b + y0],
                        [a + deltaX * i + x0, 2 * b + y0],
                        [a + deltaX * i + x0, 2 * b + h - d + deltaH + y0],
                        [2 * a + deltaX * i + x0, b + h - d + deltaH + y0]);
                      break;

                    default:
                      break;
                  }
                  return points.join(' ');
                }).attr('class', 'top_' + _i);

              exitP.remove();
            }
          }

          scope.$watch(function () {
            return ctrl.chart;
          }, function (value) {
            dataList = value.dataList;
            colorList = value.colorList;
            barColorList = value.barColorList;
            drawsvg();
          });
        },
        controller: function () {

        },
        controllerAs: 'SquareChartCtrl'
      }
    }])

})(angular);
