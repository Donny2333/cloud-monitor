import angular from 'angular'
import left from '@/modules/left'
import main from '@/modules/main'
import right from '@/modules/right'
import bottom from '@/modules/bottom'

export default angular.module('home', [left, main, right, bottom]).name
