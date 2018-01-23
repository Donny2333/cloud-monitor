(function (angular) {
  "use strict";

  var prodURL = '',
    devURL = 'http://10.127.3.38:8088/',
    Urls = {
      Prod_Cfg: {
        api: prodURL + 'apis/monitor/v1.0/'
      },
      Dev_Cfg: {
        api: devURL + 'monitor/v1.0/'
      }
    };

  angular.module('cloud-monitor.config', [])
    .constant('URL_CFG', Urls.Prod_Cfg)
    .constant('OPEN_ANIMATION', true);

})(angular);
