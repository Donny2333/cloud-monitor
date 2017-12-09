;(function(angular) {
  'use strict'

  var prodURL = '',
    devURL = 'http://10.127.3.38:8088/',
    Urls = {
      Prod_Cfg: {
        api: prodURL + 'apis/monitor/v1.0/'
      },
      Dev_Cfg: {
        api: devURL + 'monitor/v1.0/'
      }
    }

  angular.module('cloud-monitor.config', []).constant('URL_CFG', Urls.Prod_Cfg)
})(angular)

;(function(angular) {
  'use strict'

  angular.module('cloud-monitor.routers', ['ui.router']).config([
    '$urlRouterProvider',
    '$locationProvider',
    '$stateProvider',
    function($urlRouterProvider, $locationProvider, $stateProvider) {
      $urlRouterProvider.otherwise('/app')
      // $locationProvider.html5Mode(true)

      $stateProvider
        .state('app', {
          abstract: true,
          templateUrl: 'src/modules/app/App.html',
          controller: 'AppCtrl'
        })
        .state('app.home', {
          url: '/app',
          views: {
            left: {
              templateUrl: 'src/modules/left/Left.html',
              controller: 'LeftCtrl',
              controllerAs: 'LeftCtrl'
            },
            main: {
              templateUrl: 'src/modules/main/Main.html',
              controller: 'MainCtrl',
              controllerAs: 'MainCtrl'
            },
            right: {
              templateUrl: 'src/modules/right/Right.html',
              controller: 'RightCtrl',
              controllerAs: 'RightCtrl'
            },
            bottom: {
              templateUrl: 'src/modules/bottom/Bottom.html',
              controller: 'BottomCtrl',
              controllerAs: 'BottomCtrl'
            }
          }
        })
    }
  ])
})(angular)

;(function(angular) {
  'use strict'

  angular
    .module('cloud-monitor.directives', [])
    .directive('myChart', function() {
      return {
        restrict: 'E',
        template: '<div ng-style="myStyle"></div>',
        replace: true,
        transclude: true,
        scope: {
          data: '=',
          myStyle: '='
        },
        link: function(scope, element, attrs) {
          var myChat = null

          if (scope.data) {
            // 基于准备好的dom，初始化echarts实例
            myChat = echarts.init(element[0])

            // 使用刚指定的配置项和数据显示图表
            myChat.setOption(scope.data)
          }

          //监听DOM元素
          scope.$watch('data', function(value) {
            if (value && value.hasOwnProperty('series')) {
              if (!myChat) {
                // echarts实例未准备好
                myChat = echarts.init(element[0])
              }

              if (value.series) {
                myChat.setOption(scope.data, true)
              }
            }
          })

          scope.$watch('myStyle', function(value) {
            if (value && myChat) {
              myChat.resize()
            }
          })
        }
      }
    })
})(angular)

