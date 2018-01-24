import angular from 'angular'
import LineChart from './LineChart.js'

export default angular
  .module('directives.lineChart', [])
  .directive('lineChart', () => new LineChart()).name
