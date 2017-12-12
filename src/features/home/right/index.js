import angular from 'angular'
import RightCtrl from './RightCtrl'
import circleChart from '@/components/circleChart'

export default angular
  .module('right', [circleChart])
  .controller('RightCtrl', RightCtrl).name
