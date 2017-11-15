(function (angular) {
  'use strict';

  angular.module('cloud-monitor.controllers')
    .controller('LeftCtrl', ['Monitor', '$interval', 'EChartsFactory', function (Monitor, $interval, EChartsFactory) {
      var that = this;

      that.charts = [];

      var charts = [{
        "type": "gauge",
        "id": 0,
        "title": "系统健康度",
        "dataSource": "json/data1.json",
        "style": {
          "height": "100%",
          "width": "100%"
        }
      }, {
        "type": "pie",
        "id": 1,
        "title": "主机状态",
        "dataSource": "http://10.127.3.38:8088/monitor/v1.0/hoststate/statistics",
        "style": {
          "height": "100%",
          "width": "100%"
        }
      }, {
        "type": "pie",
        "id": 3,
        "title": "虚拟机状态",
        "dataSource": "http://10.127.3.38:8088/monitor/v1.0/vm/statistics",
        "style": {
          "height": "100%",
          "width": "100%"
        }
      }];

      function reload() {
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
          that.charts.push(newChart);
        })
      }

      reload();

      $interval(function () {
        reload();
      }, 30000);
    }])
})(angular);