;(function(angular) {
  'use strict'

  angular
    .module('cloud-monitor.services', [])
    .factory('uuid', function() {
      var uuid = {}

      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1)
      }

      uuid.create = function() {
        return (
          s4() +
          s4() +
          '-' +
          s4() +
          '-' +
          s4() +
          '-' +
          s4() +
          '-' +
          s4() +
          s4() +
          s4()
        )
      }

      return uuid
    })

    .factory('Http', [
      '$q',
      '$http',
      '$sce',
      function($q, $http, $sce) {
        function parseParams(url, params) {
          var p = []
          for (var key in params) {
            p.push(key + '=' + params[key])
          }
          return url + p.join('&')
        }

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
    ])

    .factory('Monitor', [
      'Http',
      'URL_CFG',
      function(Http, URL_CFG) {
        return {
          systemState: function() {
            return Http.get(URL_CFG.api + 'systemstate/statistics')
          },
          hostHealth: function() {
            return Http.get(URL_CFG.api + 'hosthealth/statistics/32')
          },
          hostState: function() {
            return Http.get(URL_CFG.api + 'hoststate/statistics')
          },
          vm: function() {
            return Http.get(URL_CFG.api + 'vm/statistics')
          },
          alarm: function() {
            return Http.get(URL_CFG.api + 'alarm/statistics')
          },
          hypervisors: function() {
            return Http.get(URL_CFG.api + 'hypervisors/statistics')
          },
          cpu: function() {
            return Http.get(URL_CFG.api + 'cpu/topn')
          },
          mem: function() {
            return Http.get(URL_CFG.api + 'mem/topn')
          },
          vm_cpu: function() {
            return Http.get(URL_CFG.api + 'vm_cpu/topn')
          },
          vm_mem: function() {
            return Http.get(URL_CFG.api + 'vm_mem/topn')
          }
        }
      }
    ])

    .factory('EChartsFactory', [
      'Http',
      function(Http) {
        var eChart = {}
        eChart.type = {}

        // 柱状图
        eChart.type.bar = function() {
          this.update = function(where) {
            Http.get(this.dataSource).then(
              function(res) {
                var xAxisData = []
                var series = []
                var legendData = []
                var option
                var temp = {}

                res.data.y.map(function(_y) {
                  temp[_y] = []

                  res.data.data.map(function(item) {
                    temp[_y].push(item[_y])
                  })

                  series.push({
                    name: _y,
                    type: 'bar',
                    stack: '总量',
                    data: temp[_y]
                  })

                  legendData.push(_y)
                })

                res.data.data.map(function(item) {
                  xAxisData.push(item[res.data.x])
                })

                option = {
                  tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                      type: 'shadow'
                    }
                  },
                  legend: {
                    data: legendData,
                    textStyle: {
                      color: '#929292'
                    }
                  },
                  grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '0',
                    containLabel: true
                  },
                  xAxis: [
                    {
                      type: 'category',
                      data: xAxisData,
                      axisLabel: {
                        show: true,
                        textStyle: {
                          color: '#929292'
                        }
                      }
                    }
                  ],
                  yAxis: [
                    {
                      type: 'value',
                      axisLabel: {
                        show: true,
                        textStyle: {
                          color: '#929292'
                        }
                      }
                    }
                  ],
                  series: series
                }

                this.data = option
                return (where.data = option)
              }.bind(this),
              function(err) {
                console.log(err)
              }
            )
          }
        }

        // 折线图
        eChart.type.line = function() {
          this.update = function(where) {
            Http.get(this.dataSource).then(
              function(res) {
                var xAxisData = []
                var series = []
                var seriesData = []
                var option

                res.data.data.map(
                  function(item) {
                    xAxisData.push(item[res.data.x])
                    seriesData.push(item[res.data.y])
                  }.bind(this)
                )

                series.push({
                  name: '',
                  type: 'line',
                  data: seriesData
                })

                option = {
                  tooltip: {
                    trigger: 'axis',
                    position: function(pt) {
                      return [pt[0], '10%']
                    }
                  },
                  toolbox: {
                    feature: {
                      dataZoom: {
                        yAxisIndex: 'none'
                      },
                      restore: {},
                      saveAsImage: {}
                    }
                  },
                  legend: {
                    data: ''
                  },
                  xAxis: {
                    data: xAxisData
                  },
                  yAxis: {},
                  series: series,
                  color: ['#3398DB']
                }

                this.data = option
                return where.push(this)
              }.bind(this),
              function(err) {
                console.log(err)
              }
            )
          }
        }

        // 仪表盘
        eChart.type.gauge = function() {
          var that = this

          that.update = function(where) {
            var option = {
              toolbox: {
                feature: {
                  restore: {},
                  saveAsImage: {}
                },
                show: false
              },
              textStyle: {
                fontSize: '100px'
              },
              series: [
                {
                  type: 'gauge',
                  name: this.title || '',
                  detail: {
                    formatter: '{value}',
                    textStyle: {
                      fontSize: 25,
                      fontWeight: 'bolder'
                    }
                  },
                  data: [],
                  title: {
                    show: false
                  },
                  axisLine: {
                    lineStyle: {
                      width: 20,
                      color: [
                        [0.2, '#ff9510'],
                        [0.8, '#2483cf'],
                        [1, '#57c550']
                      ]
                    }
                  },
                  splitLine: {
                    length: 20
                  },
                  axisLabel: {
                    textStyle: {
                      fontSize: 10
                    }
                  }
                }
              ]
            }

            Http.get(that.dataSource).then(
              function(res) {
                option.series[0].data = [
                  {
                    name: '系统健康度',
                    value: res.data.systemstate
                  }
                ]

                that.data = option
                return (where.data = option)
              },
              function(err) {
                Http.get(that.localSource).then(function(res) {
                  option.series[0].data = res.data.data

                  that.data = option
                  return (where.data = option)
                })
              }
            )
          }
        }

        // 饼图
        eChart.type.pie = function() {
          var that = this,
            option = {
              color: ['#57c550', '#ff9510', '#f45938'],
              tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
              },
              series: [
                {
                  name: that.title,
                  type: 'pie',
                  radius: [40, 55],
                  center: ['50%', '50%'],
                  label: {
                    normal: {
                      show: false
                    }
                  },
                  labelLine: {
                    normal: {
                      show: false
                    }
                  }
                }
              ]
            }

          that.update = function(where) {
            Http.get(that.dataSource).then(
              function(res) {
                option.series[0].data = [
                  {
                    name: '运行',
                    value: res.data.normal
                  },
                  {
                    name: '故障',
                    value: res.data.abnormal
                  },
                  {
                    name: '停止',
                    value: res.data.poweroff
                  }
                ]

                that.data = option
                that.total =
                  res.data.normal + res.data.abnormal + res.data.poweroff
                that.normal = res.data.normal
                that.abnormal = res.data.abnormal
                that.poweroff = res.data.poweroff
                return (where.data = option)
              },
              function(err) {
                Http.get(that.localSource).then(function(res) {
                  res.data = res.data.data[0]

                  option.series[0].data = [
                    {
                      name: '运行',
                      value: res.data.normal
                    },
                    {
                      name: '故障',
                      value: res.data.abnormal
                    },
                    {
                      name: '停止',
                      value: res.data.poweroff
                    }
                  ]

                  that.data = option
                  that.total =
                    res.data.normal + res.data.abnormal + res.data.poweroff
                  that.normal = res.data.normal
                  that.abnormal = res.data.abnormal
                  that.poweroff = res.data.poweroff
                  return (where.data = option)
                })
              }
            )
          }
        }

        // 地图
        eChart.type.map = function() {
          this.update = function(where) {
            Http.get(this.dataSource).then(
              function(res) {
                var series = []
                var seriesData = []

                res.data.y.map(function(_y) {
                  seriesData = []

                  res.data.data.map(function(item) {
                    seriesData.push({
                      name: item.country,
                      value: item[_y]
                    })
                  })

                  series.push({
                    name: _y,
                    type: 'map',
                    mapType: 'LHK', // 自定义扩展图表类型
                    itemStyle: {
                      normal: { label: { show: true } },
                      emphasis: { label: { show: true } }
                    },
                    data: seriesData
                  })
                })

                var option = {
                  legend: {
                    orient: 'vertical',
                    left: 'right',
                    data: res.data.y,
                    textStyle: {
                      color: '#929292'
                    }
                  },
                  tooltip: {
                    trigger: 'item',
                    formatter: '{b}<br/>{a}:{c}<br/>'
                  },
                  toolbox: {
                    show: false,
                    orient: 'vertical',
                    left: 'right',
                    top: 'center',
                    feature: {
                      dataView: { readOnly: false },
                      restore: {},
                      saveAsImage: {}
                    }
                  },
                  visualMap: {
                    min: 50,
                    max: 50000,
                    text: ['高', '低'],
                    realtime: false,
                    calculable: true,
                    inRange: {
                      color: ['lightskyblue', 'yellow', 'orangered']
                    }
                  },
                  series: series
                }

                this.data = option
                return (where.data = option)
              }.bind(this),
              function(err) {
                // console.log(err);
              }
            )
          }
        }

        return function(type) {
          type = type.toLowerCase()
          return new eChart.type[type]()
        }
      }
    ])
})(angular)

