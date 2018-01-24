import angular from 'angular'
import LeftCtrl from './LeftCtrl'
import countBoard from '@/components/countBoard'
import dashBoard from '@/components/dashBoard'
import circleChart from '@/components/circleChart'

export default angular.module('left', [countBoard, dashBoard, circleChart])
  .controller('LeftCtrl', LeftCtrl)
  .name
