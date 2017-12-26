(function (angular) {
  'use strict';

  angular.module('cloud-monitor.controllers')
    .controller('MainCtrl', ['$interval', 'Monitor', 'OPEN_ANIMATION', function ($interval, Monitor, OPEN_ANIMATION) {
      var that = this;
      that.data = [];

      function equipData(n) {
        for (var i = 0, list = []; i < n; i++) {
          list[i] = Math.random() * 20 + 78;
        }
        return list;
      }

      function reload() {
        Monitor.hostHealth().then(function (res) {
          that.data = _.concat(res.data.json, equipData(32 - res.data.json.length));
        }, function (err) {
          that.data = equipData(32);
        });
      }

      reload();

      OPEN_ANIMATION && $interval(function () {
        reload();
      }, 5000);
    }]);
})(angular);
