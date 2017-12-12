function parseParams(url, params) {
  var p = []
  for (var key in params) {
    p.push(key + '=' + params[key])
  }
  return url + p.join('&')
}

export default class EChartsFactory {
  constructor($q, $http, $sce) {
    return {
      get: function(url) {
        var deferred = $q.defer()

        $http.get(url).then(
          function(res) {
            deferred.resolve(res)
          },
          function(err) {
            deferred.reject(err)
          }
        )

        return deferred.promise
      },
      post: function(url, params) {
        var deferred = $q.defer()

        $http.post(url, params).then(
          function(res) {
            deferred.resolve(res)
          },
          function(err) {
            deferred.reject(err)
          }
        )

        return deferred.promise
      },
      jsonp: function(url, params) {
        var deferred = $q.defer()
        var _url = parseParams(url, params)

        $http.jsonp($sce.trustAsResourceUrl(_url)).then(
          function(res) {
            deferred.resolve(res)
          },
          function(err) {
            deferred.reject(err)
          }
        )

        return deferred.promise
      }
    }
  }
}
