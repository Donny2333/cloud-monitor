(function (angular) {
  'use strict';

  angular.module('cloud-monitor.controllers')
    .controller('BottomCtrl', ['$interval', 'Monitor', 'Http', 'OPEN_ANIMATION', function ($interval, Monitor, Http, OPEN_ANIMATION) {
      var that = this;

      var colorList1 = ['#F7F7F8', '#AEADB3', '#D8D9DD'],
        colorList2 = ['#0EC17C', '#C085C6', '#F47F73', '#F7B686', '#8FBAE5'],
        barColorList1 = [
          ['#0EC17C', '#007552', '#029363'],
          ['#BF97C4', '#8B518E', '#A068A5'],
          ['#F47F73', '#F45938', '#EA6853'],
          ['#F7B686', '#FFA040', '#FFAF66'],
          ['#8FBAE5', '#638AC1', '#759FD1']
        ],
        barColorList2 = ['#007552', '#8B518E', '#F45938', '#FFA040', '#638AC1'];

      that.charts = [{
        title: 'TOP 5 主机CPU利用率',
        names: ['主机一', '主机二', '主机三', '主机四', '主机五'],
        dataList: [30, 30, 30, 30, 30],
        colorList: colorList1,
        barColorList: barColorList1
      }, {
        title: 'TOP 5 主机内存利用率',
        names: ['主机一', '主机二', '主机三', '主机四', '主机五'],
        dataList: [15, 15, 15, 15, 15],
        colorList: colorList2,
        barColorList: barColorList2
      }, {
        title: 'TOP 5 虚拟机CPU利用率',
        names: ['虚拟机一', '虚拟机二', '虚拟机三', '虚拟机四', '虚拟机五'],
        dataList: [30, 30, 30, 30, 30],
        colorList: colorList1,
        barColorList: barColorList1
      }, {
        title: 'TOP 5 虚拟机内存利用率',
        names: ['虚拟机一', '虚拟机二', '虚拟机三', '虚拟机四', '虚拟机五'],
        dataList: [15, 15, 15, 15, 15],
        colorList: colorList2,
        barColorList: barColorList2
      }];

      function reload() {
        Monitor.cpu().then(function (res) {
          var names = [];
          var dataList = [];

          res.data.json.map(function (item) {
            names.push(item.name);
            dataList.push(30 + item.value * 1.2);
          });

          that.charts[0] = {
            title: that.charts[0].title,
            names: names,
            dataList: dataList,
            colorList: colorList1,
            barColorList: barColorList1
          }
        }, function (err) {
          Http.get('common/json/top5_cpu_usage.json').then(function (res) {
            var names = [];
            var dataList = [];

            res.data.json.map(function (item) {
              names.push(item.name);
              dataList.push(30 + item.value * 1.2);
            });

            that.charts[0] = {
              title: that.charts[0].title,
              names: names,
              dataList: dataList,
              colorList: colorList1,
              barColorList: barColorList1
            }
          })
        });

        Monitor.mem().then(function (res) {
          var names = [];
          var dataList = [];

          res.data.json.map(function (item) {
            names.push(item.name);
            dataList.push(15 + item.value * 1.25);
          });

          that.charts[1] = {
            title: that.charts[1].title,
            names: names,
            dataList: dataList,
            colorList: colorList2,
            barColorList: barColorList2
          }
        }, function (err) {
          Http.get('common/json/top5_memory_usage.json').then(function (res) {
            var names = [];
            var dataList = [];

            res.data.json.map(function (item) {
              names.push(item.name);
              dataList.push(15 + item.value * 1.25);
            });

            that.charts[1] = {
              title: that.charts[1].title,
              names: names,
              dataList: dataList,
              colorList: colorList2,
              barColorList: barColorList2
            }
          });
        });

        Monitor.vm_cpu().then(function (res) {
          var names = [];
          var dataList = [];

          res.data.json.map(function (item) {
            names.push(item.name);
            dataList.push(30 + item.value * 1.2);
          });

          that.charts[2] = {
            title: that.charts[2].title,
            names: names,
            dataList: dataList,
            colorList: colorList1,
            barColorList: barColorList1
          }
        }, function (err) {
          Http.get('common/json/top5_vm_cpu_usage.json').then(function (res) {
            var names = [];
            var dataList = [];

            res.data.json.map(function (item) {
              names.push(item.name);
              dataList.push(30 + item.value * 1.2);
            });

            that.charts[2] = {
              title: that.charts[2].title,
              names: names,
              dataList: dataList,
              colorList: colorList1,
              barColorList: barColorList1
            }
          })
        });

        Monitor.vm_mem().then(function (res) {
          var names = [];
          var dataList = [];

          res.data.json.map(function (item) {
            names.push(item.name);
            dataList.push(15 + item.value * 1.25);
          });

          that.charts[3] = {
            title: that.charts[3].title,
            names: names,
            dataList: dataList,
            colorList: colorList2,
            barColorList: barColorList2
          }
        }, function (err) {
          Http.get('common/json/top5_vm_memory_usage.json').then(function (res) {
            var names = [];
            var dataList = [];

            res.data.json.map(function (item) {
              names.push(item.name);
              dataList.push(15 + item.value * 1.25);
            });

            that.charts[3] = {
              title: that.charts[3].title,
              names: names,
              dataList: dataList,
              colorList: colorList2,
              barColorList: barColorList2
            }
          })
        });
      }

      reload();

      OPEN_ANIMATION && $interval(function () {
        reload();
      }, 30000);
    }])
})(angular);
