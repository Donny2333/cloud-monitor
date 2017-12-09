(function (angular) {
  'use strict';

  angular.module('cloud-monitor', [
    'ngAnimate',
    'ngRoute',
    'cloud-monitor.config',
    'cloud-monitor.routers',
    'cloud-monitor.directives',
    'cloud-monitor.services',
    'cloud-monitor.controllers'
  ]).config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;
  }]);
})(angular);

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

})(angular);

/**
 * Created by Donny on 17/3/22.
 */
(function (angular) {
  'use strict';

  angular.module('cloud-monitor.directives', [])
    .directive('myChart', function () {
      return {
        restrict: 'E',
        template: '<div ng-style="myStyle"></div>',
        replace: true,
        transclude: true,
        scope: {
          data: '=',
          myStyle: '='
        },
        link: function (scope, element, attrs) {
          var myChat = null;

          if (scope.data) {
            // 基于准备好的dom，初始化echarts实例
            myChat = echarts.init(element[0]);

            // 使用刚指定的配置项和数据显示图表
            myChat.setOption(scope.data);
          }

          //监听DOM元素
          scope.$watch('data', function (value) {
            if (value && value.hasOwnProperty('series')) {
              if (!myChat) {
                // echarts实例未准备好
                myChat = echarts.init(element[0]);
              }

              if (value.series) {
                myChat.setOption(scope.data, true);
              }
            }
          });

          scope.$watch('myStyle', function (value) {
            if (value && myChat) {
              myChat.resize();
            }
          })
        }
      };
    })

    .directive('house', ['$timeout', function ($timeout) {
      return {
        restrict: 'E',
        template: '<svg id="house" width="188" height="176"> \
                    <path fill-rule="evenodd" stroke-width="1px" stroke="rgb(211, 243, 251)" fill="none" d="M180.715,172.500 L176.696,172.500 L146.090,172.500 L146.030,172.500 L144.529,172.500 L141.246,172.500 L141.246,105.897 L144.075,106.897 L144.075,106.907 L184.506,121.163 L184.506,172.500 L180.715,172.500 ZM155.713,120.842 L146.025,117.702 L146.025,130.312 L155.713,133.102 L155.713,120.842 ZM155.713,138.595 L146.025,135.964 L146.025,148.569 L155.713,150.859 L155.713,138.595 ZM146.025,154.227 L146.025,161.399 L155.713,164.194 L155.713,156.362 L146.025,154.227 ZM168.680,125.041 L159.723,122.142 L159.723,134.263 L168.680,136.841 L168.680,125.041 ZM168.680,142.128 L159.723,139.688 L159.723,151.808 L168.680,153.923 L168.680,142.128 ZM159.723,157.244 L159.723,165.351 L168.680,167.935 L168.680,159.214 L159.723,157.244 ZM180.715,128.940 L172.405,126.248 L172.405,137.909 L180.715,140.307 L180.715,128.940 ZM180.715,145.402 L172.405,143.144 L172.405,154.810 L180.715,156.770 L180.715,145.402 ZM172.405,160.039 L172.405,169.009 L180.715,171.406 L180.715,161.870 L172.405,160.039 ZM95.146,3.500 L137.189,27.258 L137.189,172.500 L95.146,172.500 L95.146,3.500 ZM91.217,163.345 L91.217,172.500 L40.751,172.500 L4.482,172.500 L4.482,157.760 L4.482,84.730 L38.378,72.829 L38.378,72.824 L40.751,71.991 L40.751,147.871 L43.456,147.215 L43.456,23.294 L87.390,5.818 L87.390,5.808 L90.467,4.586 L90.467,136.991 L91.063,157.760 L91.217,157.760 L91.217,163.162 L91.223,163.345 L91.217,163.345 ZM60.641,90.898 L60.641,105.365 L70.380,103.906 L70.380,89.047 L60.641,90.898 ZM70.380,82.386 L70.380,67.530 L60.641,69.954 L60.641,84.416 L70.380,82.386 ZM60.641,111.848 L60.641,126.315 L70.380,125.422 L70.380,110.564 L60.641,111.848 ZM60.641,132.798 L60.641,143.050 L70.380,140.690 L70.380,132.081 L60.641,132.798 ZM14.631,88.972 L7.665,91.218 L7.665,100.708 L14.631,98.712 L14.631,88.972 ZM14.631,103.081 L7.665,104.968 L7.665,114.458 L14.631,112.818 L14.631,103.081 ZM14.631,117.191 L7.665,118.718 L7.665,128.208 L14.631,126.929 L14.631,117.191 ZM14.631,131.297 L7.665,132.468 L7.665,141.957 L14.631,141.029 L14.631,131.297 ZM14.631,145.402 L7.665,146.207 L7.665,155.697 L8.850,155.602 L14.631,154.201 L14.631,145.402 ZM25.258,85.547 L17.744,87.969 L17.744,97.820 L25.258,95.664 L25.258,85.547 ZM25.258,100.198 L17.744,102.235 L17.744,112.085 L25.258,110.322 L25.258,100.198 ZM25.258,124.969 L25.258,114.855 L17.744,116.500 L17.744,126.351 L25.258,124.974 L25.258,124.969 ZM25.258,129.507 L17.744,130.776 L17.744,140.622 L25.258,139.626 L25.258,129.507 ZM25.258,144.165 L17.744,145.036 L17.744,153.447 L25.258,151.626 L25.258,144.165 ZM36.740,81.845 L28.621,84.465 L28.621,94.694 L36.740,92.373 L36.740,81.845 ZM36.740,97.087 L28.621,99.290 L28.621,109.527 L36.740,107.619 L36.740,97.087 ZM36.740,112.333 L28.621,114.117 L28.621,124.355 L36.740,122.865 L36.740,112.333 ZM36.740,127.578 L28.621,128.940 L28.621,139.183 L36.740,138.110 L36.740,127.578 ZM36.740,142.824 L28.621,143.773 L28.621,150.811 L36.740,148.843 L36.740,142.824 ZM56.608,29.527 L47.575,32.828 L47.575,46.766 L56.608,43.831 L56.608,29.527 ZM56.608,50.237 L47.575,53.012 L47.575,66.950 L56.608,64.541 L56.608,50.237 ZM56.608,70.955 L47.575,73.198 L47.575,87.136 L56.608,85.256 L56.608,70.955 ZM56.608,91.672 L47.575,93.384 L47.575,107.325 L56.608,105.974 L56.608,91.672 ZM56.608,112.385 L47.575,113.571 L47.575,127.511 L56.608,126.681 L56.608,112.385 ZM56.608,133.097 L47.575,133.762 L47.575,146.217 L56.608,144.028 L56.608,133.097 ZM70.380,24.496 L60.641,28.052 L60.641,42.519 L70.380,39.352 L70.380,24.496 ZM70.386,46.010 L60.646,48.999 L60.646,63.466 L70.380,60.872 L70.386,60.872 L70.386,46.010 ZM85.267,19.057 L74.742,22.902 L74.742,37.936 L85.267,34.515 L85.267,19.057 ZM85.267,41.444 L74.742,44.675 L74.742,59.709 L85.267,56.903 L85.267,41.444 ZM85.267,63.827 L74.742,66.447 L74.742,81.481 L85.267,79.284 L85.267,63.827 ZM85.267,86.215 L74.742,88.216 L74.742,103.251 L85.267,101.673 L85.267,86.215 ZM85.267,108.609 L74.742,109.992 L74.742,125.020 L85.267,124.061 L85.267,108.609 ZM85.267,130.993 L74.742,131.766 L74.742,139.633 L85.267,137.082 L85.267,130.993 Z" /> \
                </svg>',
        replace: true,
        link: function (scope, element, attrs) {
          var path = document.querySelector('#house path');
          var length = path.getTotalLength();
          // 清除之前的动作
          path.style.transition = path.style.WebkitTransition = 'none';
          // 设置起始点
          path.style.strokeDasharray = length + ' ' + length;
          path.style.strokeDashoffset = length;
          // 获取一个区域，获取相关的样式，让浏览器寻找一个起始点。
          path.getBoundingClientRect();
          // 定义动作
          path.style.transition = path.style.WebkitTransition = 'stroke-dashoffset 5s ease-in-out 0.25s';
          // Go!
          path.style.strokeDashoffset = '0';
        }
      }
    }])

    .directive('clock', ['$timeout', 'Now', function ($timeout, Now) {
      return {
        restrict: 'E',
        template: '<div class="clock"> \
                    <svg width="340" height="150"> \
                    <path id="sun" fill-rule="evenodd" fill="rgb(255, 243, 110)" d="M13.285,69.654 C12.647,69.654 12.012,69.404 11.527,68.908 C10.557,67.913 10.557,66.297 11.527,65.302 L20.022,56.584 C20.992,55.593 22.565,55.593 23.535,56.584 C24.505,57.584 24.505,59.196 23.535,60.191 L15.042,68.908 C14.555,69.404 13.920,69.654 13.285,69.654 ZM43.926,49.526 C35.633,48.738 31.992,56.639 31.090,56.639 C30.708,56.639 30.320,56.553 29.958,56.358 C24.132,53.290 20.937,48.238 20.298,41.559 C19.265,30.769 26.978,21.130 37.491,20.070 C41.196,19.696 44.894,20.426 48.187,22.182 C51.390,23.890 53.383,25.703 55.213,28.889 C55.909,30.101 55.479,30.644 54.298,31.358 C54.298,31.358 43.032,37.346 43.926,49.526 ZM14.502,42.913 L2.490,42.913 C1.118,42.913 0.006,41.773 0.006,40.364 C0.006,38.957 1.118,37.815 2.490,37.815 L14.502,37.815 C15.875,37.815 16.988,38.957 16.988,40.364 C16.988,41.773 15.875,42.913 14.502,42.913 ZM56.908,24.890 C56.273,24.890 55.637,24.642 55.150,24.144 C54.180,23.147 54.180,21.532 55.150,20.537 L63.645,11.820 C64.615,10.824 66.190,10.824 67.161,11.820 C68.131,12.815 68.131,14.431 67.161,15.427 L58.666,24.144 C58.181,24.642 57.545,24.890 56.908,24.890 ZM21.777,24.890 C21.142,24.890 20.507,24.642 20.022,24.144 L11.527,15.427 C10.557,14.431 10.557,12.817 11.527,11.820 C12.497,10.824 14.070,10.824 15.040,11.820 L23.535,20.537 C24.505,21.532 24.505,23.147 23.535,24.144 C23.050,24.642 22.415,24.890 21.777,24.890 ZM39.344,17.423 C37.970,17.423 36.858,16.282 36.858,14.874 L36.858,2.546 C36.858,1.139 37.970,-0.003 39.344,-0.003 C40.715,-0.003 41.828,1.139 41.828,2.546 L41.828,14.874 C41.828,16.282 40.715,17.423 39.344,17.423 Z" /> \
                    <path id="cloud" fill-rule="evenodd" fill="rgb(255, 255, 255)" d="M97.047,88.002 L47.261,88.002 C37.912,88.002 30.305,80.195 30.305,70.603 C30.305,61.175 37.647,53.477 46.772,53.212 C47.003,39.814 57.696,28.991 70.801,28.991 C76.280,28.991 81.442,30.833 85.726,34.319 C89.233,37.173 91.907,41.006 93.418,45.293 C94.612,45.078 95.826,44.970 97.047,44.970 C108.608,44.970 118.012,54.625 118.012,66.484 C118.012,78.352 108.608,88.002 97.047,88.002 Z" /> \
                    <text font-family="Microsoft YaHei" fill="rgb(254, 255, 255)" font-size="30px" x="150" y="82"> \
                        <tspan dy="-30" fill="rgb(254, 255, 255)" font-size="30px">北风4～5级</tspan> \
                        <tspan x="150" dy="30" fill="#fff36e" font-size="14px">28℃&#32;&#32;&#32;多云转小雨</tspan> \
                    </text> \
                    <text font-family="Microsoft YaHei" fill="rgb(254, 255, 255)" font-size="38px" x="5" y="140"> \
                        <tspan>{{vm.dateTime.time}}</tspan> \
                        <tspan x="150" font-size="24px">{{vm.dateTime.date}}</tspan> \
                        <tspan x="280" font-size="14px">{{vm.dateTime.nongli}}</tspan> \
                    </text> \
                </svg> \
            </div>',
        scope: {},
        replace: true,
        link: function (scope, element, attrs) {
          var vm = scope.vm = {
            dateTime: {
              time: Now.time(),
              date: Now.date(),
              nongli: Now.lunar()
            }
          };

          setInterval(function () {
            vm.dateTime.time = Now.time();
          }, 60000);

          var sun = document.getElementById('sun');
          var cloud = document.getElementById('cloud');

          sun.style.transition = sun.style.WebkitTransition = 'none';
          sun.style.transition = sun.style.WebkitTransition = 'transform 0.5s ease-in-out 0.5s';
          cloud.style.transition = cloud.style.WebkitTransition = 'transform 0.5s ease-in-out 0.5s';
          sun.style.transform = 'translate(16px, 16px)';
          cloud.style.transform = 'translate(-12px, 0)';

          $timeout(function () {
            sun.style.transform = 'none';
            cloud.style.transform = 'none';
          }, 500);
        }
      }
    }])

    .directive('levelBar', ['$timeout', function ($timeout) {
      return {
        restrict: 'E',
        template: '<svg class="lvlBar"></svg>',
        // template: '<svg class="lvlBar"> \
        //                 <path fill="rgb(239, 134, 69)" d="M245,0L267,0L267,24L256,30L245,24Z"/> \
        //                 <text x="256" y="18" fill="white" style="text-anchor: middle;font-size: 14px">3</text> \
        //             </svg>',
        replace: true,
        link: function (scope, element, attrs) {
          var level = attrs.level;
          var h = 24;
          var w = 22;
          var t = 6;
          var x0 = 76;
          var delta = 90;
          var lvlBar = d3.select(element[0]);
          var linePath = d3.line().curve(d3.curveLinearClosed);
          var colorlist = [
            "#74ae45",
            "#e3b649",
            "#ef8645",
            "#f25057"
          ];

          scope.$watch(attrs.level, function (value) {
            level = value;
            drawsvg();
          });

          function drawBar(barset) {
            var updateBar = lvlBar.selectAll("path")
              .data(barset);
            var enterBar = updateBar.enter();
            var exitBar = updateBar.exit();

            updateBar.transition()
              .duration(1000)
              .ease(d3.easeElastic)
              .attr("fill", function (d) {
                return colorlist[d];
              })
              .attr("d", function (d) {
                var lines = drawLines(d);
                return linePath(lines);
              });

            enterBar.append("path")
              .attr("fill", function (d) {
                return colorlist[d];
              })
              .attr("d", function (d) {
                var lines = drawLines(d);
                return linePath(lines);
              });

            exitBar.remove();
          }

          function drawLines(d) {
            return [
              [x0 + delta * d - w / 2, 0],
              [x0 + delta * d + w / 2, 0],
              [x0 + delta * d + w / 2, h],
              [x0 + delta * d, h + t],
              [x0 + delta * d - w / 2, h]
            ];
          }

          function drawText(textset) {
            var updateText = lvlBar.selectAll("text")
              .data(textset);
            var enterText = updateText.enter();
            var exitText = updateText.exit();

            updateText.transition()
              .duration(1000)
              .ease(d3.easeElastic)
              .attr("x", function (d) {
                return x0 + delta * d;
              })
              .attr("y", function (d) {
                return 18;
              })
              .attr("fill", "white")
              .style("text-anchor", "middle")
              .style("font-size", "14px")
              .text(function (d) {
                return d + 1;
              });

            enterText.append("text")
              .attr("x", function (d) {
                return x0 + delta * d;
              })
              .attr("y", function (d) {
                return 18;
              })
              .attr("fill", "white")
              .style("text-anchor", "middle")
              .style("font-size", "14px")
              .text(function (d) {
                return d + 1;
              });

            exitText.remove();
          }

          function drawsvg() {
            drawBar([level]);
            drawText([level]);

            $timeout(function () {
              level = (level + 1) % 4;
              drawsvg();
            }, 3000);
          }
        }
      }
    }])

    .directive('barGraph', ['$timeout', '$parse', function ($timeout, $parse) {
      return {
        restrict: 'E',
        template: '<svg class="area" width="325px" height="168px"> \
                        <defs> \
                            <linearGradient id="mygrad_0" x1="0%" x2="0%" y1="100%" y2="0%"> \
                                <stop offset="0%" stop-color="rgb(227,182,73)" stop-opacity="1" /> \
                                <stop offset="100%" stop-color="rgb(242,80,87)" stop-opacity="1" /> \
                            </linearGradient> \
                        </defs> \
                        <text id="text_x" font-family="Microsoft YaHei" fill="rgb(75, 112, 140)" font-size="12px" x="200" y="165" style="text-anchor: middle"> \
                        </text> \
                        <text id="text_y" font-family="Microsoft YaHei" fill="rgb(75, 112, 140)" font-size="14px" x="10" y="12" style="text-anchor: middle"> \
                        </text> \
                        <path fill-rule="evenodd" fill="rgb(21, 61, 88)" d="M31,141 L323,141 C323.552,141 324,141.448 324,142 C324,142.552 323.552,143 323,143 L31,143 C30.448,143 30,142.552 30,142 C30,141.448 30.448,141 31,141 Z" /> \
                        <path fill-rule="evenodd" fill="rgb(21, 61, 88)" d="M323,75 L31,75 C30.448,75 30,74.776 30,74.500 C30,74.224 30.448,74 31,74 L323,74 C323.552,74 324,74.224 324,74.500 C324,74.776 323.552,75 323,75 ZM323,41 L31,41 C30.448,41 30,40.776 30,40.500 C30,40.224 30.448,40 31,40 L323,40 C323.552,40 324,40.224 324,40.500 C324,40.776 323.552,41 323,41 ZM323,6 L31,6 C30.448,6 30,5.776 30,5.500 C30,5.224 30.448,5 31,5 L323,5 C323.552,5 324,5.224 324,5.500 C324,5.776 323.552,6 323,6 ZM31,107 L323,107 C323.552,107 324,107.224 324,107.500 C324,107.776 323.552,108 323,108 L31,108 C30.448,108 30,107.776 30,107.500 C30,107.224 30.448,107 31,107 Z" /> \
                    </svg>',
        replace: true,
        link: function (scope, element, attrs) {
          var svg = d3.select(element[0]);
          var text_x = svg.selectAll("#text_x");
          var text_y = svg.selectAll("#text_y");

          var data = JSON.parse(attrs.data);
          var x0 = 68;
          var rectStep = 216 / (data.length - 1);
          var rectWidth = 30;

          scope.$watch(function () {
            return attrs.data;
          }, function (value) {
            data = JSON.parse(value);
            rectStep = 216 / (data.length - 1);
            drawsvg();
          });

          function drawBar() {
            var updateBar = svg.selectAll("rect").data(data);
            var enterBar = updateBar.enter();
            var exitBar = updateBar.exit();

            updateBar.attr("x", function (d, i) {
              return x0 + rectStep * i - rectWidth / 2;
            })
              .attr("y", function (d, i) {
                return 141;
              })
              .attr("width", function (d, i) {
                return rectWidth;
              })
              .transition()
              .duration(1000)
              .ease(d3.easeCubicOut)
              .attr("height", function (d) {
                return 136 * d.value / 40;
              })
              .style("transform", function (d) {
                return "translate(0, -" + 136 * d.value / 40 + "px)";
              })
              .attr("fill", "url(#mygrad_0)");

            enterBar.append("rect")
              .attr("x", function (d, i) {
                return x0 + rectStep * i - rectWidth / 2;
              })
              .attr("y", function (d, i) {
                // return 136 - 136 * d.value / 40 + 6;
                return 141;
              })
              .attr("width", function (d, i) {
                return rectWidth;
              })
              .transition()
              .duration(1000)
              .ease(d3.easeCubicOut)
              .attr("height", function (d) {
                return 136 * d.value / 40;
              })
              .style("transform", function (d) {
                return "translate(0, -" + 136 * d.value / 40 + "px)";
              })
              .attr("fill", "url(#mygrad_0)");

            exitBar.remove();
          }

          function drawText() {
            // legend of x
            var updateTextX = text_x.selectAll("tspan")
              .data(data);
            var enterTextX = updateTextX.enter();
            var exitTextX = updateTextX.exit();

            updateTextX.attr("x", function (d, i) {
              return x0 + rectStep * i;
            })
              .text(function (d) {
                return d.name;
              });

            enterTextX.append("tspan")
              .attr("x", function (d, i) {
                return x0 + rectStep * i;
              })
              .text(function (d) {
                return d.name;
              });

            exitTextX.remove();

            // legend of y
            var updateTextY = text_y.selectAll("tspan")
              .data(data);
            var enterTextY = updateTextY.enter();
            var exitTextY = updateTextY.exit();

            updateTextY.attr("x", function (d) {
              return 10;
            })
              .attr("dy", function (d, i) {
                return i === 0 ? 0 : 34;
              })
              .text(function (d, i) {
                return (data.length - i - 1) * 2;
              });

            enterTextY.append("tspan")
              .attr("x", function (d) {
                return 10;
              })
              .attr("dy", function (d, i) {
                return i === 0 ? 0 : 34;
              })
              .text(function (d, i) {
                return (data.length - i - 1) * 2;
              });

            exitTextY.remove();
          }

          function drawsvg() {
            drawBar();
            drawText();
          }
        }
      }
    }])

})(angular);

