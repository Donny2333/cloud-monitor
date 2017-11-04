(function (angular) {
  'use strict';

  angular.module('cloud-monitor.controllers')
    .controller('LeftCtrl', ['$scope', '$http', '$timeout', 'URL_CFG', 'Http', 'EChartsFactory',
      function ($scope, $http, $timeout, URL_CFG, Http, EChartsFactory) {
        var vm = $scope.vm = {
          charts: []
        };

        var charts = [{
          "type": "gauge",
          "id": 0,
          "title": "脱贫比例",
          "dataSource": "json/data5.json",
          "style": {
            "height": "350px",
            "width": "100%",
            "float": "none"
          }
        }, {
          "type": "gauge",
          "id": 1,
          "title": "脱贫比例",
          "dataSource": "json/data5.json",
          "style": {
            "height": "350px",
            "width": "100%",
            "float": "none"
          }
        }, {
          "type": "gauge",
          "id": 2,
          "title": "脱贫比例",
          "dataSource": "json/data5.json",
          "style": {
            "height": "350px",
            "width": "100%",
            "float": "none"
          }
        }];

        charts.map(function (chart) {
          var newChart = EChartsFactory(chart.type);
          newChart.id = chart.id;
          newChart.title = chart.title;
          newChart.type = chart.type;
          newChart.dataSource = chart.dataSource;
          newChart.x = chart.x;
          newChart.y = chart.y;
          newChart.style = chart.style;

          newChart.update(chart);
          vm.charts.push(newChart);
        })
      }])
})(angular);
