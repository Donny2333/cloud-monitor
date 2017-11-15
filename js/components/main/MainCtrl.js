(function (angular) {
  'use strict';

  angular.module('cloud-monitor.controllers')
    .controller('MainCtrl', ['$interval', 'Monitor', function ($interval, Monitor) {
      var that = this;
      that.data = [];

      $interval(function () {
        Monitor.hostHealth().then(function (res) {
          that.data = res.data.json;
        });
      }, 5000);
    }])
})(angular);