(function (angular) {
  'use strict';

  angular.module('cloud-monitor.routers', ['ui.router'])
    .config(['$urlRouterProvider', '$locationProvider', '$stateProvider',
      function ($urlRouterProvider, $locationProvider, $stateProvider) {
        $urlRouterProvider.otherwise('/app');
        // $locationProvider.html5Mode(true);

        $stateProvider
          .state('app', {
            abstract: true,
            templateUrl: 'src/js/components/app/App.html',
            controller: 'AppCtrl'

          })
          .state('app.home', {
            url: '/app',
            views: {
              left: {
                templateUrl: 'src/js/components/left/Left.html',
                controller: 'LeftCtrl',
                controllerAs: 'LeftCtrl'
              },
              main: {
                templateUrl: 'src/js/components/main/Main.html',
                controller: 'MainCtrl',
                controllerAs: 'MainCtrl'
              },
              right: {
                templateUrl: 'src/js/components/right/Right.html',
                controller: 'RightCtrl',
                controllerAs: 'RightCtrl'
              },
              bottom: {
                templateUrl: 'src/js/components/bottom/Bottom.html',
                controller: 'BottomCtrl',
                controllerAs: 'BottomCtrl'
              }
            }
          })
      }]);
})(angular);

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
      }
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
        }
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
            })
          });
        }
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
            // console.log(err);
          });
        }
      };

      return function (type) {
        type = type.toLowerCase();
        return new eChart.type[type];
      };
    }])

})(angular);

