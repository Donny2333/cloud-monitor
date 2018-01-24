import angular from 'angular'
import CountBoard from './CountBoard.js'

export default angular
  .module('directives.countBoard', [])
  .directive('countBoard', () => new CountBoard())
  .name
