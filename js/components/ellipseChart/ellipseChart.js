(function (angular) {
  'use strict';

  angular.module('cloud-monitor.directives')

    .directive('ellipseChart', ['$timeout', function ($timeout) {
      return {
        restrict: 'E',
        templateUrl: 'js/components/ellipseChart/ellipseChart.html',
        replace: true,
        link: function (scope, element, attrs) {
          var svg = d3.select(element[0]);
          var g = svg.selectAll('g');
          var rx = 32;
          var ry = 10;
          var h = 150;
          var deltaX = 80;
          var _h = 15;

          var dataList = [110, 80, 70, 60, 30];
          var colorList = ['#0EC17C', '#C085C6', '#F47F73', '#F7B686', '#8FBAE5'];
          var barColorList = ['#007552', '#8B518E', '#F45938', '#FFA040', '#638AC1'];

          var updateG = g.data(dataList);
          var enterG = updateG.enter().append('g');
          var exitG = updateG.exit();

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
              return 'M' + eval(2 * rx + deltaX * i) + ',' + h +
                'A' + rx + ',' + ry + ',0,0,1,' + eval(deltaX * i) + ',' + h +
                'V' + eval(h - d) +
                'A' + rx + ',' + ry + ',0,0,0,' + eval(2 * rx + deltaX * i) + ',' + eval(h - d);
            });

          enterG.append('path')
            .attr("fill", "#AEADB3")
            .attr("opacity", 0.3)
            .attr("d", function (d, i) {
              return 'M' + eval(2 * rx + deltaX * i) + ',' + eval(h - d + _h) +
                'A' + rx + ',' + ry + ',0,0,1,' + eval(deltaX * i) + ',' + eval(h - d + _h) +
                'V' + ry +
                'A' + rx + ',' + ry + ',0,0,0,' + eval(2 * rx + deltaX * i) + ',' + ry;
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
