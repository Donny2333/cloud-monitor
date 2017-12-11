import angular from 'angular'
import uiRoute from 'angular-ui-router'
import app from '@/modules/app'

import '@/common/css/style.css'

angular.module('cloud-monitor', [uiRoute, app]).config([
  '$httpProvider',
  $httpProvider => {
    $httpProvider.defaults.useXDomain = true
    $httpProvider.defaults.withCredentials = true
  }
])