(function (angular) {
  'use strict';

  angular.module('cloud-monitor.controllers', [])
    .controller('AppCtrl', ['$scope', '$http', '$timeout', 'URL_CFG',
      function ($scope, $http, $timeout, URL_CFG) {
        var SEPARATION = 80,
          AMOUNTX = 60,
          AMOUNTY = 25;

        var container;
        var camera, scene, renderer;

        var particles, particle, count = 0;

        var windowHalfX = window.innerWidth / 2;
        var windowHalfY = window.innerHeight / 2;

        init();
        animate();

        function init() {
          container = document.createElement('div');
          container.className = 'wave';
          document.body.appendChild(container);

          camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
          camera.position.x = 0;
          camera.position.y = 500;
          camera.position.z = 1500;

          scene = new THREE.Scene();

          particles = [];

          var PI2 = Math.PI * 2;
          var material = new THREE.SpriteCanvasMaterial({
            color: new THREE.Color(0x3399cc),
            opacity: 0.5,
            program: function (context) {
              context.beginPath();
              context.arc(0, 0, 0.5, 0, PI2, true);
              context.fill();
            }
          });

          var i = 0;

          for (var ix = 0; ix < AMOUNTX; ix++) {
            for (var iy = 0; iy < AMOUNTY; iy++) {
              particle = particles[i++] = new THREE.Sprite(material);
              particle.position.x = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2);
              particle.position.z = iy * SEPARATION - ((AMOUNTY * SEPARATION) / 2);
              scene.add(particle);
            }
          }

          renderer = new THREE.CanvasRenderer({alpha: true});
          renderer.setPixelRatio(window.devicePixelRatio);
          renderer.setSize(window.innerWidth, window.innerHeight);

          container.appendChild(renderer.domElement);

          window.addEventListener('resize', onWindowResize, false);
        }

        function onWindowResize() {
          windowHalfX = window.innerWidth / 2;
          windowHalfY = window.innerHeight / 2;

          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();

          renderer.setSize(window.innerWidth, window.innerHeight);
        }

        function animate() {
          requestAnimationFrame(animate);
          render();
        }

        function render() {
          camera.lookAt(scene.position);

          var i = 0;
          for (var ix = 0; ix < AMOUNTX; ix++) {
            for (var iy = 0; iy < AMOUNTY; iy++) {
              particle = particles[i++];
              particle.position.y = (Math.sin((ix + count) * 0.3) * 50) +
                (Math.sin((iy + count) * 0.5) * 50);
              particle.scale.x = particle.scale.y = (Math.sin((ix + count) * 0.3) + 1) * 4 +
                (Math.sin((iy + count) * 0.5) + 1) * 4;
            }
          }

          renderer.render(scene, camera);

          count += 0.01;
        }
      }])
})(angular);

