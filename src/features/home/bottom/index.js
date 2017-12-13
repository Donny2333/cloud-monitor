import angular from 'angular'
import BottomCtrl from './BottomCtrl'
import ellipseChart from '@/components/ellipseChart'
import squareChart from '@/components/squareChart'

export default angular
  .module('bttom', [ellipseChart, squareChart])
  .controller('BottomCtrl', BottomCtrl).name
