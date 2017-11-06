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