(function (angular) {
  'use strict';

  angular.module('cloud-monitor.controllers')
    .controller('BottomCtrl', ['$interval', 'Monitor', 'Http', function ($interval, Monitor, Http) {
      var that = this;

      var colorList1 = ['#F7F7F8', '#AEADB3', '#D8D9DD'],
        colorList2 = ['#0EC17C', '#C085C6', '#F47F73', '#F7B686', '#8FBAE5'],
        barColorList1 = [
          ['#0EC17C', '#007552', '#029363'],
          ['#BF97C4', '#8B518E', '#A068A5'],
          ['#F47F73', '#F45938', '#EA6853'],
          ['#F7B686', '#FFA040', '#FFAF66'],
          ['#8FBAE5', '#638AC1', '#759FD1']
        ],
        barColorList2 = ['#007552', '#8B518E', '#F45938', '#FFA040', '#638AC1'];

      that.charts = [{
        title: 'TOP 5 主机CPU利用率',
        names: ['主机一', '主机二', '主机三', '主机四', '主机五'],
        dataList: [30, 30, 30, 30, 30],
        colorList: colorList1,
        barColorList: barColorList1
      }, {
        title: 'TOP 5 主机内存利用率',
        names: ['主机一', '主机二', '主机三', '主机四', '主机五'],
        dataList: [15, 15, 15, 15, 15],
        colorList: colorList2,
        barColorList: barColorList2
      }, {
        title: 'TOP 5 虚拟机CPU利用率',
        names: ['虚拟机一', '虚拟机二', '虚拟机三', '虚拟机四', '虚拟机五'],
        dataList: [30, 30, 30, 30, 30],
        colorList: colorList1,
        barColorList: barColorList1
      }, {
        title: 'TOP 5 虚拟机内存利用率',
        names: ['虚拟机一', '虚拟机二', '虚拟机三', '虚拟机四', '虚拟机五'],
        dataList: [15, 15, 15, 15, 15],
        colorList: colorList2,
        barColorList: barColorList2
      }];

      function reload() {
        Monitor.cpu().then(function (res) {
          var names = [];
          var dataList = [];

          res.data.json.map(function (item) {
            names.push(item.name);
            dataList.push(30 + item.value * 1.2);
          });

          that.charts[0] = {
            title: that.charts[0].title,
            names: names,
            dataList: dataList,
            colorList: colorList1,
            barColorList: barColorList1
          }
        }, function (err) {
          Http.get('src/json/top5_cpu_usage.json').then(function (res) {
            var names = [];
            var dataList = [];

            res.data.json.map(function (item) {
              names.push(item.name);
              dataList.push(30 + item.value * 1.2);
            });

            that.charts[0] = {
              title: that.charts[0].title,
              names: names,
              dataList: dataList,
              colorList: colorList1,
              barColorList: barColorList1
            }
          })
        });

        Monitor.mem().then(function (res) {
          var names = [];
          var dataList = [];

          res.data.json.map(function (item) {
            names.push(item.name);
            dataList.push(15 + item.value * 1.25);
          });

          that.charts[1] = {
            title: that.charts[1].title,
            names: names,
            dataList: dataList,
            colorList: colorList2,
            barColorList: barColorList2
          }
        }, function (err) {
          Http.get('src/json/top5_memory_usage.json').then(function (res) {
            var names = [];
            var dataList = [];

            res.data.json.map(function (item) {
              names.push(item.name);
              dataList.push(15 + item.value * 1.25);
            });

            that.charts[1] = {
              title: that.charts[1].title,
              names: names,
              dataList: dataList,
              colorList: colorList2,
              barColorList: barColorList2
            }
          });
        });

        Monitor.vm_cpu().then(function (res) {
          var names = [];
          var dataList = [];

          res.data.json.map(function (item) {
            names.push(item.name);
            dataList.push(30 + item.value * 1.2);
          });

          that.charts[2] = {
            title: that.charts[2].title,
            names: names,
            dataList: dataList,
            colorList: colorList1,
            barColorList: barColorList1
          }
        }, function (err) {
          Http.get('src/json/top5_vm_cpu_usage.json').then(function (res) {
            var names = [];
            var dataList = [];

            res.data.json.map(function (item) {
              names.push(item.name);
              dataList.push(30 + item.value * 1.2);
            });

            that.charts[2] = {
              title: that.charts[2].title,
              names: names,
              dataList: dataList,
              colorList: colorList1,
              barColorList: barColorList1
            }
          })
        });

        Monitor.vm_mem().then(function (res) {
          var names = [];
          var dataList = [];

          res.data.json.map(function (item) {
            names.push(item.name);
            dataList.push(15 + item.value * 1.25);
          });

          that.charts[3] = {
            title: that.charts[3].title,
            names: names,
            dataList: dataList,
            colorList: colorList2,
            barColorList: barColorList2
          }
        }, function (err) {
          Http.get('src/json/top5_vm_memory_usage.json').then(function (res) {
            var names = [];
            var dataList = [];

            res.data.json.map(function (item) {
              names.push(item.name);
              dataList.push(15 + item.value * 1.25);
            });

            that.charts[3] = {
              title: that.charts[3].title,
              names: names,
              dataList: dataList,
              colorList: colorList2,
              barColorList: barColorList2
            }
          })
        });
      }

      reload();

      $interval(function () {
        reload();
      }, 30000);
    }

    ])
})(angular);

