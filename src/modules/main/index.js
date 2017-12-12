import angular from 'angular'
import MainCtrl from './MainCtrl'
import directedGraph from '@/components/directedGraph'

export default angular
  .module('main', [directedGraph])
  .controller('MainCtrl', MainCtrl).name
