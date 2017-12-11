const router = ($urlRouterProvider, $locationProvider, $stateProvider) => {
  $urlRouterProvider.otherwise('/app')
  // $locationProvider.html5Mode(true)

  $stateProvider
    .state('app', {
      abstract: true,
      templateUrl: 'src/modules/app/App.html',
      controller: 'AppCtrl'
    })
    .state('app.home', {
      url: '/app',
      views: {
        left: {
          templateUrl: 'src/modules/left/Left.html',
          controller: 'LeftCtrl',
          controllerAs: 'LeftCtrl'
        },
        main: {
          templateUrl: 'src/modules/main/Main.html',
          controller: 'MainCtrl',
          controllerAs: 'MainCtrl'
        },
        right: {
          templateUrl: 'src/modules/right/Right.html',
          controller: 'RightCtrl',
          controllerAs: 'RightCtrl'
        },
        bottom: {
          templateUrl: 'src/modules/bottom/Bottom.html',
          controller: 'BottomCtrl',
          controllerAs: 'BottomCtrl'
        }
      }
    })
}

router.$inject = ['$urlRouterProvider', '$locationProvider', '$stateProvider']

module.exports = router
