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
            templateUrl: 'src/frontend/components/app/App.html',
            controller: 'AppCtrl'

          })
          .state('app.home', {
            url: '/app',
            views: {
              left: {
                templateUrl: 'src/frontend/components/left/Left.html',
                controller: 'LeftCtrl',
                controllerAs: 'LeftCtrl'
              },
              main: {
                templateUrl: 'src/frontend/components/main/Main.html',
                controller: 'MainCtrl',
                controllerAs: 'MainCtrl'
              },
              right: {
                templateUrl: 'src/frontend/components/right/Right.html',
                controller: 'RightCtrl',
                controllerAs: 'RightCtrl'
              },
              bottom: {
                templateUrl: 'src/frontend/components/bottom/Bottom.html',
                controller: 'BottomCtrl',
                controllerAs: 'BottomCtrl'
              }
            }
          })
      }]);
})(angular);
