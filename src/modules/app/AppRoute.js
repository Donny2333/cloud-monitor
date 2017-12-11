const route = $stateProvider => {
  $stateProvider.state('app', {
    abstract: true,
    templateUrl: '@/modules/app/App.html',
    controller: 'AppCtrl'
  })
}

module.exports = route
