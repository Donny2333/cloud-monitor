import angular from 'angular'
import CenterCtrl from './CenterCtrl'
import directedGraph from '@/components/directedGraph'

export default angular
  .module('center', [directedGraph])
  .controller('CenterCtrl', CenterCtrl).name
