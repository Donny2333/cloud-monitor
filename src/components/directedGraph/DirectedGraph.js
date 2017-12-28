import * as d3 from 'd3'
import $ from 'jquery'

export default class DirectedGraph {
  constructor() {
    return {
      restrict: 'E',
      template: require('./DirectedGraph.html'),
      replace: true,
      scope: {
        data: '='
      },
      bindToController: true,
      link: (scope, element, attrs, ctrl) => {
        const svg = d3.select(element[0]).selectAll('svg.directed')
        const x0 = 20
        const y0 = 20
        const rx =
          $(element[0])
            .children('svg')
            .width() /
          2 -
          x0
        const ry =
          $(element[0])
            .children('svg')
            .height() /
          2 -
          y0
        const cr =
          $(element[0])
            .children('.radar-ball')
            .height() /
          2 -
          20
        const r = 25
        const v = [
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
        ]
        let _d = []
        let dataList = ctrl.data
        let i
        let j
        let flag

        const move = () => {
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

        const drawSVG = () => {
          // circle
          const updateC = svg.selectAll('circle').data(_d)
          const enterC = updateC.enter()
          const exitC = updateC.exit()

          updateC
            .transition()
            .duration(3000)
            .ease(d3.easeCubicOut)
            .attr('cx', (d, i) => {
              return rx * d[0] + x0
            })
            .attr('cy', (d, i) => {
              return ry * d[1] + y0
            })
            .attr('r', (d, i) => {
              return (
                r * Math.sqrt(Math.pow(d[0] - 1, 2) + Math.pow(d[1] - 1, 2))
              )
            })
            .transition()
            .duration(2000)
            .ease(d3.easeCubicOut)
            .attr('stroke', (d, i) => {
              if (dataList[i] < 20) {
                return '#ff9510'
              } else if (dataList[i] < 80) {
                return '#0f9ee5'
              } else {
                return '#57c550'
              }
            })
            .attr('fill', (d, i) => {
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
            .attr('cx', (d, i) => {
              return rx * d[0] + x0
            })
            .attr('cy', (d, i) => {
              return ry * d[1] + y0
            })
            .transition()
            .duration(1000)
            .ease(d3.easeCubicOut)
            .attr('r', (d, i) => {
              return (
                r * Math.sqrt(Math.pow(d[0] - 1, 2) + Math.pow(d[1] - 1, 2))
              )
            })
            .attr('stroke', (d, i) => {
              if (dataList[i] < 20) {
                return '#ff9510'
              } else if (dataList[i] < 80) {
                return '#0f9ee5'
              } else {
                return '#57c550'
              }
            })
            .attr('fill', (d, i) => {
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
            .attr('values', (d, i) => {
              const _r =
                r * Math.sqrt(Math.pow(d[0] - 1, 2) + Math.pow(d[1] - 1, 2))
              return [_r, 1.3 * _r, _r].join(';')
            })
            .attr('repeatCount', 'indefinite')

          exitC.remove()

          // line
          const updateL = svg.selectAll('path').data(_d)
          const enterL = updateL.enter()
          const exitL = updateL.exit()

          updateL
            .transition()
            .duration(3000)
            .ease(d3.easeCubicOut)
            .attr('d', (d, i) => {
              return [].concat(
                ['M', rx * d[0] + x0, ry * d[1] + y0],
                ['L', rx + cr * (d[0] - 1) + x0, ry + cr * (d[1] - 1) + y0]
              ).join(' ')
            })
            .transition()
            .duration(2000)
            .ease(d3.easeCubicOut)
            .attr('stroke', (d, i) => {
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
            .attr('d', (d, i) => {
              return [].concat(
                ['M', rx * d[0] + x0, ry * d[1] + y0],
                ['L', rx + cr * (d[0] - 1) + x0, ry + cr * (d[1] - 1) + y0]
              ).join(' ')
            })
            .attr('style', 'opacity: 0.5')
            .attr('stroke-width', '2px')
            .attr('fill-rule', 'evenodd')
            .attr('stroke', (d, i) => {
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
          const updateT = svg.selectAll('text').data(dataList)
          const enterT = updateT.enter()
          const exitT = updateT.exit()

          updateT
            .transition()
            .duration(3000)
            .ease(d3.easeCubicOut)
            .attr('x', (d, i) => {
              return rx * _d[i][0] + x0
            })
            .attr('y', (d, i) => {
              return ry * _d[i][1] + 7 + y0
            })
            .transition()
            .duration(2000)
            .ease(d3.easeCubicOut)
            .text((d, i) => {
              return Math.floor(d)
            })

          enterT
            .append('text')
            .attr('x', (d, i) => {
              return rx * _d[i][0] + x0
            })
            .attr('y', (d, i) => {
              return ry * _d[i][1] + 7 + y0
            })
            .attr('text-anchor', 'middle')
            .style('fill', 'white')
            .style('font-size', '14px')
            .transition()
            .duration(2000)
            .ease(d3.easeCubicOut)
            .text((d, i) => {
              return Math.floor(d)
            })

          exitT.remove()
        }

        move()
        drawSVG()

        scope.$watch(() => {
          return ctrl.data
        }, (value) => {
          dataList = value
          move()
          drawSVG()
        })
      },
      controller: () => {},
      controllerAs: 'DirectedGraphCtrl'
    }
  }
}
