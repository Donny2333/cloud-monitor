import angular from 'angular'
import DashBoard from './DashBoard.js'

export default angular
  .module('directives.dashBoard', [])
  .directive('dashBoard', () => new DashBoard())
  .name