;(function(angular) {
  'use strict'

  angular.module('cloud-monitor.directives').directive('circleChart', [
    '$interval',
    function($interval) {
      return {
        restrict: 'E',
        templateUrl: 'src/components/circleChart/CircleChart.html',
        replace: true,
        bindToController: true,
        scope: {
          color: '=',
          title: '=',
          detail: '='
        },
        link: function(scope, element, attrs, ctrl) {
          var svg = d3.select(element[0]).selectAll('svg'),
            cx = 150,
            cy = 150,
            r = 120

          ctrl.percent = ctrl.detail.usageValue / ctrl.detail.totalValue * 100

          function drawsvg() {
            var updateP = svg.selectAll('path').data([ctrl.percent]),
              enterP = updateP.enter(),
              exitP = updateP.exit()

            updateP.attr('d', function(d, i) {
              var angle = 2 * Math.PI * d / 100

              return _.concat(
                ['M', cx + r, cy],
                [
                  'A',
                  r,
                  r,
                  0,
                  Math.floor(d / 50),
                  1,
                  cx + Math.cos(angle) * r,
                  cy + Math.sin(angle) * r
                ]
              ).join(' ')
            })

            enterP
              .append('path')
              .attr('fill', 'none')
              .attr('stroke-width', 30)
              .attr('stroke-linecap', 'round')
              .attr('stroke-miterlimit', 10)
              .attr('stroke', function(d, i) {
                return ctrl.color
              })
              .attr('d', function(d, i) {
                var angle = 2 * Math.PI * d / 100
                return _.concat(
                  ['M', cx + r, cy],
                  [
                    'A',
                    r,
                    r,
                    0,
                    Math.floor(d / 50),
                    1,
                    cx + Math.cos(angle) * r,
                    cy + Math.sin(angle) * r
                  ]
                ).join(' ')
              })

            exitP.remove()
          }

          scope.$watch(
            function() {
              return ctrl.detail.usageValue
            },
            function(value) {
              ctrl.percent =
                ctrl.detail.usageValue / ctrl.detail.totalValue * 100
              drawsvg()
            }
          )
        },
        controller: function() {},
        controllerAs: 'CircleChartCtrl'
      }
    }
  ])
})(angular)

