import angular from 'angular'

const config = $httpProvider => {
  $httpProvider.defaults.useXDomain = true
  $httpProvider.defaults.withCredentials = true
}

config.$inject = ['$httpProvider']

export default angular.module('config', []).config(config).name