(function (angular) {
  'use strict';

  angular.module('cloud-monitor.directives')
    .directive('circleChart', ['$interval', function ($interval) {
      return {
        restrict: 'E',
        templateUrl: 'src/js/components/circleChart/CircleChart.html',
        replace: true,
        bindToController: true,
        scope: {
          color: '=',
          title: '=',
          detail: '='
        },
        link: function (scope, element, attrs, ctrl) {
          var svg = d3.select(element[0]).selectAll('svg'),
            cx = 150,
            cy = 150,
            r = 120;

          ctrl.percent = ctrl.detail.usageValue / ctrl.detail.totalValue * 100;

          function drawsvg() {
            var updateP = svg.selectAll('path').data([ctrl.percent]),
              enterP = updateP.enter(),
              exitP = updateP.exit();

            updateP
              .attr('d', function (d, i) {
                var angle = 2 * Math.PI * d / 100;

                return _.concat(['M', cx + r, cy],
                  ['A', r, r, 0, Math.floor(d / 50), 1, cx + Math.cos(angle) * r, cy + Math.sin(angle) * r]
                ).join(' ');
              });

            enterP.append('path')
              .attr('fill', 'none')
              .attr('stroke-width', 30)
              .attr('stroke-linecap', 'round')
              .attr('stroke-miterlimit', 10)
              .attr('stroke', function (d, i) {
                return ctrl.color;
              })
              .attr('d', function (d, i) {
                var angle = 2 * Math.PI * d / 100;
                return _.concat(['M', cx + r, cy],
                  ['A', r, r, 0, Math.floor(d / 50), 1, cx + Math.cos(angle) * r, cy + Math.sin(angle) * r]
                ).join(' ');
              });

            exitP.remove();
          }


          scope.$watch(function () {
            return ctrl.detail.usageValue;
          }, function (value) {
            ctrl.percent = ctrl.detail.usageValue / ctrl.detail.totalValue * 100;
            drawsvg();
          });
        },
        controller: function () {

        },
        controllerAs: 'CircleChartCtrl'
      }
    }])
})(angular);

