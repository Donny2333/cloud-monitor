import angular from 'angular'
import left from './left'
import main from './main'
import right from './right'
import bottom from './bottom'

export default angular.module('home', [left, main, right, bottom]).name
