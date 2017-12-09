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
            templateUrl: 'src/js/components/app/App.html',
            controller: 'AppCtrl'

          })
          .state('app.home', {
            url: '/app',
            views: {
              left: {
                templateUrl: 'src/js/components/left/Left.html',
                controller: 'LeftCtrl',
                controllerAs: 'LeftCtrl'
              },
              main: {
                templateUrl: 'src/js/components/main/Main.html',
                controller: 'MainCtrl',
                controllerAs: 'MainCtrl'
              },
              right: {
                templateUrl: 'src/js/components/right/Right.html',
                controller: 'RightCtrl',
                controllerAs: 'RightCtrl'
              },
              bottom: {
                templateUrl: 'src/js/components/bottom/Bottom.html',
                controller: 'BottomCtrl',
                controllerAs: 'BottomCtrl'
              }
            }
          })
      }]);
})(angular);
