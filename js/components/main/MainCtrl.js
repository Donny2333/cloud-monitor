(function (angular) {
  'use strict';

  angular.module('cloud-monitor.controllers')
    .controller('MainCtrl', ['$scope', '$http', '$interval', 'URL_CFG',
      function ($scope, $http, $interval, URL_CFG) {
        for (var i = 0, list = []; i < 32; i++) {
          list.push(Math.random() * 100);
        }

        this.data = list;

        $interval(function () {
          for (var i = 0, list = []; i < 32; i++) {
            list[i] = Math.random() * 100;
          }

          this.data = list;
        }.bind(this), 10000)
      }])
})(angular);
