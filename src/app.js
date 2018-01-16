import angular from 'angular'
import uiRouter from '@uirouter/angularjs'
import config from '@/config'
import directives from '@/directives'
import features from '@/features'
import redux from '@/redux'
import routers from '@/routers'
import services from '@/services'

import './common/style/index.less'

angular.module('cloud-monitor', [
  uiRouter,
  config,
  directives,
  features,
  redux,
  routers,
  services
])