;(function(angular) {
  'use strict'

  angular.module('cloud-monitor.directives').directive('directedGraph', [
    '$interval',
    function($interval) {
      return {
        restrict: 'E',
        templateUrl: 'src/components/directedGraph/DirectedGraph.html',
        replace: true,
        scope: {
          data: '='
        },
        bindToController: true,
        link: function(scope, element, attrs, ctrl) {
          var svg = d3.select(element[0]).selectAll('svg.directed'),
            x0 = 20,
            y0 = 20,
            rx =
              $(element[0])
                .children('svg')
                .width() /
                2 -
              x0,
            ry =
              $(element[0])
                .children('svg')
                .height() /
                2 -
              y0,
            cr =
              $(element[0])
                .children('img.radar-ball')
                .height() /
                2 -
              20,
            r = 25,
            v = [
              [0.5, 0.25],
              [0.75, 0.18],
              [1, 0.15],
              [1.25, 0.18],
              [1.5, 0.25],
              [0.3, 0.4],
              [0.5, 0.5],
              [0.75, 0.35],
              [1.25, 0.35],
              [1.5, 0.5],
              [1.7, 0.4],
              [0.18, 0.7],
              [0.35, 0.75],
              [1.65, 0.75],
              [1.88, 0.7],
              [0.15, 1],
              [1.85, 1],
              [0.18, 1.3],
              [0.35, 1.25],
              [1.7, 1.25],
              [1.88, 1.3],
              [0.3, 1.6],
              [0.45, 1.5],
              [0.75, 1.65],
              [1.25, 1.65],
              [1.5, 1.5],
              [1.7, 1.6],
              [0.5, 1.75],
              [0.75, 1.82],
              [1, 1.85],
              [1.25, 1.82],
              [1.5, 1.75]
            ],
            _d = [],
            dataList = ctrl.data,
            i,
            j,
            flag

          function move() {
            for (i = 0; i < v.length; i++) {
              _d[i] = []
              _d[i][0] = v[i][0] + (Math.random() - 1) % 0.1
              _d[i][1] = v[i][1] + (Math.random() - 1) % 0.1

              for (j = 0; j < _d[i].length; j++) {
                flag = _d[i][j] < 1 ? 1 : -1
                _d[i][j] =
                  _d[i][j] +
                  flag *
                    Math.log(Math.abs(_d[i][j] - 1)) /
                    Math.log(Math.pow(10, 50))
              }
            }
          }

          function drawsvg() {
            // circle
            var updateC = svg.selectAll('circle').data(_d),
              enterC = updateC.enter(),
              exitC = updateC.exit()

            updateC
              .transition()
              .duration(3000)
              .ease(d3.easeCubicOut)
              .attr('cx', function(d, i) {
                return rx * d[0] + x0
              })
              .attr('cy', function(d, i) {
                return ry * d[1] + y0
              })
              .attr('r', function(d, i) {
                return (
                  r * Math.sqrt(Math.pow(d[0] - 1, 2) + Math.pow(d[1] - 1, 2))
                )
              })
              .transition()
              .duration(2000)
              .ease(d3.easeCubicOut)
              .attr('stroke', function(d, i) {
                if (dataList[i] < 20) {
                  return '#ff9510'
                } else if (dataList[i] < 80) {
                  return '#0f9ee5'
                } else {
                  return '#57c550'
                }
              })
              .attr('fill', function(d, i) {
                if (dataList[i] < 20) {
                  return 'url(#grad_orange)'
                } else if (dataList[i] < 80) {
                  return 'url(#grad_blue)'
                } else {
                  return 'url(#grad_green)'
                }
              })

            var circle = enterC.append('circle')

            circle
              .attr('cx', function(d, i) {
                return rx * d[0] + x0
              })
              .attr('cy', function(d, i) {
                return ry * d[1] + y0
              })
              .transition()
              .duration(1000)
              .ease(d3.easeCubicOut)
              .attr('r', function(d, i) {
                return (
                  r * Math.sqrt(Math.pow(d[0] - 1, 2) + Math.pow(d[1] - 1, 2))
                )
              })
              .attr('stroke', function(d, i) {
                if (dataList[i] < 20) {
                  return '#ff9510'
                } else if (dataList[i] < 80) {
                  return '#0f9ee5'
                } else {
                  return '#57c550'
                }
              })
              .attr('fill', function(d, i) {
                if (dataList[i] < 20) {
                  return 'url(#grad_orange)'
                } else if (dataList[i] < 80) {
                  return 'url(#grad_blue)'
                } else {
                  return 'url(#grad_green)'
                }
              })

            circle
              .append('animate')
              .attr('attributeName', 'r')
              .attr('dur', '5s')
              .attr('values', function(d, i) {
                var _r =
                  r * Math.sqrt(Math.pow(d[0] - 1, 2) + Math.pow(d[1] - 1, 2))
                return [_r, 1.3 * _r, _r].join(';')
              })
              .attr('repeatCount', 'indefinite')

            exitC.remove()

            // line
            var updateL = svg.selectAll('path').data(_d),
              enterL = updateL.enter(),
              exitL = updateL.exit()

            updateL
              .transition()
              .duration(3000)
              .ease(d3.easeCubicOut)
              .attr('d', function(d, i) {
                var _x0 = rx + cr * (d[0] - 1),
                  _y0 = ry + cr * (d[1] - 1),
                  _delta_x = _x0 - rx,
                  _delta_y = _y0 - ry,
                  _x1 =
                    r *
                    Math.acos(
                      _delta_x /
                        Math.sqrt(Math.pow(_delta_x, 2) + Math.pow(_delta_y, 2))
                    ),
                  _y1 =
                    r *
                    Math.asin(
                      _delta_y /
                        Math.sqrt(Math.pow(_delta_x, 2) + Math.pow(_delta_y, 2))
                    )

                return _.concat(
                  ['M', rx * d[0] + x0, ry * d[1] + y0],
                  ['L', rx + cr * (d[0] - 1) + x0, ry + cr * (d[1] - 1) + y0]
                ).join(' ')
              })
              .transition()
              .duration(2000)
              .ease(d3.easeCubicOut)
              .attr('stroke', function(d, i) {
                if (dataList[i] < 20) {
                  return '#ff9510'
                } else if (dataList[i] < 80) {
                  return '#0f9ee5'
                } else {
                  return '#57c550'
                }
              })

            enterL
              .append('path')
              .attr('d', function(d, i) {
                var _x0 = rx + cr * (d[0] - 1),
                  _y0 = ry + cr * (d[1] - 1),
                  _delta_x = _x0 - rx,
                  _delta_y = _y0 - ry,
                  _x1 =
                    r *
                    Math.acos(
                      _delta_x /
                        Math.sqrt(Math.pow(_delta_x, 2) + Math.pow(_delta_y, 2))
                    ),
                  _y1 =
                    r *
                    Math.asin(
                      _delta_y /
                        Math.sqrt(Math.pow(_delta_x, 2) + Math.pow(_delta_y, 2))
                    )

                return _.concat(
                  ['M', rx * d[0] + x0, ry * d[1] + y0],
                  ['L', rx + cr * (d[0] - 1) + x0, ry + cr * (d[1] - 1) + y0]
                ).join(' ')
              })
              .attr('style', 'opacity: 0.5')
              .attr('stroke-width', '2px')
              .attr('fill-rule', 'evenodd')
              .attr('stroke', function(d, i) {
                if (dataList[i] < 20) {
                  return '#ff9510'
                } else if (dataList[i] < 80) {
                  return '#0f9ee5'
                } else {
                  return '#57c550'
                }
              })

            exitL.remove()

            // text
            var updateT = svg.selectAll('text').data(dataList),
              enterT = updateT.enter(),
              exitT = updateT.exit()

            updateT
              .transition()
              .duration(3000)
              .ease(d3.easeCubicOut)
              .attr('x', function(d, i) {
                return rx * _d[i][0] + x0
              })
              .attr('y', function(d, i) {
                return ry * _d[i][1] + 7 + y0
              })
              .transition()
              .duration(2000)
              .ease(d3.easeCubicOut)
              .text(function(d, i) {
                return Math.floor(d)
              })

            enterT
              .append('text')
              .attr('x', function(d, i) {
                return rx * _d[i][0] + x0
              })
              .attr('y', function(d, i) {
                return ry * _d[i][1] + 7 + y0
              })
              .attr('text-anchor', 'middle')
              .style('fill', 'white')
              .style('font-size', '14px')
              .transition()
              .duration(2000)
              .ease(d3.easeCubicOut)
              .text(function(d, i) {
                return Math.floor(d)
              })

            exitT.remove()
          }

          move()
          drawsvg()

          scope.$watch(
            function() {
              return ctrl.data
            },
            function(value) {
              dataList = value
              move()
              drawsvg()
            }
          )
        },
        controller: function() {},
        controllerAs: 'DirectedGraphCtrl'
      }
    }
  ])
})(angular)

