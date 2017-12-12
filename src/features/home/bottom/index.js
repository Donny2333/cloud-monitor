import angular from 'angular'
import BottomCtrl from './BottomCtrl'
import EllipseChart from '@/components/EllipseChart'
import SquareChart from '@/components/SquareChart'

export default angular
  .module('bttom', [EllipseChart, SquareChart])
  .controller('BottomCtrl', BottomCtrl).name
