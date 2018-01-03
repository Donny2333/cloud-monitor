(function (angular) {
  'use strict';

  angular.module('cloud-monitor.controllers')
    .controller('LeftCtrl', ['Monitor', '$interval', '$timeout', 'EChartsFactory', 'URL_CFG', 'OPEN_ANIMATION',
      function (Monitor, $interval, $timeout, EChartsFactory, URL_CFG, OPEN_ANIMATION) {
        var that = this;
        var hostDetail = [];

        that.charts = [];
        that.detailInfo = {
          state: -1,
          show: false,
          style: {
            width: '320px',
            top: '30%',
            zIndex: '999'
          },
          tipStyle: {
            left: '70px'
          }
        };

        that.calDetail = function (state) {
          if (state === that.detailInfo.state) {
            return;
          }
          that.detailInfo.state = state;
          that.detailInfo.show = true;
          that.detailInfo.tipStyle.left = {
            abnormal: '90px',
            poweroff: '150px'
          }[state];

          var data = _.filter(hostDetail, { state: state });

          $('#hostTable').bootstrapTable('showLoading');
          $timeout(function () {
            $('#hostTable').bootstrapTable('load', data)
              .bootstrapTable('hideLoading');
          }, 500);
        };

        $('#hostTable').bootstrapTable({
          height: 180,
          classes: 'table-no-bordered',
          columns: [{
            field: 'ip',
            title: 'IP'
          }, {
            field: 'hostname',
            title: '主机名'
          }, {
            field: 'state',
            title: '状态'
          }]
        });

        that.showDetail = function () {
          that.detailInfo.show = true;
        };

        that.hideDetail = function () {
          that.detailInfo.show = false;
        };

        var charts = [{
          "type": "gauge",
          "id": 0,
          "title": "系统健康度",
          "dataSource": URL_CFG.api + "systemstate/statistics",
          "localSource": "json/system_health.json",
          "style": {
            "height": "100%",
            "width": "100%"
          }
        }, {
          "type": "pie",
          "id": 1,
          "title": "主机状态",
          "dataSource": URL_CFG.api + "hoststate/statistics",
          "localSource": "json/host_state.json",
          "style": {
            "height": "100%",
            "width": "100%"
          }
        }, {
          "type": "pie",
          "id": 3,
          "title": "虚拟机状态",
          "dataSource": URL_CFG.api + "vm/statistics",
          "localSource": "json/vm_state.json",
          "style": {
            "height": "100%",
            "width": "100%"
          }
        }];

        function reload() {
          charts.map(function (chart) {
            var newChart = EChartsFactory(chart.type);

            _.merge(newChart, chart);
            newChart.update(chart);
            that.charts.push(newChart);
          });

          Monitor.hostDetail().then(function (res) {
            hostDetail = res.data;
            that.detailInfo.priority = -1;
          }, function(err) {
            that.detailInfo.priority = -1;
          });
        }

        reload();

        OPEN_ANIMATION && $interval(function () {
          reload();
        }, 30000);
      }]);
})(angular);
