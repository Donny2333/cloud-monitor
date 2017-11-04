(function (angular) {
  'use strict';

  angular.module('cloud-monitor.routers', ['ui.router'])
    .config(['$urlRouterProvider', '$locationProvider', '$stateProvider',
      function ($urlRouterProvider, $locationProvider, $stateProvider) {
        $urlRouterProvider.otherwise('/app');
        // $locationProvider.html5Mode(true);

        $stateProvider
          .state('app', {
            abstract: true,
            templateUrl: 'js/components/app/App.html',
            controller: 'AppCtrl'

          })
          .state('app.home', {
            url: '/app',
            views: {
              left: {
                templateUrl: 'js/components/left/Left.html',
                controller: 'LeftCtrl'
              },
              main: {
                templateUrl: 'js/components/main/Main.html',
                controller: 'MainCtrl'
              },
              right: {
                templateUrl: 'js/components/right/Right.html',
                controller: 'RightCtrl'
              }
            }
          })
      }]);
})(angular);
