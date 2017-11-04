(function (angular) {
  'use strict';

  angular.module('cloud-monitor', [
    'ngAnimate',
    'ngRoute',
    'cloud-monitor.config',
    'cloud-monitor.routers',
    'cloud-monitor.directives',
    'cloud-monitor.services',
    'cloud-monitor.controllers'
  ]).config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;
  }]);
})(angular);
