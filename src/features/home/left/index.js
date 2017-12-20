import angular from 'angular'
import LeftCtrl from './LeftCtrl'
import countBoard from '@/components/countBoard'

export default angular.module('left', [countBoard])
  .controller('LeftCtrl', LeftCtrl)
  .name
