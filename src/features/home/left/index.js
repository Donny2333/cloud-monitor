import angular from 'angular'
import LeftCtrl from './LeftCtrl'
import countBoard from '@/components/countBoard'
import dashBoard from '@/components/dashBoard'

export default angular.module('left', [countBoard, dashBoard])
  .controller('LeftCtrl', LeftCtrl)
  .name
