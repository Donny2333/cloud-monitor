export default ($urlRouterProvider, $stateProvider) => {
  $urlRouterProvider.otherwise('/app')
  // $locationProvider.html5Mode(true)

  $stateProvider
    .state('app', {
      abstract: true,
      template: require('@/features/app/App.html'),
      controller: 'AppCtrl'
    })
    .state('app.home', {
      url: '/app',
      views: {
        left: {
          template: require('@/features/home/left/Left.html'),
          controller: 'LeftCtrl',
          controllerAs: 'LeftCtrl'
        },
        main: {
          template: require('@/features/home/main/Main.html'),
          controller: 'MainCtrl',
          controllerAs: 'MainCtrl'
        },
        right: {
          template: require('@/features/home/right/Right.html'),
          controller: 'RightCtrl',
          controllerAs: 'RightCtrl'
        },
        bottom: {
          template: require('@/features/home/bottom/Bottom.html'),
          controller: 'BottomCtrl',
          controllerAs: 'BottomCtrl'
        }
      }
    })
}
