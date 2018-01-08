import * as d3 from 'd3'
import * as _ from 'lodash'

export default class DirectedGraph {
  constructor() {
    return {
      restrict: 'E',
      template: require('./DirectedGraph.html'),
      replace: true,
      scope: {
        label: '=',
        data: '='
      },
      bindToController: true,
      link: (scope, element, attrs, ctrl) => {
        const svg = d3.select(element[0]).selectAll('svg')

        let CirclePos = []
        let detail = ctrl.data.detail
        const stats = {
          x: 178,
          y: -240,
          height: 55,
          barWidth: 4,
          dataList: [ctrl.data.num_excellent, ctrl.data.num_good, ctrl.data.num_poor],
          colorList: ['orange', 'blue', 'green']
        }

        for (let i = 0; i < 12; i++) {
          CirclePos.push([i, 0.5])
          CirclePos.push([i, 0.75])
          CirclePos.push([i, 1])
        }

        const angle = d3
          .scaleLinear()
          .domain([0, 12])
          .range([0, 2 * Math.PI])

        const r = d3
          .scaleLinear()
          .domain([0, 1])
          .range([0, 200])

        const line = d3
          .radialLine()
          .angle(d => {
            return angle(d[0])
          })
          .radius(d => {
            return r(d[1])
          })

        const drawSVG = () => {
          // stats
          const updateS = svg.selectAll('rect.line').data(stats.dataList)
          const enterS = updateS.enter()
          const exitS = updateS.exit()

          updateS
            .attr('class', (d, i) => {
              return `line ${stats.colorList[i]}`
            })
            .transition()
            .duration(1000)
            .ease(d3.easeCubicOut)
            .attr('x', stats.x)
            .attr('y', stats.y)
            .attr('width', stats.barWidth)
            .attr('height', (d, i) => {
              return _.sum(stats.dataList.slice(0, stats.dataList.length - i)) / _.sum(stats.dataList) * 55
            })

          enterS.append('rect')
            .attr('class', (d, i) => {
              return `line ${stats.colorList[i]}`
            })
            .attr('x', stats.x)
            .attr('y', stats.y)
            .attr('width', stats.barWidth)
            .attr('height', (d, i) => {
              return _.sum(stats.dataList.slice(0, stats.dataList.length - i)) / _.sum(stats.dataList) * 55
            })

          exitS.remove()

          // circle
          const updateC = svg.selectAll('circle').data(CirclePos)
          const enterC = updateC.enter()
          const exitC = updateC.exit()

          updateC
            .attr('cx', (d) => {
              return line([d])
                .slice(1).split(',')[0]
            })
            .attr('cy', (d) => {
              return line([d])
                .slice(1, -1).split(',')[1]
            })
            .attr('r', (d, i) => {
              return [8, 10, 14][i % 3]
            })
            .attr('fill', (d, i) => {
              if (detail[i] < 20) {
                return 'url(#grad_orange)'
              } else if (detail[i] < 80) {
                return 'url(#grad_blue)'
              } else {
                return 'url(#grad_green)'
              }
            })
            .attr('style', (d, i) => {
              // fix firefox and safari transform-origin cannot set to percent
              return `transform-origin:${line([d]).slice(1).split(',')[0]}px 
              ${line([d]).slice(1, -1).split(',')[1]}px`
            })
            .attr('class', 'breath')

          enterC
            .append('circle')
            .attr('cx', (d) => {
              return line([d])
                .slice(1).split(',')[0]
            })
            .attr('cy', (d) => {
              return line([d])
                .slice(1, -1).split(',')[1]
            })
            .attr('r', (d, i) => {
              return [8, 10, 14][i % 3]
            })
            .attr('fill', (d, i) => {
              if (detail[i] < 20) {
                return 'url(#grad_orange)'
              } else if (detail[i] < 80) {
                return 'url(#grad_blue)'
              } else {
                return 'url(#grad_green)'
              }
            })

          exitC.remove()

          // text
          const updateT = svg.selectAll('text.detail').data(CirclePos)
          const enterT = updateT.enter()
          const exitT = updateT.exit()

          updateT
            .attr('class', 'detail')
            .attr('dy', '4px')
            .attr('transform', function (d) {
              const coors = line([d])
                .slice(1)
                .slice(0, -1)
              return 'translate(' + coors + ')'
            })
            .attr('text-anchor', 'middle')
            .attr('style', (d, i) => {
              return `fill:white;font-size:${[8, 10, 12][i % 3]}px`
            })
            .text((d, i) => {
              return Math.ceil(detail[i])
            })

          enterT.append('text')
            .attr('class', 'detail')
            .attr('dy', '4px')
            .attr('transform', function (d) {
              const coors = line([d])
                .slice(1)
                .slice(0, -1)
              return 'translate(' + coors + ')'
            })
            .attr('text-anchor', 'middle')
            .attr('style', (d, i) => {
              return `fill:white;font-size:${[8, 10, 12][i % 3]}px`
            })
            .text((d, i) => {
              return Math.ceil(detail[i])
            })

          exitT.remove()
        }

        drawSVG()

        scope.$watch(() => {
          return ctrl.data
        }, (value) => {
          detail = ctrl.data.detail
          stats.dataList = [value.num_excellent, value.num_good, value.num_poor]
          drawSVG()
        })
      },
      controller: () => {},
      controllerAs: 'DirectedGraphCtrl'
    }
  }
}
