import angular from 'angular'
import RightCtrl from './RightCtrl'
import lineChart from '@/components/lineChart'

export default angular
  .module('right', [lineChart])
  .controller('RightCtrl', RightCtrl).name
