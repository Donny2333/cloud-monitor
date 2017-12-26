(function (angular) {
  'use strict';

  angular.module('cloud-monitor.controllers')
    .controller('RightCtrl', ['$interval', 'Monitor', 'Http', function ($interval, Monitor, Http) {
      var that = this;

      that.detail = {
        disaster: 0,
        serious: 0,
        warning: 0,
        information: 0
      };

      that.usageList = [{
        title: 'CPU使用情况',
        color: '#58c84d',
        detail: {
          totalName: '总数',
          totalValue: 100,
          totalUnit: '核',
          usageName: '已分配',
          usageValue: 0,
          usageUnit: '核',
          percent: '0'
        }
      }, {
        title: '内存使用情况',
        color: '#ff9b0a',
        detail: {
          totalName: '总数',
          totalValue: 100,
          totalUnit: 'GB',
          usageName: '已分配',
          usageValue: 0,
          usageUnit: 'GB',
          percent: '0'
        }
      }, {
        title: '存储使用情况',
        color: '#09c8f4',
        detail: {
          totalName: '总数',
          totalValue: 100,
          totalUnit: 'GB',
          usageName: '已分配',
          usageValue: 0,
          usageUnit: 'GB',
          percent: '0'
        }
      }];

      function bytesToSize(gigabytes, unit) {
        var k = 1000, // or 1024
            sizes = ['MB', 'GB', 'TB', 'PB'],
            i = Math.floor(Math.log(gigabytes) / Math.log(k));

        if (gigabytes === 0) return {
          value: 0,
          unit: sizes[0]
        };

       return {
         value: (gigabytes / Math.pow(k, i)).toPrecision(3),
         unit: sizes[i]
       };
      };

      function reload() {
        Monitor.alarm().then(function (res) {
          that.detail = {
            disaster: res.data.disaster,
            serious: res.data.serious,
            warning: res.data.warning,
            information: res.data.information
          };
        }, function (err) {
          Http.get('json/alarm.json').then(function (res) {
            that.detail = res.data.data[0];
          });
        });

        Monitor.hypervisors().then(function (res) {
          that.usageList[0].detail.totalValue = res.data.vcpus * 8;
          that.usageList[0].detail.totalUnit = '核';
          that.usageList[0].detail.usageValue = res.data.vcpus_used;
          that.usageList[0].detail.percent = (res.data.vcpus_used / (res.data.vcpus * 8) * 100).toFixed(1);
          that.usageList[0].detail.usageUnit = '核';

          that.usageList[1].detail.totalValue = bytesToSize(res.data.memory_mb).value;
          that.usageList[1].detail.totalUnit = bytesToSize(res.data.memory_mb).unit;
          that.usageList[1].detail.usageValue = bytesToSize(res.data.memory_mb_used).value;
          that.usageList[1].detail.usageUnit = bytesToSize(res.data.memory_mb_used).unit;
          that.usageList[1].detail.percent = (res.data.memory_mb_used / res.data.memory_mb * 100).toFixed(1);

          that.usageList[2].detail.totalValue = bytesToSize(res.data.local_gb).value;
          that.usageList[2].detail.totalUnit = bytesToSize(res.data.local_gb).unit;
          that.usageList[2].detail.usageValue = bytesToSize(res.data.local_gb_used).value;
          that.usageList[2].detail.usageUnit = bytesToSize(res.data.local_gb_used).unit;
          that.usageList[2].detail.percent = (res.data.local_gb_used / res.data.local_gb * 100).toFixed(1);
        }, function (err) {
          Http.get('json/hypervisors.json').then(function (res) {
            var data = res.data.data;
            data[0].detail.totalUnit = '核';
            data[0].detail.usageUnit = '核';
            data[0].detail.percent = (data[0].detail.usageValue / data[0].detail.totalValue * 100).toFixed(1);

            data[1].detail = {
              totalName: data[1].detail.totalName,
              totalValue: bytesToSize(data[1].detail.totalValue).value,
              totalUnit: bytesToSize(data[1].detail.totalValue).unit,
              usageName: data[1].detail.usageName,
              usageValue: bytesToSize(data[1].detail.usageValue).value,
              usageUnit: bytesToSize(data[1].detail.usageValue).unit,
              percent: (data[1].detail.usageValue / data[1].detail.totalValue * 100).toFixed(1)
            }

            data[2].detail = {
              totalName: data[2].detail.totalName,
              totalValue: bytesToSize(data[2].detail.totalValue).value,
              totalUnit: bytesToSize(data[2].detail.totalValue).unit,
              usageName: data[2].detail.usageName,
              usageValue: bytesToSize(data[2].detail.usageValue).value,
              usageUnit: bytesToSize(data[2].detail.usageValue).unit,
              percent: (data[1].detail.usageValue / data[1].detail.totalValue * 100).toFixed(1)
            }

            that.usageList = data;
          })
        })
      }

      reload();

      $interval(function () {
        reload();
      }, 30000);
    }])
})(angular);
