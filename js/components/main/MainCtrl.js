(function (angular) {
  'use strict';

  angular.module('cloud-monitor.controllers')
    .controller('MainCtrl', ['$scope', '$http', '$interval', 'Monitor',
      function ($scope, $http, $interval, Monitor) {
        // for (var i = 0, list = []; i < 32; i++) {
        //   list.push(Math.random() * 100);
        // }
        //
        // this.data = list;

        // $interval(function () {
        //   for (var i = 0, list = []; i < 32; i++) {
        //     list[i] = Math.random() * 100;
        //   }
        //
        //   this.data = list;
        // }.bind(this), 10000);
        this.data = [];

        Monitor.hostHealth().then(function (res) {
          this.data = res.data.json;
        }.bind(this));
      }])
})(angular);
