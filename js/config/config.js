(function (angular) {
  "use strict";

  var prodURL = 'https://0.0.0.0/',
    devURL = '',
    Urls = {
      Prod_Cfg: {
        api: prodURL + 'apis/monitor/v1.0/'
      },
      Dev_Cfg: {
        api: devURL + 'monitor/v1.0/'
      }
    };

  angular.module('cloud-monitor.config', [])
    .constant('URL_CFG', Urls.Dev_Cfg)

})(angular);