;(function(angular) {
  'use strict'

  angular
    .module('cloud-monitor.directives')

    .directive('ellipseChart', [
      '$timeout',
      function($timeout) {
        return {
          restrict: 'E',
          templateUrl: 'src/components/ellipseChart/EllipseChart.html',
          transclude: true,
          replace: true,
          scope: {
            chart: '='
          },
          bindToController: true,
          link: function(scope, element, attrs, ctrl) {
            var svg = d3.select(element[0]).selectAll('.ellipseChart'),
              rx = parseFloat(attrs.rx),
              ry = parseFloat(attrs.ry),
              h = parseFloat(attrs.h),
              x0 = parseFloat(attrs.x0),
              y0 = parseFloat(attrs.y0),
              deltaX = parseFloat(attrs.deltaX),
              deltaH = parseFloat(attrs.deltaH)

            var dataList, colorList, barColorList

            function drawText() {}

            function drawsvg() {
              // ellipse.bottom
              var updateE1 = svg.selectAll('ellipse.bottom').data(dataList),
                enterE1 = updateE1.enter(),
                exitE1 = updateE1.exit()

              updateE1
                .transition()
                .duration(1000)
                .ease(d3.easeCubicOut)
                .attr('cy', function(d, i) {
                  return y0 + h - d
                })

              enterE1
                .append('ellipse')
                .attr('cx', function(d, i) {
                  return x0 + rx + i * deltaX
                })
                .attr('cy', function(d, i) {
                  return y0 + h - d
                })
                .attr('rx', function(d, i) {
                  return rx
                })
                .attr('ry', function(d, i) {
                  return ry
                })
                .attr('fill', function(d, i) {
                  return colorList[i]
                })
                .attr('class', 'bottom')

              exitE1.remove()

              // path.bottom
              var updateP1 = svg.selectAll('path.bottom').data(dataList),
                enterP1 = updateP1.enter(),
                exitP1 = updateP1.exit()

              updateP1
                .transition()
                .duration(1000)
                .ease(d3.easeCubicOut)
                .attr('d', function(d, i) {
                  return _.concat(
                    ['M', x0 + 2 * rx + deltaX * i, h + y0],
                    ['A', rx, ry, 0, 0, 1, x0 + deltaX * i, h + y0],
                    ['V', h - d + y0],
                    ['A', rx, ry, 0, 0, 0, x0 + 2 * rx + deltaX * i, h - d + y0]
                  ).join(' ')
                })

              enterP1
                .append('path')
                .attr('fill', function(d, i) {
                  return barColorList[i]
                })
                .attr('d', function(d, i) {
                  return _.concat(
                    ['M', x0 + 2 * rx + deltaX * i, h + y0],
                    ['A', rx, ry, 0, 0, 1, x0 + deltaX * i, h + y0],
                    ['V', h - d + y0],
                    ['A', rx, ry, 0, 0, 0, x0 + 2 * rx + deltaX * i, h - d + y0]
                  ).join(' ')
                })
                .attr('class', 'bottom')

              exitP1.remove()

              // ellipse.top
              var updateE2 = svg.selectAll('ellipse.top').data(dataList),
                enterE2 = updateE2.enter(),
                exitE2 = updateE2.exit()

              enterE2
                .append('ellipse')
                .attr('cx', function(d, i) {
                  return x0 + rx + i * deltaX
                })
                .attr('cy', function(d, i) {
                  return y0 + ry
                })
                .attr('rx', function(d, i) {
                  return rx
                })
                .attr('ry', function(d, i) {
                  return ry
                })
                .attr('fill', '#F7F7F8')
                .attr('opacity', 0.3)
                .attr('class', 'top')

              exitE2.remove()

              // path.top
              var updateP2 = svg.selectAll('path.top').data(dataList),
                enterP2 = updateP2.enter(),
                exitP2 = updateP2.exit()

              updateP2
                .transition()
                .duration(1000)
                .ease(d3.easeCubicOut)
                .attr('d', function(d, i) {
                  return _.concat(
                    ['M', x0 + 2 * rx + deltaX * i, h - d + deltaH + y0],
                    [
                      'A',
                      rx,
                      ry,
                      0,
                      0,
                      1,
                      x0 + deltaX * i,
                      h - d + deltaH + y0
                    ],
                    ['V', ry + y0],
                    ['A', rx, ry, 0, 0, 0, x0 + 2 * rx + deltaX * i, ry + y0]
                  ).join(' ')
                })

              enterP2
                .append('path')
                .attr('fill', '#AEADB3')
                .attr('opacity', 0.3)
                .attr('d', function(d, i) {
                  return _.concat(
                    ['M', x0 + 2 * rx + deltaX * i, h - d + deltaH + y0],
                    [
                      'A',
                      rx,
                      ry,
                      0,
                      0,
                      1,
                      x0 + deltaX * i,
                      h - d + deltaH + y0
                    ],
                    ['V', ry + y0],
                    ['A', rx, ry, 0, 0, 0, x0 + 2 * rx + deltaX * i, ry + y0]
                  ).join(' ')
                })
                .attr('class', 'top')

              exitP2.remove()
            }

            scope.$watch(
              function() {
                return ctrl.chart
              },
              function(value) {
                dataList = value.dataList
                colorList = value.colorList
                barColorList = value.barColorList
                drawText()
                drawsvg()
              }
            )
          },
          controller: function() {},
          controllerAs: 'EllipseChartCtrl'
        }
      }
    ])
})(angular)