(function (angular) {
  'use strict';

  angular.module('cloud-monitor.directives')
    .directive('directedGraph', ['$interval', function ($interval) {
      return {
        restrict: 'E',
        templateUrl: 'src/js/components/directedGraph/DirectedGraph.html',
        replace: true,
        scope: {
          data: '='
        },
        bindToController: true,
        link: function (scope, element, attrs, ctrl) {
          var svg = d3.select(element[0]).selectAll('svg.directed'),
            x0 = 20,
            y0 = 20,
            rx = $(element[0]).children('svg').width() / 2 - x0,
            ry = $(element[0]).children('svg').height() / 2 - y0,
            cr = $(element[0]).children('img.radar-ball').height() / 2 - 20,
            r = 25,
            v = [[0.5, 0.25], [0.75, 0.18], [1, 0.15], [1.25, 0.18], [1.5, 0.25],
              [0.3, 0.4], [0.5, 0.5], [0.75, 0.35], [1.25, 0.35], [1.5, 0.5], [1.7, 0.4],
              [0.18, 0.7], [0.35, 0.75], [1.65, 0.75], [1.88, 0.7],
              [0.15, 1], [1.85, 1],
              [0.18, 1.3], [0.35, 1.25], [1.7, 1.25], [1.88, 1.3],
              [0.3, 1.6], [0.45, 1.5], [0.75, 1.65], [1.25, 1.65], [1.5, 1.5], [1.7, 1.6],
              [0.5, 1.75], [0.75, 1.82], [1, 1.85], [1.25, 1.82], [1.5, 1.75]],
            _d = [],
            dataList = ctrl.data,
            i, j, flag;

          function move() {
            for (i = 0; i < v.length; i++) {
              _d[i] = [];
              _d[i][0] = v[i][0] + (Math.random() - 1) % 0.1;
              _d[i][1] = v[i][1] + (Math.random() - 1) % 0.1;

              for (j = 0; j < _d[i].length; j++) {
                flag = _d[i][j] < 1 ? 1 : -1;
                _d[i][j] = _d[i][j] + flag * Math.log(Math.abs(_d[i][j] - 1)) / Math.log(Math.pow(10, 50));
              }
            }
          }

          function drawsvg() {
            // circle
            var updateC = svg.selectAll('circle').data(_d),
              enterC = updateC.enter(),
              exitC = updateC.exit();

            updateC.transition()
              .duration(3000)
              .ease(d3.easeCubicOut)
              .attr('cx', function (d, i) {
                return rx * d[0] + x0;
              })
              .attr('cy', function (d, i) {
                return ry * d[1] + y0;
              })
              .attr('r', function (d, i) {
                return r * Math.sqrt(Math.pow(d[0] - 1, 2) + Math.pow(d[1] - 1, 2));
              })
              .transition()
              .duration(2000)
              .ease(d3.easeCubicOut)
              .attr('stroke', function (d, i) {
                if (dataList[i] < 20) {
                  return '#ff9510';
                } else if (dataList[i] < 80) {
                  return '#0f9ee5';
                } else {
                  return '#57c550';
                }
              })
              .attr('fill', function (d, i) {
                if (dataList[i] < 20) {
                  return 'url(#grad_orange)';
                } else if (dataList[i] < 80) {
                  return 'url(#grad_blue)';
                } else {
                  return 'url(#grad_green)';
                }
              });

            var circle = enterC.append('circle');

            circle.attr('cx', function (d, i) {
              return rx * d[0] + x0;
            })
              .attr('cy', function (d, i) {
                return ry * d[1] + y0;
              })
              .transition()
              .duration(1000)
              .ease(d3.easeCubicOut)
              .attr('r', function (d, i) {
                return r * Math.sqrt(Math.pow(d[0] - 1, 2) + Math.pow(d[1] - 1, 2));
              })
              .attr('stroke', function (d, i) {
                if (dataList[i] < 20) {
                  return '#ff9510';
                } else if (dataList[i] < 80) {
                  return '#0f9ee5';
                } else {
                  return '#57c550';
                }
              })
              .attr('fill', function (d, i) {
                if (dataList[i] < 20) {
                  return 'url(#grad_orange)';
                } else if (dataList[i] < 80) {
                  return 'url(#grad_blue)';
                } else {
                  return 'url(#grad_green)';
                }
              });

            circle.append('animate')
              .attr('attributeName', 'r')
              .attr('dur', '5s')
              .attr('values', function (d, i) {
                var _r = r * Math.sqrt(Math.pow(d[0] - 1, 2) + Math.pow(d[1] - 1, 2));
                return [_r, 1.3 * _r, _r].join(';');
              })
              .attr('repeatCount', 'indefinite');

            exitC.remove();

            // line
            var updateL = svg.selectAll('path').data(_d),
              enterL = updateL.enter(),
              exitL = updateL.exit();

            updateL.transition()
              .duration(3000)
              .ease(d3.easeCubicOut)
              .attr('d', function (d, i) {
                var _x0 = rx + cr * (d[0] - 1),
                  _y0 = ry + cr * (d[1] - 1),
                  _delta_x = _x0 - rx,
                  _delta_y = _y0 - ry,
                  _x1 = r * Math.acos(_delta_x / Math.sqrt(Math.pow(_delta_x, 2) + Math.pow(_delta_y, 2))),
                  _y1 = r * Math.asin(_delta_y / Math.sqrt(Math.pow(_delta_x, 2) + Math.pow(_delta_y, 2)));

                return _.concat(['M', rx * d[0] + x0, ry * d[1] + y0],
                  ['L', rx + cr * (d[0] - 1) + x0, ry + cr * (d[1] - 1) + y0]).join(' ')
              })
              .transition()
              .duration(2000)
              .ease(d3.easeCubicOut)
              .attr('stroke', function (d, i) {
                if (dataList[i] < 20) {
                  return '#ff9510';
                } else if (dataList[i] < 80) {
                  return '#0f9ee5';
                } else {
                  return '#57c550';
                }
              });

            enterL.append('path')
              .attr('d', function (d, i) {
                var _x0 = rx + cr * (d[0] - 1),
                  _y0 = ry + cr * (d[1] - 1),
                  _delta_x = _x0 - rx,
                  _delta_y = _y0 - ry,
                  _x1 = r * Math.acos(_delta_x / Math.sqrt(Math.pow(_delta_x, 2) + Math.pow(_delta_y, 2))),
                  _y1 = r * Math.asin(_delta_y / Math.sqrt(Math.pow(_delta_x, 2) + Math.pow(_delta_y, 2)));

                return _.concat(['M', rx * d[0] + x0, ry * d[1] + y0],
                  ['L', rx + cr * (d[0] - 1) + x0, ry + cr * (d[1] - 1) + y0]).join(' ')
              })
              .attr('style', 'opacity: 0.5')
              .attr('stroke-width', '2px')
              .attr('fill-rule', 'evenodd')
              .attr('stroke', function (d, i) {
                if (dataList[i] < 20) {
                  return '#ff9510';
                } else if (dataList[i] < 80) {
                  return '#0f9ee5';
                } else {
                  return '#57c550';
                }
              });

            exitL.remove();

            // text
            var updateT = svg.selectAll('text').data(dataList),
              enterT = updateT.enter(),
              exitT = updateT.exit();

            updateT.transition()
              .duration(3000)
              .ease(d3.easeCubicOut)
              .attr('x', function (d, i) {
                return rx * _d[i][0] + x0;
              })
              .attr('y', function (d, i) {
                return ry * _d[i][1] + 7 + y0;
              })
              .transition()
              .duration(2000)
              .ease(d3.easeCubicOut)
              .text(function (d, i) {
                return Math.floor(d);
              });

            enterT.append('text')
              .attr('x', function (d, i) {
                return rx * _d[i][0] + x0;
              })
              .attr('y', function (d, i) {
                return ry * _d[i][1] + 7 + y0;
              })
              .attr('text-anchor', 'middle')
              .style('fill', 'white')
              .style('font-size', '14px')
              .transition()
              .duration(2000)
              .ease(d3.easeCubicOut)
              .text(function (d, i) {
                return Math.floor(d);
              });

            exitT.remove();
          }

          move();
          drawsvg();

          scope.$watch(function () {
            return ctrl.data;
          }, function (value) {
            dataList = value;
            move();
            drawsvg();
          });
        },
        controller: function () {

        },
        controllerAs: 'DirectedGraphCtrl'
      }
    }])
})(angular);

