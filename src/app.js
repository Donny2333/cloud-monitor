import angular from 'angular'
import uiRouter from 'angular-ui-router'
import config from '@/config'
import directives from '@/directives'
import features from '@/features'
import routers from '@/routers'
import services from '@/services'

import '@/common/css/style.css'

angular.module('cloud-monitor', [
  uiRouter,
  config,
  directives,
  features,
  routers,
  services
])