;(function(angular) {
  'use strict'

  angular
    .module('cloud-monitor.directives')

    .directive('squareChart', [
      '$timeout',
      function($timeout) {
        return {
          restrict: 'E',
          templateUrl: 'src/components/squareChart/SquareChart.html',
          transclude: true,
          replace: true,
          scope: {
            chart: '='
          },
          bindToController: true,
          link: function(scope, element, attrs, ctrl) {
            var height = $(element[0]).height()
            var width = $(element[0]).width()

            var svg = d3.select(element[0]).selectAll('.squareChart'),
              g = svg.selectAll('g.bar'),
              a = parseFloat(attrs.a),
              b = parseFloat(attrs.b),
              h = parseFloat(attrs.h),
              x0 = parseFloat(attrs.x0),
              y0 = parseFloat(attrs.y0),
              deltaX = parseFloat(attrs.deltaX),
              deltaH = parseFloat(attrs.deltaH)

            var dataList, colorList, barColorList

            function drawsvg() {
              var updateP, enterP, exitP, _i

              // polygon.bottom
              for (_i = 0; _i <= 2; _i++) {
                updateP = svg.selectAll('polygon.bottom_' + _i).data(dataList)
                enterP = updateP.enter()
                exitP = updateP.exit()

                updateP
                  .transition()
                  .duration(1000)
                  .ease(d3.easeCubicOut)
                  .attr('points', function(d, i) {
                    var points = []
                    switch (_i) {
                      case 0:
                        points = _.concat(
                          [a + deltaX * i + x0, h - d + y0],
                          [2 * a + deltaX * i + x0, h - d + b + y0],
                          [a + deltaX * i + x0, h - d + 2 * b + y0],
                          [deltaX * i + x0, h - d + b + y0]
                        )
                        break

                      case 1:
                        points = _.concat(
                          [deltaX * i + x0, b + h - d + y0],
                          [a + deltaX * i + x0, 2 * b + h - d + y0],
                          [a + deltaX * i + x0, h + b + y0],
                          [deltaX * i + x0, h + y0]
                        )
                        break

                      case 2:
                        points = _.concat(
                          [2 * a + deltaX * i + x0, b + h - d + y0],
                          [a + deltaX * i + x0, 2 * b + h - d + y0],
                          [a + deltaX * i + x0, h + b + y0],
                          [2 * a + deltaX * i + x0, h + y0]
                        )
                        break

                      default:
                        break
                    }
                    return points.join(' ')
                  })

                enterP
                  .append('polygon')
                  .attr('fill', function(d, i) {
                    return barColorList[i][_i]
                  })
                  .attr('points', function(d, i) {
                    var points = []
                    switch (_i) {
                      case 0:
                        points = _.concat(
                          [a + deltaX * i + x0, h - d + y0],
                          [2 * a + deltaX * i + x0, h - d + b + y0],
                          [a + deltaX * i + x0, h - d + 2 * b + y0],
                          [deltaX * i + x0, h - d + b + y0]
                        )
                        break

                      case 1:
                        points = _.concat(
                          [deltaX * i + x0, b + h - d + y0],
                          [a + deltaX * i + x0, 2 * b + h - d + y0],
                          [a + deltaX * i + x0, h + b + y0],
                          [deltaX * i + x0, h + y0]
                        )
                        break

                      case 2:
                        points = _.concat(
                          [2 * a + deltaX * i + x0, b + h - d + y0],
                          [a + deltaX * i + x0, 2 * b + h - d + y0],
                          [a + deltaX * i + x0, h + b + y0],
                          [2 * a + deltaX * i + x0, h + y0]
                        )
                        break

                      default:
                        break
                    }
                    return points.join(' ')
                  })
                  .attr('class', 'bottom_' + _i)

                exitP.remove()
              }

              // polygon.top
              for (_i = 0; _i <= 2; _i++) {
                updateP = svg.selectAll('polygon.top_' + _i).data(dataList)
                enterP = updateP.enter()
                exitP = updateP.exit()

                updateP
                  .transition()
                  .duration(1000)
                  .ease(d3.easeCubicOut)
                  .attr('points', function(d, i) {
                    var points = []
                    switch (_i) {
                      case 0:
                        points = _.concat(
                          [a + deltaX * i + x0, y0],
                          [2 * a + deltaX * i + x0, b + y0],
                          [a + deltaX * i + x0, 2 * b + y0],
                          [deltaX * i + x0, b + y0]
                        )
                        break

                      case 1:
                        points = _.concat(
                          [deltaX * i + x0, b + y0],
                          [a + deltaX * i + x0, 2 * b + y0],
                          [a + deltaX * i + x0, 2 * b + h - d + deltaH + y0],
                          [deltaX * i + x0, b + h - d + deltaH + y0]
                        )
                        break

                      case 2:
                        points = _.concat(
                          [2 * a + deltaX * i + x0, b + y0],
                          [a + deltaX * i + x0, 2 * b + y0],
                          [a + deltaX * i + x0, 2 * b + h - d + deltaH + y0],
                          [2 * a + deltaX * i + x0, b + h - d + deltaH + y0]
                        )
                        break

                      default:
                        break
                    }
                    return points.join(' ')
                  })

                enterP
                  .append('polygon')
                  .attr('fill', function(d, i) {
                    return colorList[_i]
                  })
                  .attr('opacity', 0.3)
                  .attr('points', function(d, i) {
                    var points = []
                    switch (_i) {
                      case 0:
                        points = _.concat(
                          [a + deltaX * i + x0, y0],
                          [2 * a + deltaX * i + x0, b + y0],
                          [a + deltaX * i + x0, 2 * b + y0],
                          [deltaX * i + x0, b + y0]
                        )
                        break

                      case 1:
                        points = _.concat(
                          [deltaX * i + x0, b + y0],
                          [a + deltaX * i + x0, 2 * b + y0],
                          [a + deltaX * i + x0, 2 * b + h - d + deltaH + y0],
                          [deltaX * i + x0, b + h - d + deltaH + y0]
                        )
                        break

                      case 2:
                        points = _.concat(
                          [2 * a + deltaX * i + x0, b + y0],
                          [a + deltaX * i + x0, 2 * b + y0],
                          [a + deltaX * i + x0, 2 * b + h - d + deltaH + y0],
                          [2 * a + deltaX * i + x0, b + h - d + deltaH + y0]
                        )
                        break

                      default:
                        break
                    }
                    return points.join(' ')
                  })
                  .attr('class', 'top_' + _i)

                exitP.remove()
              }
            }

            scope.$watch(
              function() {
                return ctrl.chart
              },
              function(value) {
                dataList = value.dataList
                colorList = value.colorList
                barColorList = value.barColorList
                drawsvg()
              }
            )
          },
          controller: function() {},
          controllerAs: 'SquareChartCtrl'
        }
      }
    ])
})(angular)

