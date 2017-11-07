(function (angular) {
  'use strict';

  angular.module('cloud-monitor.controllers')
    .controller('BottomCtrl', ['$scope', '$http', '$timeout', '$interval', 'URL_CFG',
      function ($scope, $http, $timeout, $interval, URL_CFG) {
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

        this.charts = [{
          title: 'TOP 5主机CPU利用率',
          names: ['主机一', '主机二', '主机三', '主机四', '主机五'],
          dataList: [30, 30, 30, 30, 30],
          colorList: colorList1,
          barColorList: barColorList1
        }, {
          title: 'TOP 5主机内存利用率',
          names: ['主机一', '主机二', '主机三', '主机四', '主机五'],
          dataList: [30, 30, 30, 30, 30],
          colorList: colorList2,
          barColorList: barColorList2
        }, {
          title: 'TOP 5虚拟机CPU利用率',
          names: ['主机一', '主机二', '主机三', '主机四', '主机五'],
          dataList: [30, 30, 30, 30, 30],
          colorList: colorList1,
          barColorList: barColorList1
        }, {
          title: 'TOP 5虚拟机内存利用率',
          names: ['主机一', '主机二', '主机三', '主机四', '主机五'],
          dataList: [30, 30, 30, 30, 30],
          colorList: colorList2,
          barColorList: barColorList2
        }];

        $interval(function () {
          var rand = Math.random() * 20;
          this.charts = [{
            title: 'TOP 5主机CPU利用率',
            names: ['主机一', '主机二', '主机三', '主机四', '主机五'],
            dataList: [70 + rand, 50 + rand, 40 + rand, 30 + rand, 25 + rand],
            colorList: colorList1,
            barColorList: barColorList1
          }, {
            title: 'TOP 5主机内存利用率',
            names: ['主机一', '主机二', '主机三', '主机四', '主机五'],
            dataList: [70 + rand, 50 + rand, 40 + rand, 30 + rand, 25 + rand],
            colorList: colorList2,
            barColorList: barColorList2
          }, {
            title: 'TOP 5虚拟机CPU利用率',
            names: ['主机一', '主机二', '主机三', '主机四', '主机五'],
            dataList: [50 + rand, 40 + rand, 30 + rand, 25 + rand, 20 + rand],
            colorList: colorList1,
            barColorList: barColorList1
          }, {
            title: 'TOP 5虚拟机内存利用率',
            names: ['主机一', '主机二', '主机三', '主机四', '主机五'],
            dataList: [50 + rand, 40 + rand, 30 + rand, 25 + rand, 20 + rand],
            colorList: colorList2,
            barColorList: barColorList2
          }]
        }.bind(this), 3000);
      }])
})(angular);
