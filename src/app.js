import angular from 'angular'
import uiRouter from 'angular-ui-router'
import router from '@/router'
import directives from '@/directives'
import app from '@/modules/app'
import home from '@/modules/home'
import config from '@/config'
import services from '@/services'

import '@/common/css/style.css'

angular.module('cloud-monitor', [
  uiRouter,
  app,
  home,
  router,
  config,
  services,
  directives
])
