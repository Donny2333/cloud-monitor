const router = ($urlRouterProvider, $locationProvider, $stateProvider) => {
  $urlRouterProvider.otherwise('/app')
  // $locationProvider.html5Mode(true)

  $stateProvider
    .state('app', {
      abstract: true,
      template: require('@/modules/app/App.html'),
      controller: 'AppCtrl'
    })
    .state('app.home', {
      url: '/app',
      views: {
        left: {
          template: require('@/modules/left/Left.html'),
          controller: 'LeftCtrl',
          controllerAs: 'LeftCtrl'
        },
        main: {
          template: require('@/modules/main/Main.html'),
          controller: 'MainCtrl',
          controllerAs: 'MainCtrl'
        },
        right: {
          template: require('@/modules/right/Right.html'),
          controller: 'RightCtrl',
          controllerAs: 'RightCtrl'
        },
        bottom: {
          template: require('@/modules/bottom/Bottom.html'),
          controller: 'BottomCtrl',
          controllerAs: 'BottomCtrl'
        }
      }
    })
}

router.$inject = ['$urlRouterProvider', '$locationProvider', '$stateProvider']

module.exports = router
