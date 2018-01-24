import angular from 'angular'
import EllipseChart from './EllipseChart.js'

export default angular
  .module('directives.ellipseChart', [])
  .directive('ellipseChart', () => new EllipseChart()).name
