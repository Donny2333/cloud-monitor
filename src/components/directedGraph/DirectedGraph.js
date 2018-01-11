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
        let timer = null

        let CirclePos = []
        const stats = {
          x: 168,
          y: -240,
          height: 55,
          barWidth: 4,
          colorList: ['orange', 'blue', 'green']
        }

        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 12; j++) {
            CirclePos.push([j, 0.5 + 0.25 * i])
          }
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

        ctrl.segments = {
          list: [],
          check: 0
        }

        const drawSVG = () => {
          let detail = ctrl.data.detail

          stats.dataList = [
            ctrl.data.num_excellent,
            ctrl.data.num_good,
            ctrl.data.num_poor
          ]

          // stats
          const updateS = svg.selectAll('rect.line').data(stats.dataList)
          const enterS = updateS.enter()
          const exitS = updateS.exit()

          updateS
            .attr('class', (d, i) => {
              return `line ${stats.colorList[i]}`
            })
            .attr('x', stats.x)
            .attr('y', stats.y)
            .attr('width', stats.barWidth)
            .attr('height', (d, i) => {
              return (
                _.sum(stats.dataList.slice(0, stats.dataList.length - i)) /
                _.sum(stats.dataList) *
                55
              )
            })

          enterS
            .append('rect')
            .attr('class', (d, i) => {
              return `line ${stats.colorList[i]}`
            })
            .attr('x', stats.x)
            .attr('y', stats.y)
            .attr('width', stats.barWidth)
            .attr('height', (d, i) => {
              return (
                _.sum(stats.dataList.slice(0, stats.dataList.length - i)) /
                _.sum(stats.dataList) *
                55
              )
            })

          exitS.remove()

          // circle
          const updateC = svg
            .selectAll('circle')
            .data(
              detail.slice(
                36 * ctrl.segments.check,
                (ctrl.segments.check + 1) * 36
              )
            )
          const enterC = updateC.enter()
          const exitC = updateC.exit()

          updateC
            .attr('cx', (d, i) => {
              return line([CirclePos[i]])
                .slice(1)
                .split(',')[0]
            })
            .attr('cy', (d, i) => {
              return line([CirclePos[i]])
                .slice(1, -1)
                .split(',')[1]
            })
            .attr('r', (d, i) => {
              console.log(i)
              return [8, 10, 14][Math.floor(i / 12)]
            })
            .attr('fill', (d, i) => {
              if (d.score < 20) {
                return 'url(#grad_orange)'
              } else if (d.score < 80) {
                return 'url(#grad_blue)'
              } else {
                return 'url(#grad_green)'
              }
            })
            .attr('style', (d, i) => {
              // fix firefox and safari transform-origin cannot set to percent
              return `transform-origin:${
                line([CirclePos[i]])
                  .slice(1)
                  .split(',')[0]
              }px ${
                line([CirclePos[i]])
                  .slice(1, -1)
                  .split(',')[1]
              }px`
            })
            .attr('class', 'breath')

          enterC
            .append('circle')
            .attr('cx', (d, i) => {
              return line([CirclePos[i]])
                .slice(1)
                .split(',')[0]
            })
            .attr('cy', (d, i) => {
              return line([CirclePos[i]])
                .slice(1, -1)
                .split(',')[1]
            })
            .attr('r', (d, i) => {
              return [8, 10, 14][Math.floor(i / 12)]
            })
            .attr('fill', (d, i) => {
              if (d.score < 20) {
                return 'url(#grad_orange)'
              } else if (d.score < 80) {
                return 'url(#grad_blue)'
              } else {
                return 'url(#grad_green)'
              }
            })
            .attr('style', (d, i) => {
              // fix firefox and safari transform-origin cannot set to percent
              return `transform-origin:${
                line([CirclePos[i]])
                  .slice(1)
                  .split(',')[0]
              }px ${
                line([CirclePos[i]])
                  .slice(1, -1)
                  .split(',')[1]
              }px`
            })
            .attr('class', 'breath')

          exitC.remove()

          // text
          const updateT = svg
            .selectAll('text.detail')
            .data(
              detail.slice(
                36 * ctrl.segments.check,
                (ctrl.segments.check + 1) * 36
              )
            )
          const enterT = updateT.enter()
          const exitT = updateT.exit()

          updateT
            .attr('class', 'detail')
            .attr('dy', '4px')
            .attr('transform', (d, i) => {
              const coors = line([CirclePos[i]])
                .slice(1)
                .slice(0, -1)
              return 'translate(' + coors + ')'
            })
            .attr('text-anchor', 'middle')
            .attr('style', (d, i) => {
              return `fill:white;font-size:${[8, 10, 12][Math.floor(i / 12)]}px`
            })
            .text((d, i) => {
              return Math.ceil(d.score)
            })

          enterT
            .append('text')
            .attr('class', 'detail')
            .attr('dy', '4px')
            .attr('transform', (d, i) => {
              const coors = line([CirclePos[i]])
                .slice(1)
                .slice(0, -1)
              return 'translate(' + coors + ')'
            })
            .attr('text-anchor', 'middle')
            .attr('style', (d, i) => {
              return `fill:white;font-size:${[8, 10, 12][Math.floor(i / 12)]}px`
            })
            .text((d, i) => {
              return Math.ceil(d.score)
            })

          exitT.remove()
        }

        scope.$watch(
          () => {
            return ctrl.data && ctrl.data.detail
          },
          value => {
            if (value) {
              ctrl.segments.list = []
              ctrl.segments.check = 0

              const num = Math.floor(ctrl.data.detail.length / 36)
              for (let i = 0; i < ctrl.data.detail.length / 36; i++) {
                ctrl.segments.list.push({
                  id: i,
                  text: `${36 * i + 1} - ${
                    i === num ? ctrl.data.detail.length : (i + 1) * 36
                  }`,
                  active: i === ctrl.segments.check
                })
              }

              drawSVG()

              timer && window.clearInterval(timer)

              timer = setInterval(() => {
                ctrl.segments.list[ctrl.segments.check].active = false
                ctrl.segments.check =
                  (ctrl.segments.check + 1) % ctrl.segments.list.length
                ctrl.segments.list[ctrl.segments.check].active = true

                drawSVG()
                scope.$apply()
              }, 3000)
            }
          }
        )
      },
      controller: () => {},
      controllerAs: 'DirectedGraphCtrl'
    }
  }
}
