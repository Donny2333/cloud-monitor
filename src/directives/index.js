import angular from 'angular'
import echarts from 'echarts'

const directives = angular
  .module('cloud-monitor.directives', [])
  .directive('myChart', () => {
    return {
      restrict: 'E',
      template: '<div ng-style="myStyle"></div>',
      replace: true,
      transclude: true,
      scope: {
        data: '=',
        myStyle: '='
      },
      link: (scope, element, attrs) => {
        let myChat = null

        if (scope.data) {
          // 基于准备好的dom，初始化echarts实例
          myChat = echarts.init(element[0])

          // 使用刚指定的配置项和数据显示图表
          myChat.setOption(scope.data)
        }

        // 监听DOM元素
        scope.$watch('data', value => {
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

        scope.$watch('myStyle', value => {
          if (value && myChat) {
            myChat.resize()
          }
        })
      }
    }
  })

module.exports = directives.name
