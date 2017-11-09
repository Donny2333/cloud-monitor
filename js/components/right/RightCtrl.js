(function (angular) {
  'use strict';

  angular.module('cloud-monitor.controllers')
    .controller('RightCtrl', ['$scope', '$http', '$timeout', 'URL_CFG',
      function ($scope, $http, $timeout, URL_CFG) {
        this.usageList = [{
          title: 'CPU使用情况',
          color: '#grad_green',
          detail: {
            totalName: '物理总数',
            totalValue: 100,
            usageName: '虚拟总数',
            usageValue: 30
          }
        }, {
          title: '内存使用情况',
          color: '#grad_orange',
          detail: {
            totalName: '物理内存',
            totalValue: 100,
            usageName: '分配数量',
            usageValue: 30
          }
        }, {
          title: '存储使用情况',
          color: '#grad_blue',
          detail: {
            totalName: '存储总数',
            totalValue: 100,
            usageName: '可用总数',
            usageValue: 30
          }
        }]
      }])
})(angular);
