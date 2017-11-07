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
          var svg = d3.select(element[0]).selectAll('.squareChart'),
            g = svg.selectAll('g.bar'),
            a = parseFloat(attrs.a),
            b = parseFloat(attrs.b),
            h = parseFloat(attrs.h),
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
                      points = _.concat([a + deltaX * i, h - d],
                        [2 * a + deltaX * i, h - d + b],
                        [a + deltaX * i, h - d + 2 * b],
                        [deltaX * i, h - d + b]);
                      break;

                    case 1:
                      points = _.concat([deltaX * i, b + h - d],
                        [a + deltaX * i, 2 * b + h - d],
                        [a + deltaX * i, h + b],
                        [deltaX * i, h]);
                      break;

                    case 2:
                      points = _.concat([2 * a + deltaX * i, b + h - d],
                        [a + deltaX * i, 2 * b + h - d],
                        [a + deltaX * i, h + b],
                        [2 * a + deltaX * i, h]);
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
                      points = _.concat([a + deltaX * i, h - d],
                        [2 * a + deltaX * i, h - d + b],
                        [a + deltaX * i, h - d + 2 * b],
                        [deltaX * i, h - d + b]);
                      break;

                    case 1:
                      points = _.concat([deltaX * i, b + h - d],
                        [a + deltaX * i, 2 * b + h - d],
                        [a + deltaX * i, h + b],
                        [deltaX * i, h]);
                      break;

                    case 2:
                      points = _.concat([2 * a + deltaX * i, b + h - d],
                        [a + deltaX * i, 2 * b + h - d],
                        [a + deltaX * i, h + b],
                        [2 * a + deltaX * i, h]);
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
                      points = _.concat([a + deltaX * i, 0],
                        [2 * a + deltaX * i, b],
                        [a + deltaX * i, 2 * b],
                        [deltaX * i, b]);
                      break;

                    case 1:
                      points = _.concat([deltaX * i, b],
                        [a + deltaX * i, 2 * b],
                        [a + deltaX * i, 2 * b + h - d + deltaH],
                        [deltaX * i, b + h - d + deltaH]);
                      break;

                    case 2:
                      points = _.concat([2 * a + deltaX * i, b],
                        [a + deltaX * i, 2 * b],
                        [a + deltaX * i, 2 * b + h - d + deltaH],
                        [2 * a + deltaX * i, b + h - d + deltaH]);
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
                      points = _.concat([a + deltaX * i, 0],
                        [2 * a + deltaX * i, b],
                        [a + deltaX * i, 2 * b],
                        [deltaX * i, b]);
                      break;

                    case 1:
                      points = _.concat([deltaX * i, b],
                        [a + deltaX * i, 2 * b],
                        [a + deltaX * i, 2 * b + h - d + deltaH],
                        [deltaX * i, b + h - d + deltaH]);
                      break;

                    case 2:
                      points = _.concat([2 * a + deltaX * i, b],
                        [a + deltaX * i, 2 * b],
                        [a + deltaX * i, 2 * b + h - d + deltaH],
                        [2 * a + deltaX * i, b + h - d + deltaH]);
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

        }
      }
    }])

})(angular);
