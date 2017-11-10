(function (angular) {
  'use strict';

  angular.module('cloud-monitor.controllers')
    .controller('LeftCtrl', ['$scope', 'Monitor', '$timeout', 'EChartsFactory',
      function ($scope, Monitor, $timeout, EChartsFactory) {
        this.charts = [];

        var charts = [{
          "type": "gauge",
          "id": 0,
          "title": "系统健康度",
          "dataSource": "http://10.127.3.38:8088/monitor/v1.0/systemstate/statistics",
          "style": {
            "height": "350px",
            "width": "100%",
            "float": "none"
          }
        }, {
          "type": "pie",
          "id": 1,
          "title": "主机状态",
          "dataSource": "http://10.127.3.38:8088/monitor/v1.0/hoststate/statistics",
          "style": {
            "height": "350px",
            "width": "100%",
            "float": "none"
          }
        }, {
          "type": "pie",
          "id": 3,
          "title": "虚拟机状态",
          "dataSource": "http://10.127.3.38:8088/monitor/v1.0/vm/statistics",
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
          chart.total = newChart.total;
          chart.normal = newChart.normal;
          chart.abnormal = newChart.abnormal;
          chart.poweroff = newChart.poweroff;
          this.charts.push(newChart);
        }.bind(this))
      }])
})(angular);
