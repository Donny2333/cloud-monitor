(function (angular) {
  'use strict';

  angular.module('cloud-monitor.controllers')
    .controller('RightCtrl', ['$scope', '$http', '$interval', 'Monitor',
      function ($scope, $http, $interval, Monitor) {
        this.usageList = [{
          title: 'CPU使用情况',
          color: '#grad_green',
          detail: {
            totalName: '物理总数',
            totalValue: 100,
            usageName: '虚拟总数',
            usageValue: 15
          }
        }, {
          title: '内存使用情况',
          color: '#grad_orange',
          detail: {
            totalName: '物理内存',
            totalValue: 100,
            usageName: '分配数量',
            usageValue: 60
          }
        }, {
          title: '存储使用情况',
          color: '#grad_blue',
          detail: {
            totalName: '存储总数',
            totalValue: 100,
            usageName: '可用总数',
            usageValue: 80
          }
        }];

        // $interval(function () {
        //   _.map(this.usageList, function (usage) {
        //     usage.detail.usageValue = Math.floor(Math.random() * 100);
        //   })
        // }.bind(this), 5000);

        Monitor.hyperVisors().then(function(res) {
          console.log(res.data);
        })
      }])
})(angular);
