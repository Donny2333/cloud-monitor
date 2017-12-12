import angular from 'angular'
import SquareChart from './SquareChart.js'

export default angular
  .module('directives.squareChart', [])
  .directive('squareChart', () => new SquareChart()).name
