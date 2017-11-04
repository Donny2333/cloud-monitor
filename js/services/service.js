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

    .factory('Now', function () {
      return {
        time: function () {
          var d = new Date();
          return [d.getHours(), d.getMinutes()].join(':');
        },
        date: function () {
          var d = new Date();
          return [d.getMonth() + 1, '月', d.getDate(), '日'].join('');
        },
        lunar: function () {
          var sWeek = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
          var dNow = new Date();
          var CalendarData = new Array(100);
          var madd = new Array(12);
          var tgString = "甲乙丙丁戊己庚辛壬癸";
          var dzString = "子丑寅卯辰巳午未申酉戌亥";
          var numString = "一二三四五六七八九十";
          var monString = "正二三四五六七八九十冬腊";
          var weekString = "日一二三四五六";
          var sx = "鼠牛虎兔龙蛇马羊猴鸡狗猪";
          var cYear, cMonth, cDay, TheDate;
          CalendarData = new Array(0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5, 0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D, 0x2192B, 0xA95, 0x71695, 0x6CA, 0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA, 0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B,
            0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957, 0x5092F,
            0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A, 0x7155B, 0x25D, 0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 0x60A57, 0x52B, 0xA93, 0x40E95);
          madd[0] = 0;
          madd[1] = 31;
          madd[2] = 59;
          madd[3] = 90;
          madd[4] = 120;
          madd[5] = 151;
          madd[6] = 181;
          madd[7] = 212;
          madd[8] = 243;
          madd[9] = 273;
          madd[10] = 304;
          madd[11] = 334;

          function GetBit(m, n) {
            return (m >> n) & 1;
          }

          function e2c() {
            TheDate = (arguments.length != 3) ? new Date() : new Date(arguments[0], arguments[1], arguments[2]);
            var total, m, n, k;
            var isEnd = false;
            var tmp = TheDate.getFullYear();
            total = (tmp - 1921) * 365 + Math.floor((tmp - 1921) / 4) + madd[TheDate.getMonth()] + TheDate.getDate() - 38;
            if (TheDate.getYear() % 4 == 0 && TheDate.getMonth() > 1) {
              total++;
            }
            for (m = 0; ; m++) {
              k = (CalendarData[m] < 0xfff) ? 11 : 12;
              for (n = k; n >= 0; n--) {
                if (total <= 29 + GetBit(CalendarData[m], n)) {
                  isEnd = true;
                  break;
                }
                total = total - 29 - GetBit(CalendarData[m], n);
              }
              if (isEnd) break;
            }
            cYear = 1921 + m;
            cMonth = k - n + 1;
            cDay = total;
            if (k == 12) {
              if (cMonth == Math.floor(CalendarData[m] / 0x10000) + 1) {
                cMonth = 1 - cMonth;
              }
              if (cMonth > Math.floor(CalendarData[m] / 0x10000) + 1) {
                cMonth--;
              }
            }
          }

          function GetcDateString() {
            var tmp = "";
            // tmp += tgString.charAt((cYear - 4) % 10);
            // tmp += dzString.charAt((cYear - 4) % 12);
            // tmp += "年 ";
            if (cMonth < 1) {
              tmp += "(闰)";
              tmp += monString.charAt(-cMonth - 1);
            } else {
              tmp += monString.charAt(cMonth - 1);
            }
            tmp += "月";
            tmp += (cDay < 11) ? "初" : ((cDay < 20) ? "十" : ((cDay < 30) ? "廿" : "三十"));
            if (cDay % 10 != 0 || cDay == 10) {
              tmp += numString.charAt((cDay - 1) % 10);
            }
            return tmp;
          }

          function GetLunarDay(solarYear, solarMonth, solarDay) {
            if (solarYear < 1921 || solarYear > 2020) {
              return "";
            } else {
              solarMonth = (parseInt(solarMonth) > 0) ? (solarMonth - 1) : 11;
              e2c(solarYear, solarMonth, solarDay);
              return GetcDateString();
            }
          }

          var D = new Date();
          var yy = D.getFullYear();
          var mm = D.getMonth() + 1;
          var dd = D.getDate();

          function getFullYear(d) { // 修正firefox下year错误
            var yr = d.getYear();
            if (yr < 1000)
              yr += 1900;
            return yr;
          }

          return GetLunarDay(yy, mm, dd);
        }
      }
    })

    .factory('Http', ["$q", "$http", '$sce', function ($q, $http, $sce) {
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
      }
    }])

    .factory('Route', ['$http', 'Http', 'LEADOR_API_URL', 'LEADOR_AK', function ($http, Http, LEADOR_API_URL, LEADOR_AK) {
      var url = LEADOR_API_URL;
      return {
        drive: function (params) {
          $http.defaults.jsonpCallbackParam = 'callback';
          angular.extend(params, {
            coord_type: 'gcj02',
            tactics: 5, // 0:费用优先，2:国道优先，4:省道优先，5:不走高速，6:多策略1，10:不走快速路，11:速度优先，12:距离优先
            ak: LEADOR_AK,
            output: 'json'
          });
          return Http.jsonp(url + '/route/car?', params);
        }
      }
    }])

    .factory('FullFeatures', ['$http', 'Http', 'URL_CFG', function ($http, Http, URL_CFG) {
      var url = URL_CFG.featureQuery;

      return {
        query: function (params) {
          var callback = $http.defaults.jsonpCallbackParam;
          $http.defaults.jsonpCallbackParam = 'jsoncallback';
          return Http.jsonp(url + '/Query?', params).then(function (res) {
            $http.defaults.jsonpCallbackParam = callback;
            return res;
          }, function (err) {
            $http.defaults.jsonpCallbackParam = callback;
            return err;
          })
        }
      }
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
                  color: "#929292"
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
        }
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
              name: "",
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
                data: ""
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
        }
      };

      // 仪表盘
      eChart.type.gauge = function () {
        this.update = function (where) {
          Http.get(this.dataSource).then(function (res) {
            var option = {
              tooltip: {
                formatter: "{a} <br/>{b} : {c}%"
              },
              toolbox: {
                feature: {
                  restore: {},
                  saveAsImage: {}
                },
                show: false
              },
              series: [{
                name: '贫困率',
                type: 'gauge',
                detail: {formatter: '{value}%'},
                data: [{
                  name: res.data.data[0][this.x],
                  value: res.data.data[0][this.y]
                }]
              }]
            };

            this.data = option;
            return where.data = option;
          }.bind(this), function (err) {
            console.log(err);
          });
        }
      };

      // 饼图
      eChart.type.pie = function () {
        this.update = function (where) {

          Http.get(this.dataSource).then(function (res) {
            var seriesData = [];

            res.data.data.map(function (item) {
              seriesData.push({
                name: item[res.data.x],
                value: item[res.data.y]
              });
            }.bind(this));

            var option = {
              tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              visualMap: {
                show: false,
                min: 0,
                max: 200,
                inRange: {
                  colorLightness: [0, 1]
                }
              },
              series: [{
                name: '销量',
                type: 'pie',
                radius: '55%',
                center: ['50%', '50%'],
                data: seriesData.sort(function (a, b) {
                  return a.value - b.value
                }),
                roseType: 'angle',
                label: {
                  normal: {
                    textStyle: {
                      color: 'rgba(255, 255, 255, 0.3)'
                    }
                  }
                },
                labelLine: {
                  normal: {
                    lineStyle: {
                      color: 'rgba(255, 255, 255, 0.3)'
                    },
                    smooth: 0.2,
                    length: 10,
                    length2: 20
                  }
                },
                itemStyle: {
                  normal: {
                    color: '#c23531',
                    shadowBlur: 200,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                },
                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                  return Math.random() * 200;
                }
              }]
            };

            this.data = option;
            return where.data = option;
          }.bind(this), function (err) {
            console.log(err);
          });
        }
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
                  normal: {label: {show: true}},
                  emphasis: {label: {show: true}}
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
                  color: "#929292"
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
                  dataView: {readOnly: false},
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
            console.log(err);
          });
        }
      };

      return function (type) {
        return new eChart.type[type];
      };
    }])

})(angular);
