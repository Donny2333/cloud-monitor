import angular from 'angular'
import route from './AppRoute'
import AppCtrl from './AppCtrl'

export default angular
  .module('app', [])
  .config(route)
  .controller('AppCtrl', AppCtrl).name
