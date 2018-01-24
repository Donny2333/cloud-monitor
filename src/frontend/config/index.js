import angular from 'angular'

export default angular.module('config', [])
  .config(['$httpProvider', $httpProvider => {
    $httpProvider.defaults.useXDomain = true
    $httpProvider.defaults.withCredentials = true
  }]).name
