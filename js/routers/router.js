(function (angular) {
  'use strict';

  angular.module('cloud-monitor.routers', ['ui.router'])
    .config(['$urlRouterProvider', '$locationProvider', '$stateProvider',
      function ($urlRouterProvider, $locationProvider, $stateProvider) {
        $urlRouterProvider.otherwise('/app');
        // $locationProvider.html5Mode(true);

        $stateProvider
          .state('app', {
            url: '/app',
            templateUrl: './tpls/app.html',
            controller: 'AppController'
          })
      }]);
})(angular);
