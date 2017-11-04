(function (angular) {
  "use strict";

  var prodURL = 'https://172.30.1.246:9527/',
    devURL = 'http://192.168.250.44:9527/',
    Urls = {
      Prod_Cfg: {
        api: prodURL,
        img: 'http://172.30.1.246:9528/',
        map: 'http://111.47.18.22:9008/arcgis/rest/services/ThemeMap/MapServer',
        featureQuery: 'http://111.47.18.22:8090/TotalFactorQueryWcfService'
      },
      Dev_Cfg: {
        api: devURL,
        img: 'http://192.168.250.44:9528/',
        map: 'http://192.168.250.45:6080/arcgis/rest/services/ThemeMap/MapServer',
        featureQuery: 'http://192.168.250.42:8822/TotalFactorQueryWcfService'
      }
    };

  angular.module('cloud-monitor.config', [])
    .constant('URL_CFG', Urls.Prod_Cfg)

})(angular);
