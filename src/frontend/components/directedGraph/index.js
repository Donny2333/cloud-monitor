import angular from 'angular'
import DirectedGraph from './DirectedGraph.js'

export default angular
  .module('directives.directedGraph', [])
  .directive('directedGraph', () => new DirectedGraph()).name
