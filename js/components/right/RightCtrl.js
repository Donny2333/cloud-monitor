(function (angular) {
  'use strict';

  angular.module('cloud-monitor.controllers')
    .controller('RightCtrl', ['$interval', 'Monitor', function ($interval, Monitor) {
      this.detail = {
        disaster: 0,
        serious: 0,
        warning: 0,
        information: 0
      };

      this.usageList = [{
        title: 'CPU使用情况',
        color: '#grad_green',
        detail: {
          totalName: '总数',
          totalValue: 100,
          usageName: '已分配',
          usageValue: 0
        }
      }, {
        title: '内存使用情况',
        color: '#grad_orange',
        detail: {
          totalName: '总数',
          totalValue: 100,
          usageName: '已分配',
          usageValue: 0
        }
      }, {
        title: '存储使用情况',
        color: '#grad_blue',
        detail: {
          totalName: '总数',
          totalValue: 100,
          usageName: '已分配',
          usageValue: 0
        }
      }];

      Monitor.alarm().then(function (res) {
        this.detail = {
          disaster: res.data.disaster,
          serious: res.data.serious,
          warning: res.data.warning,
          information: res.data.information
        };
      }.bind(this));

      Monitor.hyperVisors().then(function (res) {
        this.usageList[0].detail.totalValue = res.data.vcpus;
        this.usageList[0].detail.usageValue = res.data.vcpus_used;

        this.usageList[1].detail.totalValue = res.data.memory_mb;
        this.usageList[1].detail.usageValue = res.data.memory_mb_used;

        this.usageList[2].detail.totalValue = res.data.local_gb;
        this.usageList[2].detail.usageValue = res.data.local_gb_used;
      }.bind(this))
    }])
})(angular);
