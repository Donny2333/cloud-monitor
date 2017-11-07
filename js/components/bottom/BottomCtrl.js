(function (angular) {
  'use strict';

  angular.module('cloud-monitor.controllers')
    .controller('BottomCtrl', ['$scope', '$http', '$timeout', 'URL_CFG',
      function ($scope, $http, $timeout, URL_CFG) {
        var colorList = ['#0EC17C', '#C085C6', '#F47F73', '#F7B686', '#8FBAE5'],
          barColorList = ['#007552', '#8B518E', '#F45938', '#FFA040', '#638AC1'];


        $scope.charts = [{
          dataList: [110, 80, 70, 60, 30],
          colorList: colorList,
          barColorList: barColorList
        }, {
          dataList: [110, 80, 70, 60, 30],
          colorList: colorList,
          barColorList: barColorList
        }, {
          dataList: [110, 80, 70, 60, 30],
          colorList: colorList,
          barColorList: barColorList
        }, {
          dataList: [110, 80, 70, 60, 30],
          colorList: colorList,
          barColorList: barColorList
        }];
      }])
})(angular);