(function (angular) {
  'use strict';

  angular.module('cloud-monitor.directives')

    .directive('ellipseChart', ['$timeout', function ($timeout) {
      return {
        restrict: 'E',
        templateUrl: 'src/js/components/ellipseChart/EllipseChart.html',
        transclude: true,
        replace: true,
        scope: {
          chart: "="
        },
        bindToController: true,
        link: function (scope, element, attrs, ctrl) {
          var svg = d3.select(element[0]).selectAll('.ellipseChart'),
            rx = parseFloat(attrs.rx),
            ry = parseFloat(attrs.ry),
            h = parseFloat(attrs.h),
            x0 = parseFloat(attrs.x0),
            y0 = parseFloat(attrs.y0),
            deltaX = parseFloat(attrs.deltaX),
            deltaH = parseFloat(attrs.deltaH);

          var dataList, colorList, barColorList;

          function drawText() {

          }

          function drawsvg() {
            // ellipse.bottom
            var updateE1 = svg.selectAll('ellipse.bottom').data(dataList),
              enterE1 = updateE1.enter(),
              exitE1 = updateE1.exit();

            updateE1.transition()
              .duration(1000)
              .ease(d3.easeCubicOut)
              .attr("cy", function (d, i) {
                return y0 + h - d;
              });

            enterE1.append('ellipse')
              .attr("cx", function (d, i) {
                return x0 + rx + i * deltaX;
              })
              .attr("cy", function (d, i) {
                return y0 + h - d;
              })
              .attr("rx", function (d, i) {
                return rx;
              })
              .attr("ry", function (d, i) {
                return ry;
              })
              .attr("fill", function (d, i) {
                return colorList[i];
              })
              .attr('class', 'bottom');

            exitE1.remove();

            // path.bottom
            var updateP1 = svg.selectAll('path.bottom').data(dataList),
              enterP1 = updateP1.enter(),
              exitP1 = updateP1.exit();

            updateP1.transition()
              .duration(1000)
              .ease(d3.easeCubicOut)
              .attr("d", function (d, i) {
                return _.concat(['M', x0 + 2 * rx + deltaX * i, h + y0],
                  ['A', rx, ry, 0, 0, 1, x0 + deltaX * i, h + y0],
                  ['V', h - d + y0],
                  ['A', rx, ry, 0, 0, 0, x0 + 2 * rx + deltaX * i, h - d + y0]).join(' ');
              });

            enterP1.append('path')
              .attr("fill", function (d, i) {
                return barColorList[i];
              })
              .attr("d", function (d, i) {
                return _.concat(['M', x0 + 2 * rx + deltaX * i, h + y0],
                  ['A', rx, ry, 0, 0, 1, x0 + deltaX * i, h + y0],
                  ['V', h - d + y0],
                  ['A', rx, ry, 0, 0, 0, x0 + 2 * rx + deltaX * i, h - d + y0]).join(' ');
              })
              .attr('class', 'bottom');

            exitP1.remove();

            // ellipse.top
            var updateE2 = svg.selectAll('ellipse.top').data(dataList),
              enterE2 = updateE2.enter(),
              exitE2 = updateE2.exit();

            enterE2.append('ellipse')
              .attr("cx", function (d, i) {
                return x0 + rx + i * deltaX;
              })
              .attr("cy", function (d, i) {
                return y0 + ry;
              })
              .attr("rx", function (d, i) {
                return rx;
              })
              .attr("ry", function (d, i) {
                return ry;
              })
              .attr("fill", '#F7F7F8')
              .attr("opacity", 0.3)
              .attr('class', 'top');

            exitE2.remove();

            // path.top
            var updateP2 = svg.selectAll('path.top').data(dataList),
              enterP2 = updateP2.enter(),
              exitP2 = updateP2.exit();

            updateP2.transition()
              .duration(1000)
              .ease(d3.easeCubicOut)
              .attr("d", function (d, i) {
                return _.concat(['M', x0 + 2 * rx + deltaX * i, h - d + deltaH + y0],
                  ['A', rx, ry, 0, 0, 1, x0 + deltaX * i, h - d + deltaH + y0],
                  ['V', ry + y0],
                  ['A', rx, ry, 0, 0, 0, x0 + 2 * rx + deltaX * i, ry + y0]).join(' ');
              });

            enterP2.append('path')
              .attr("fill", "#AEADB3")
              .attr("opacity", 0.3)
              .attr("d", function (d, i) {
                return _.concat(['M', x0 + 2 * rx + deltaX * i, h - d + deltaH + y0],
                  ['A', rx, ry, 0, 0, 1, x0 + deltaX * i, h - d + deltaH + y0],
                  ['V', ry + y0],
                  ['A', rx, ry, 0, 0, 0, x0 + 2 * rx + deltaX * i, ry + y0]).join(' ');
              })
              .attr('class', 'top');

            exitP2.remove();
          }

          scope.$watch(function () {
            return ctrl.chart;
          }, function (value) {
            dataList = value.dataList;
            colorList = value.colorList;
            barColorList = value.barColorList;
            drawText();
            drawsvg();
          });
        },
        controller: function () {

        },
        controllerAs: 'EllipseChartCtrl'
      }
    }])
})(angular);

(function (angular) {
  'use strict';

  angular.module('cloud-monitor.controllers')
    .controller('LeftCtrl', ['Monitor', '$interval', 'EChartsFactory', 'URL_CFG',
      function (Monitor, $interval, EChartsFactory, URL_CFG) {
        var that = this;

        that.charts = [];

        var charts = [{
          "type": "gauge",
          "id": 0,
          "title": "系统健康度",
          "dataSource": URL_CFG.api + "systemstate/statistics",
          "localSource": "src/json/system_health.json",
          "style": {
            "height": "100%",
            "width": "100%"
          }
        }, {
          "type": "pie",
          "id": 1,
          "title": "主机状态",
          "dataSource": URL_CFG.api + "hoststate/statistics",
          "localSource": "src/json/host_state.json",
          "style": {
            "height": "100%",
            "width": "100%"
          }
        }, {
          "type": "pie",
          "id": 3,
          "title": "虚拟机状态",
          "dataSource": URL_CFG.api + "vm/statistics",
          "localSource": "src/json/vm_state.json",
          "style": {
            "height": "100%",
            "width": "100%"
          }
        }];

        function reload() {
          charts.map(function (chart) {
            var newChart = EChartsFactory(chart.type);

            _.merge(newChart, chart);
            newChart.update(chart);
            that.charts.push(newChart);
          })
        }

        reload();

        $interval(function () {
          reload();
        }, 30000);
      }])
})(angular);

(function (angular) {
  'use strict';

  angular.module('cloud-monitor.controllers')
    .controller('MainCtrl', ['$interval', 'Monitor', function ($interval, Monitor) {
      var that = this;
      that.data = [];

      function equipData(n) {
        for (var i = 0, list = []; i < n; i++) {
          list[i] = Math.random() * 20 + 78;
        }
        return list;
      }

      function reload() {
        Monitor.hostHealth().then(function (res) {
          that.data = _.concat(res.data.json, equipData(32 - res.data.json.length));
        }, function (err) {
          that.data = equipData(32);
        });
      }

      reload();

      $interval(function () {
        reload();
      }, 5000);
    }])
})(angular);

(function (angular) {
  'use strict';

  angular.module('cloud-monitor.controllers')
    .controller('RightCtrl', ['$interval', 'Monitor', 'Http', function ($interval, Monitor, Http) {
      var that = this;

      that.detail = {
        disaster: 0,
        serious: 0,
        warning: 0,
        information: 0
      };

      that.usageList = [{
        title: 'CPU使用情况',
        color: '#58c84d',
        detail: {
          totalName: '总数',
          totalValue: 100,
          usageName: '已分配',
          usageValue: 0
        }
      }, {
        title: '内存使用情况',
        color: '#ff9b0a',
        detail: {
          totalName: '总数',
          totalValue: 100,
          usageName: '已分配',
          usageValue: 0
        }
      }, {
        title: '存储使用情况',
        color: '#09c8f4',
        detail: {
          totalName: '总数',
          totalValue: 100,
          usageName: '已分配',
          usageValue: 0
        }
      }];

      function reload() {
        Monitor.alarm().then(function (res) {
          that.detail = {
            disaster: res.data.disaster,
            serious: res.data.serious,
            warning: res.data.warning,
            information: res.data.information
          };
        }, function (err) {
          Http.get('src/json/alarm.json').then(function (res) {
            that.detail = res.data.data[0];
          });
        });

        Monitor.hypervisors().then(function (res) {
          that.usageList[0].detail.totalValue = res.data.vcpus && 240;
          that.usageList[0].detail.usageValue = res.data.vcpus_used;

          that.usageList[1].detail.totalValue = res.data.memory_mb;
          that.usageList[1].detail.usageValue = res.data.memory_mb_used;

          that.usageList[2].detail.totalValue = res.data.local_gb;
          that.usageList[2].detail.usageValue = res.data.local_gb_used;
        }, function (err) {
          Http.get('src/json/hypervisors.json').then(function (res) {
            that.usageList = res.data.data;
          })
        })
      }

      reload();

      $interval(function () {
        reload();
      }, 30000);
    }])
})(angular);

