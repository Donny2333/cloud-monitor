import { ENV } from '@/api'

export default ($urlRouterProvider, $stateProvider, $locationProvider) => {
  $urlRouterProvider.otherwise('/app')
  if (ENV === 'product') {
    $locationProvider.html5Mode(true)
  }

  $stateProvider
    .state('app', {
      abstract: true,
      template: require('@/features/app/App.html'),
      controller: 'AppCtrl',
      controllerAs: 'AppCtrl'
    })
    .state('app.home', {
      url: '/app',
      views: {
        top: {
          template: require('@/features/home/top/Top.html'),
          controller: 'TopCtrl',
          controllerAs: 'TopCtrl'
        },
        main: {
          template: require('@/features/home/main/Main.html'),
          controller: 'MainCtrl',
          controllerAs: 'MainCtrl'
        },
        left: {
          template: require('@/features/home/left/Left.html'),
          controller: 'LeftCtrl',
          controllerAs: 'LeftCtrl'
        },
        center: {
          template: require('@/features/home/center/Center.html'),
          controller: 'CenterCtrl',
          controllerAs: 'CenterCtrl'
        },
        right: {
          template: require('@/features/home/right/Right.html'),
          controller: 'RightCtrl',
          controllerAs: 'RightCtrl'
        }
      }
    })
}
