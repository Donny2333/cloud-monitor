function parseParams(url, params) {
  const p = []
  for (const key in params) {
    p.push(key + '=' + params[key])
  }
  return url + p.join('&')
}

export default class EChartsFactory {
  constructor($q, $http, $sce) {
    return {
      get: function (url) {
        const deferred = $q.defer()

        $http.get(url).then(
          function (res) {
            deferred.resolve(res)
          },
          function (err) {
            deferred.reject(err)
          }
        )

        return deferred.promise
      },
      post: function (url, params) {
        const deferred = $q.defer()

        $http.post(url, params).then(
          function (res) {
            deferred.resolve(res)
          },
          function (err) {
            deferred.reject(err)
          }
        )

        return deferred.promise
      },
      jsonp: function (url, params) {
        const deferred = $q.defer()
        const _url = parseParams(url, params)

        $http.jsonp($sce.trustAsResourceUrl(_url)).then(
          function (res) {
            deferred.resolve(res)
          },
          function (err) {
            deferred.reject(err)
          }
        )

        return deferred.promise
      }
    }
  }
}
