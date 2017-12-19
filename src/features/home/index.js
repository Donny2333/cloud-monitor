import angular from 'angular'
import top from './top'
import main from './main'
import bottom from './bottom'
import left from './left'
import center from './center'
import right from './right'

export default angular.module('home', [top, center, left, main, right, bottom]).name