(function (angular) {
  'use strict';

  angular.module('cloud-monitor.directives')

    .directive('squareChart', ['$timeout', function ($timeout) {
      return {
        restrict: 'E',
        templateUrl: 'src/js/components/squareChart/SquareChart.html',
        transclude: true,
        replace: true,
        scope: {
          chart: "="
        },
        bindToController: true,
        link: function (scope, element, attrs, ctrl) {
          var height = $(element[0]).height();
          var width = $(element[0]).width();

          var svg = d3.select(element[0]).selectAll('.squareChart'),
            g = svg.selectAll('g.bar'),
            a = parseFloat(attrs.a),
            b = parseFloat(attrs.b),
            h = parseFloat(attrs.h),
            x0 = parseFloat(attrs.x0),
            y0 = parseFloat(attrs.y0),
            deltaX = parseFloat(attrs.deltaX),
            deltaH = parseFloat(attrs.deltaH);

          var dataList, colorList, barColorList;

          function drawsvg() {
            var updateP, enterP, exitP, _i;

            // polygon.bottom
            for (_i = 0; _i <= 2; _i++) {
              updateP = svg.selectAll('polygon.bottom_' + _i).data(dataList);
              enterP = updateP.enter();
              exitP = updateP.exit();

              updateP.transition()
                .duration(1000)
                .ease(d3.easeCubicOut)
                .attr("points", function (d, i) {
                  var points = [];
                  switch (_i) {
                    case 0:
                      points = _.concat([a + deltaX * i + x0, h - d + y0],
                        [2 * a + deltaX * i + x0, h - d + b + y0],
                        [a + deltaX * i + x0, h - d + 2 * b + y0],
                        [deltaX * i + x0, h - d + b + y0]);
                      break;

                    case 1:
                      points = _.concat([deltaX * i + x0, b + h - d + y0],
                        [a + deltaX * i + x0, 2 * b + h - d + y0],
                        [a + deltaX * i + x0, h + b + y0],
                        [deltaX * i + x0, h + y0]);
                      break;

                    case 2:
                      points = _.concat([2 * a + deltaX * i + x0, b + h - d + y0],
                        [a + deltaX * i + x0, 2 * b + h - d + y0],
                        [a + deltaX * i + x0, h + b + y0],
                        [2 * a + deltaX * i + x0, h + y0]);
                      break;

                    default:
                      break;
                  }
                  return points.join(' ');
                });

              enterP.append('polygon')
                .attr("fill", (function (d, i) {
                  return barColorList[i][_i];
                }))
                .attr("points", function (d, i) {
                  var points = [];
                  switch (_i) {
                    case 0:
                      points = _.concat([a + deltaX * i + x0, h - d + y0],
                        [2 * a + deltaX * i + x0, h - d + b + y0],
                        [a + deltaX * i + x0, h - d + 2 * b + y0],
                        [deltaX * i + x0, h - d + b + y0]);
                      break;

                    case 1:
                      points = _.concat([deltaX * i + x0, b + h - d + y0],
                        [a + deltaX * i + x0, 2 * b + h - d + y0],
                        [a + deltaX * i + x0, h + b + y0],
                        [deltaX * i + x0, h + y0]);
                      break;

                    case 2:
                      points = _.concat([2 * a + deltaX * i + x0, b + h - d + y0],
                        [a + deltaX * i + x0, 2 * b + h - d + y0],
                        [a + deltaX * i + x0, h + b + y0],
                        [2 * a + deltaX * i + x0, h + y0]);
                      break;

                    default:
                      break;
                  }
                  return points.join(' ');
                }).attr('class', 'bottom_' + _i);

              exitP.remove();
            }

            // polygon.top
            for (_i = 0; _i <= 2; _i++) {
              updateP = svg.selectAll('polygon.top_' + _i).data(dataList);
              enterP = updateP.enter();
              exitP = updateP.exit();

              updateP.transition()
                .duration(1000)
                .ease(d3.easeCubicOut)
                .attr("points", function (d, i) {
                  var points = [];
                  switch (_i) {
                    case 0:
                      points = _.concat([a + deltaX * i + x0, y0],
                        [2 * a + deltaX * i + x0, b + y0],
                        [a + deltaX * i + x0, 2 * b + y0],
                        [deltaX * i + x0, b + y0]);
                      break;

                    case 1:
                      points = _.concat([deltaX * i + x0, b + y0],
                        [a + deltaX * i + x0, 2 * b + y0],
                        [a + deltaX * i + x0, 2 * b + h - d + deltaH + y0],
                        [deltaX * i + x0, b + h - d + deltaH + y0]);
                      break;

                    case 2:
                      points = _.concat([2 * a + deltaX * i + x0, b + y0],
                        [a + deltaX * i + x0, 2 * b + y0],
                        [a + deltaX * i + x0, 2 * b + h - d + deltaH + y0],
                        [2 * a + deltaX * i + x0, b + h - d + deltaH + y0]);
                      break;

                    default:
                      break;
                  }
                  return points.join(' ');
                });

              enterP.append('polygon')
                .attr("fill", (function (d, i) {
                  return colorList[_i];
                }))
                .attr('opacity', 0.3)
                .attr("points", function (d, i) {
                  var points = [];
                  switch (_i) {
                    case 0:
                      points = _.concat([a + deltaX * i + x0, y0],
                        [2 * a + deltaX * i + x0, b + y0],
                        [a + deltaX * i + x0, 2 * b + y0],
                        [deltaX * i + x0, b + y0]);
                      break;

                    case 1:
                      points = _.concat([deltaX * i + x0, b + y0],
                        [a + deltaX * i + x0, 2 * b + y0],
                        [a + deltaX * i + x0, 2 * b + h - d + deltaH + y0],
                        [deltaX * i + x0, b + h - d + deltaH + y0]);
                      break;

                    case 2:
                      points = _.concat([2 * a + deltaX * i + x0, b + y0],
                        [a + deltaX * i + x0, 2 * b + y0],
                        [a + deltaX * i + x0, 2 * b + h - d + deltaH + y0],
                        [2 * a + deltaX * i + x0, b + h - d + deltaH + y0]);
                      break;

                    default:
                      break;
                  }
                  return points.join(' ');
                }).attr('class', 'top_' + _i);

              exitP.remove();
            }
          }

          scope.$watch(function () {
            return ctrl.chart;
          }, function (value) {
            dataList = value.dataList;
            colorList = value.colorList;
            barColorList = value.barColorList;
            drawsvg();
          });
        },
        controller: function () {

        },
        controllerAs: 'SquareChartCtrl'
      }
    }])

})(angular);
