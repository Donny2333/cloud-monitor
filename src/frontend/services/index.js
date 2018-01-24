import angular from 'angular'
import EChartsFactory from './EChartsFactory'
import Http from './Http'
import Monitor from './Monitor'

export default angular.module('cloud-monitor.services', [
  EChartsFactory,
  Http,
  Monitor
]).name