;(function(angular) {
  'use strict'

  angular.module('cloud-monitor.controllers', []).controller('AppCtrl', [
    '$scope',
    '$http',
    '$timeout',
    'URL_CFG',
    function($scope, $http, $timeout, URL_CFG) {
      var SEPARATION = 80,
        AMOUNTX = 60,
        AMOUNTY = 25

      var container
      var camera, scene, renderer

      var particles,
        particle,
        count = 0

      var windowHalfX = window.innerWidth / 2
      var windowHalfY = window.innerHeight / 2

      init()
      animate()

      function init() {
        container = document.createElement('div')
        container.className = 'wave'
        document.body.appendChild(container)

        camera = new THREE.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          1,
          10000
        )
        camera.position.x = 0
        camera.position.y = 500
        camera.position.z = 1500

        scene = new THREE.Scene()

        particles = []

        var PI2 = Math.PI * 2
        var material = new THREE.SpriteCanvasMaterial({
          color: new THREE.Color(0x3399cc),
          opacity: 0.5,
          program: function(context) {
            context.beginPath()
            context.arc(0, 0, 0.5, 0, PI2, true)
            context.fill()
          }
        })

        var i = 0

        for (var ix = 0; ix < AMOUNTX; ix++) {
          for (var iy = 0; iy < AMOUNTY; iy++) {
            particle = particles[i++] = new THREE.Sprite(material)
            particle.position.x = ix * SEPARATION - AMOUNTX * SEPARATION / 2
            particle.position.z = iy * SEPARATION - AMOUNTY * SEPARATION / 2
            scene.add(particle)
          }
        }

        renderer = new THREE.CanvasRenderer({ alpha: true })
        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.setSize(window.innerWidth, window.innerHeight)

        container.appendChild(renderer.domElement)

        window.addEventListener('resize', onWindowResize, false)
      }

      function onWindowResize() {
        windowHalfX = window.innerWidth / 2
        windowHalfY = window.innerHeight / 2

        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()

        renderer.setSize(window.innerWidth, window.innerHeight)
      }

      function animate() {
        requestAnimationFrame(animate)
        render()
      }

      function render() {
        camera.lookAt(scene.position)

        var i = 0
        for (var ix = 0; ix < AMOUNTX; ix++) {
          for (var iy = 0; iy < AMOUNTY; iy++) {
            particle = particles[i++]
            particle.position.y =
              Math.sin((ix + count) * 0.3) * 50 +
              Math.sin((iy + count) * 0.5) * 50
            particle.scale.x = particle.scale.y =
              (Math.sin((ix + count) * 0.3) + 1) * 4 +
              (Math.sin((iy + count) * 0.5) + 1) * 4
          }
        }

        renderer.render(scene, camera)

        count += 0.01
      }
    }
  ])
})(angular)

;(function(angular) {
  'use strict'

  angular.module('cloud-monitor.controllers').controller('BottomCtrl', [
    '$interval',
    'Monitor',
    'Http',
    function($interval, Monitor, Http) {
      var that = this

      var colorList1 = ['#F7F7F8', '#AEADB3', '#D8D9DD'],
        colorList2 = ['#0EC17C', '#C085C6', '#F47F73', '#F7B686', '#8FBAE5'],
        barColorList1 = [
          ['#0EC17C', '#007552', '#029363'],
          ['#BF97C4', '#8B518E', '#A068A5'],
          ['#F47F73', '#F45938', '#EA6853'],
          ['#F7B686', '#FFA040', '#FFAF66'],
          ['#8FBAE5', '#638AC1', '#759FD1']
        ],
        barColorList2 = ['#007552', '#8B518E', '#F45938', '#FFA040', '#638AC1']

      that.charts = [
        {
          title: 'TOP 5 主机CPU利用率',
          names: ['主机一', '主机二', '主机三', '主机四', '主机五'],
          dataList: [30, 30, 30, 30, 30],
          colorList: colorList1,
          barColorList: barColorList1
        },
        {
          title: 'TOP 5 主机内存利用率',
          names: ['主机一', '主机二', '主机三', '主机四', '主机五'],
          dataList: [15, 15, 15, 15, 15],
          colorList: colorList2,
          barColorList: barColorList2
        },
        {
          title: 'TOP 5 虚拟机CPU利用率',
          names: ['虚拟机一', '虚拟机二', '虚拟机三', '虚拟机四', '虚拟机五'],
          dataList: [30, 30, 30, 30, 30],
          colorList: colorList1,
          barColorList: barColorList1
        },
        {
          title: 'TOP 5 虚拟机内存利用率',
          names: ['虚拟机一', '虚拟机二', '虚拟机三', '虚拟机四', '虚拟机五'],
          dataList: [15, 15, 15, 15, 15],
          colorList: colorList2,
          barColorList: barColorList2
        }
      ]

      function reload() {
        Monitor.cpu().then(
          function(res) {
            var names = []
            var dataList = []

            res.data.json.map(function(item) {
              names.push(item.name)
              dataList.push(30 + item.value * 1.2)
            })

            that.charts[0] = {
              title: that.charts[0].title,
              names: names,
              dataList: dataList,
              colorList: colorList1,
              barColorList: barColorList1
            }
          },
          function(err) {
            Http.get('src/common/json/top5_cpu_usage.json').then(function(res) {
              var names = []
              var dataList = []

              res.data.json.map(function(item) {
                names.push(item.name)
                dataList.push(30 + item.value * 1.2)
              })

              that.charts[0] = {
                title: that.charts[0].title,
                names: names,
                dataList: dataList,
                colorList: colorList1,
                barColorList: barColorList1
              }
            })
          }
        )

        Monitor.mem().then(
          function(res) {
            var names = []
            var dataList = []

            res.data.json.map(function(item) {
              names.push(item.name)
              dataList.push(15 + item.value * 1.25)
            })

            that.charts[1] = {
              title: that.charts[1].title,
              names: names,
              dataList: dataList,
              colorList: colorList2,
              barColorList: barColorList2
            }
          },
          function(err) {
            Http.get('src/common/json/top5_memory_usage.json').then(function(
              res
            ) {
              var names = []
              var dataList = []

              res.data.json.map(function(item) {
                names.push(item.name)
                dataList.push(15 + item.value * 1.25)
              })

              that.charts[1] = {
                title: that.charts[1].title,
                names: names,
                dataList: dataList,
                colorList: colorList2,
                barColorList: barColorList2
              }
            })
          }
        )

        Monitor.vm_cpu().then(
          function(res) {
            var names = []
            var dataList = []

            res.data.json.map(function(item) {
              names.push(item.name)
              dataList.push(30 + item.value * 1.2)
            })

            that.charts[2] = {
              title: that.charts[2].title,
              names: names,
              dataList: dataList,
              colorList: colorList1,
              barColorList: barColorList1
            }
          },
          function(err) {
            Http.get('src/common/json/top5_vm_cpu_usage.json').then(function(
              res
            ) {
              var names = []
              var dataList = []

              res.data.json.map(function(item) {
                names.push(item.name)
                dataList.push(30 + item.value * 1.2)
              })

              that.charts[2] = {
                title: that.charts[2].title,
                names: names,
                dataList: dataList,
                colorList: colorList1,
                barColorList: barColorList1
              }
            })
          }
        )

        Monitor.vm_mem().then(
          function(res) {
            var names = []
            var dataList = []

            res.data.json.map(function(item) {
              names.push(item.name)
              dataList.push(15 + item.value * 1.25)
            })

            that.charts[3] = {
              title: that.charts[3].title,
              names: names,
              dataList: dataList,
              colorList: colorList2,
              barColorList: barColorList2
            }
          },
          function(err) {
            Http.get('src/common/json/top5_vm_memory_usage.json').then(function(
              res
            ) {
              var names = []
              var dataList = []

              res.data.json.map(function(item) {
                names.push(item.name)
                dataList.push(15 + item.value * 1.25)
              })

              that.charts[3] = {
                title: that.charts[3].title,
                names: names,
                dataList: dataList,
                colorList: colorList2,
                barColorList: barColorList2
              }
            })
          }
        )
      }

      reload()

      $interval(function() {
        reload()
      }, 30000)
    }
  ])
})(angular)

