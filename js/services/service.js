/**
 * Created by Donny on 17/3/22.
 */
(function (angular) {
  'use strict';

  angular.module('cloud-monitor.services', [])
    .factory('uuid', function () {
      var uuid = {};

      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }

      uuid.create = function () {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
          s4() + '-' + s4() + s4() + s4();
      };

      return uuid;
    })

    .factory('Http', ['$q', '$http', '$sce', function ($q, $http, $sce) {
      function parseParams(url, params) {
        var p = [];
        for (var key in params) {
          p.push(key + '=' + params[key]);
        }
        return url + p.join('&');
      }

      return {
        get: function (url) {
          var deferred = $q.defer();

          $http.get(url).then(function (res) {
            deferred.resolve(res);
          }, function (err) {
            deferred.reject(err);
          });

          return deferred.promise;
        },
        post: function (url, params) {
          var deferred = $q.defer();

          $http.post(url, params).then(function (res) {
            deferred.resolve(res);
          }, function (err) {
            deferred.reject(err);
          });

          return deferred.promise;
        },
        jsonp: function (url, params) {
          var deferred = $q.defer();
          var _url = parseParams(url, params);

          $http.jsonp($sce.trustAsResourceUrl(_url)).then(function (res) {
            deferred.resolve(res);
          }, function (err) {
            deferred.reject(err);
          });

          return deferred.promise;
        }
      };
    }])

    .factory('Monitor', ['Http', 'URL_CFG', function (Http, URL_CFG) {
      return {
        systemState: function () {
          return Http.get(URL_CFG.api + 'systemstate/statistics');
        },
        hostHealth: function () {
          return Http.get(URL_CFG.api + 'hosthealth/statistics/32');
        },
        hostState: function () {
          return Http.get(URL_CFG.api + 'hoststate/statistics');
        },
        vm: function () {
          return Http.get(URL_CFG.api + 'vm/statistics');
        },
        alarm: function () {
          return Http.get(URL_CFG.api + 'alarm/statistics');
        },
        hypervisors: function () {
          return Http.get(URL_CFG.api + 'hypervisors/statistics');
        },
        cpu: function () {
          return Http.get(URL_CFG.api + 'cpu/topn');
        },
        mem: function () {
          return Http.get(URL_CFG.api + 'mem/topn');
        },
        vm_cpu: function () {
          return Http.get(URL_CFG.api + 'vm_cpu/topn');
        },
        vm_mem: function () {
          return Http.get(URL_CFG.api + 'vm_mem/topn');
        },
        alarmDetail: function () {
          return Http.get(URL_CFG.api + 'alarm/details');
        }
      };
    }])

    .factory('EChartsFactory', ['Http', function (Http) {
      var eChart = {};
      eChart.type = {};

      // 柱状图
      eChart.type.bar = function () {
        this.update = function (where) {
          Http.get(this.dataSource).then(function (res) {
            var xAxisData = [];
            var series = [];
            var legendData = [];
            var option;
            var temp = {};

            res.data.y.map(function (_y) {
              temp[_y] = [];

              res.data.data.map(function (item) {
                temp[_y].push(item[_y]);
              });

              series.push({
                name: _y,
                type: 'bar',
                stack: '总量',
                data: temp[_y]
              });

              legendData.push(_y);
            });

            res.data.data.map(function (item) {
              xAxisData.push(item[res.data.x]);
            });

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
              xAxis: [{
                type: 'category',
                data: xAxisData,
                axisLabel: {
                  show: true,
                  textStyle: {
                    color: '#929292'
                  }
                }
              }],
              yAxis: [{
                type: 'value',
                axisLabel: {
                  show: true,
                  textStyle: {
                    color: '#929292'
                  }
                }
              }],
              series: series
            };

            this.data = option;
            return where.data = option;
          }.bind(this), function (err) {
            console.log(err);
          });
        };
      };

      // 折线图
      eChart.type.line = function () {
        this.update = function (where) {
          Http.get(this.dataSource).then(function (res) {
            var xAxisData = [];
            var series = [];
            var seriesData = [];
            var option;

            res.data.data.map(function (item) {
              xAxisData.push(item[res.data.x]);
              seriesData.push(item[res.data.y]);
            }.bind(this));

            series.push({
              name: '',
              type: 'line',
              data: seriesData
            });

            option = {
              tooltip: {
                trigger: 'axis',
                position: function (pt) {
                  return [pt[0], '10%'];
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
            };

            this.data = option;
            return where.push(this);
          }.bind(this), function (err) {
            console.log(err);
          });
        };
      };

      // 仪表盘
      eChart.type.gauge = function () {
        var that = this;

        that.update = function (where) {
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
            series: [{
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
                  color: [[0.2, '#ff9510'], [0.8, '#2483cf'], [1, '#57c550']]
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
            }]
          };

          Http.get(that.dataSource).then(function (res) {
            option.series[0].data = [{
              name: '系统健康度',
              value: res.data.systemstate
            }];

            that.data = option;
            return where.data = option;
          }, function (err) {
            Http.get(that.localSource).then(function (res) {
              option.series[0].data = res.data.data;

              that.data = option;
              return where.data = option;
            });
          });
        };
      };

      // 饼图
      eChart.type.pie = function () {
        var that = this,
          option = {
            color: ['#57c550', '#ff9510', '#f45938'],
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            series: [{
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
            }]
          };

        that.update = function (where) {
          Http.get(that.dataSource).then(function (res) {
            option.series[0].data = [{
              name: '运行',
              value: res.data.normal
            }, {
              name: '故障',
              value: res.data.abnormal
            }, {
              name: '停止',
              value: res.data.poweroff
            }];

            that.data = option;
            that.total = res.data.normal + res.data.abnormal + res.data.poweroff;
            that.normal = res.data.normal;
            that.abnormal = res.data.abnormal;
            that.poweroff = res.data.poweroff;
            return where.data = option;
          }, function (err) {
            Http.get(that.localSource).then(function (res) {
              res.data = res.data.data[0];

              option.series[0].data = [{
                name: '运行',
                value: res.data.normal
              }, {
                name: '故障',
                value: res.data.abnormal
              }, {
                name: '停止',
                value: res.data.poweroff
              }];

              that.data = option;
              that.total = res.data.normal + res.data.abnormal + res.data.poweroff;
              that.normal = res.data.normal;
              that.abnormal = res.data.abnormal;
              that.poweroff = res.data.poweroff;
              return where.data = option;
            });
          });
        };
      };

      // 地图
      eChart.type.map = function () {
        this.update = function (where) {

          Http.get(this.dataSource).then(function (res) {
            var series = [];
            var seriesData = [];

            res.data.y.map(function (_y) {
              seriesData = [];

              res.data.data.map(function (item) {
                seriesData.push({
                  name: item.country,
                  value: item[_y]
                });
              });

              series.push({
                name: _y,
                type: 'map',
                mapType: 'LHK', // 自定义扩展图表类型
                itemStyle: {
                  normal: { label: { show: true } },
                  emphasis: { label: { show: true } }
                },
                data: seriesData
              });
            });

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
            };

            this.data = option;
            return where.data = option;
          }.bind(this), function (err) {
            // console.log(err);
          });
        };
      };

      return function (type) {
        type = type.toLowerCase();
        return new eChart.type[type];
      };
    }]);

})(angular);
