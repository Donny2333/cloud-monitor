(function (angular) {
  "use strict";

  var prodURL = 'https://0.0.0.0/',
    devURL = 'http://10.127.3.38:8088/',
    Urls = {
      Prod_Cfg: {
        api: prodURL + 'monitor/v1.0/'
      },
      Dev_Cfg: {
        api: devURL + 'monitor/v1.0/'
      }
    };

  angular.module('cloud-monitor.config', [])
    .constant('URL_CFG', Urls.Dev_Cfg)

})(angular);