;(function(angular) {
  'use strict'

  angular.module('cloud-monitor.controllers').controller('LeftCtrl', [
    'Monitor',
    '$interval',
    'EChartsFactory',
    'URL_CFG',
    function(Monitor, $interval, EChartsFactory, URL_CFG) {
      var that = this

      that.charts = []

      var charts = [
        {
          type: 'gauge',
          id: 0,
          title: '系统健康度',
          dataSource: URL_CFG.api + 'systemstate/statistics',
          localSource: 'src/common/json/system_health.json',
          style: {
            height: '100%',
            width: '100%'
          }
        },
        {
          type: 'pie',
          id: 1,
          title: '主机状态',
          dataSource: URL_CFG.api + 'hoststate/statistics',
          localSource: 'src/common/json/host_state.json',
          style: {
            height: '100%',
            width: '100%'
          }
        },
        {
          type: 'pie',
          id: 3,
          title: '虚拟机状态',
          dataSource: URL_CFG.api + 'vm/statistics',
          localSource: 'src/common/json/vm_state.json',
          style: {
            height: '100%',
            width: '100%'
          }
        }
      ]

      function reload() {
        charts.map(function(chart) {
          var newChart = EChartsFactory(chart.type)

          _.merge(newChart, chart)
          newChart.update(chart)
          that.charts.push(newChart)
        })
      }

      reload()

      $interval(function() {
        reload()
      }, 30000)
    }
  ])
})(angular)

;(function(angular) {
  'use strict'

  angular.module('cloud-monitor.controllers').controller('MainCtrl', [
    '$interval',
    'Monitor',
    function($interval, Monitor) {
      var that = this
      that.data = []

      function equipData(n) {
        for (var i = 0, list = []; i < n; i++) {
          list[i] = Math.random() * 20 + 78
        }
        return list
      }

      function reload() {
        Monitor.hostHealth().then(
          function(res) {
            that.data = _.concat(
              res.data.json,
              equipData(32 - res.data.json.length)
            )
          },
          function(err) {
            that.data = equipData(32)
          }
        )
      }

      reload()

      $interval(function() {
        reload()
      }, 5000)
    }
  ])
})(angular)

;(function(angular) {
  'use strict'

  angular.module('cloud-monitor.controllers').controller('RightCtrl', [
    '$interval',
    'Monitor',
    'Http',
    function($interval, Monitor, Http) {
      var that = this

      that.detail = {
        disaster: 0,
        serious: 0,
        warning: 0,
        information: 0
      }

      that.usageList = [
        {
          title: 'CPU使用情况',
          color: '#58c84d',
          detail: {
            totalName: '总数',
            totalValue: 100,
            usageName: '已分配',
            usageValue: 0
          }
        },
        {
          title: '内存使用情况',
          color: '#ff9b0a',
          detail: {
            totalName: '总数',
            totalValue: 100,
            usageName: '已分配',
            usageValue: 0
          }
        },
        {
          title: '存储使用情况',
          color: '#09c8f4',
          detail: {
            totalName: '总数',
            totalValue: 100,
            usageName: '已分配',
            usageValue: 0
          }
        }
      ]

      function reload() {
        Monitor.alarm().then(
          function(res) {
            that.detail = {
              disaster: res.data.disaster,
              serious: res.data.serious,
              warning: res.data.warning,
              information: res.data.information
            }
          },
          function(err) {
            Http.get('src/common/json/alarm.json').then(function(res) {
              that.detail = res.data.data[0]
            })
          }
        )

        Monitor.hypervisors().then(
          function(res) {
            that.usageList[0].detail.totalValue = res.data.vcpus && 240
            that.usageList[0].detail.usageValue = res.data.vcpus_used

            that.usageList[1].detail.totalValue = res.data.memory_mb
            that.usageList[1].detail.usageValue = res.data.memory_mb_used

            that.usageList[2].detail.totalValue = res.data.local_gb
            that.usageList[2].detail.usageValue = res.data.local_gb_used
          },
          function(err) {
            Http.get('src/common/json/hypervisors.json').then(function(res) {
              that.usageList = res.data.data
            })
          }
        )
      }

      reload()

      $interval(function() {
        reload()
      }, 30000)
    }
  ])
})(angular)

;(function(angular) {
  'use strict'

  angular
    .module('cloud-monitor', [
      'ngAnimate',
      'ngRoute',
      'cloud-monitor.config',
      'cloud-monitor.routers',
      'cloud-monitor.directives',
      'cloud-monitor.services',
      'cloud-monitor.controllers'
    ])
    .config([
      '$httpProvider',
      function($httpProvider) {
        $httpProvider.defaults.useXDomain = true
        $httpProvider.defaults.withCredentials = true
      }
    ])
})(angular)
