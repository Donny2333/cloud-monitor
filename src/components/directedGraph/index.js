import angular from 'angular'
import DirectedGraph from './DirectedGraph.js'

export default angular
  .module('directives.greeting', [])
  .directive('directedGraph', () => new DirectedGraph()).name
