import angular from 'angular'
import CircleChart from './CircleChart.js'

export default angular
  .module('directives.circleChart', [])
  .directive('circleChart', () => new CircleChart()).name
