(function (angular) {
  'use strict';

  angular.module('cloud-monitor.directives')

    .directive('ellipseChart', ['$timeout', function ($timeout) {
      return {
        restrict: 'E',
        templateUrl: 'js/components/ellipseChart/ellipseChart.html',
        transclude: true,
        replace: true,
        scope: {
          chart: "="
        },
        link: function (scope, element, attrs) {
          console.log(scope.chart);

          var svg = d3.select(element[0]).selectAll('.ellipseChart'),
            g = svg.selectAll('g'),
            rx = parseFloat(attrs.rx),
            ry = parseFloat(attrs.ry),
            h = parseFloat(attrs.h),
            deltaX = parseFloat(attrs.deltaX),
            deltaH = parseFloat(attrs.deltaH);

          var dataList = [110, 80, 70, 60, 30],
            colorList = ['#0EC17C', '#C085C6', '#F47F73', '#F7B686', '#8FBAE5'],
            barColorList = ['#007552', '#8B518E', '#F45938', '#FFA040', '#638AC1'];

          var updateG = g.data(dataList),
            enterG = updateG.enter().append('g'),
            exitG = updateG.exit();

          enterG.append('ellipse')
            .attr("cx", function (d, i) {
              return rx + i * deltaX;
            })
            .attr("cy", function (d, i) {
              return h - d;
            })
            .attr("rx", function (d, i) {
              return rx;
            })
            .attr("ry", function (d, i) {
              return ry;
            })
            .attr("fill", function (d, i) {
              return colorList[i];
            });

          enterG.append('path')
            .attr("fill", function (d, i) {
              return barColorList[i];
            })
            .attr("d", function (d, i) {
              return _.concat(['M', 2 * rx + deltaX * i, h],
                ['A', rx, ry, 0, 0, 1, deltaX * i, h],
                ['V', h - d],
                ['A', rx, ry, 0, 0, 0, 2 * rx + deltaX * i, h - d]).join(' ');
            });

          enterG.append('path')
            .attr("fill", "#AEADB3")
            .attr("opacity", 0.3)
            .attr("d", function (d, i) {
              return _.concat(['M', 2 * rx + deltaX * i, h - d + deltaH],
                ['A', rx, ry, 0, 0, 1, deltaX * i, h - d + deltaH],
                ['V', ry],
                ['A', rx, ry, 0, 0, 0, 2 * rx + deltaX * i, ry]).join(' ');
            });

          enterG.append('ellipse')
            .attr("cx", function (d, i) {
              return rx + i * deltaX;
            })
            .attr("cy", function (d, i) {
              return ry;
            })
            .attr("rx", function (d, i) {
              return rx;
            })
            .attr("ry", function (d, i) {
              return ry;
            })
            .attr("fill", '#F7F7F8')
            .attr("opacity", 0.3);

          exitG.remove();
        }
      }
    }])
})(angular);
