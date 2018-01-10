import * as d3 from 'd3'

export default class CircleChart {
  constructor() {
    return {
      restrict: 'E',
      template: require('./CircleChart.html'),
      replace: true,
      bindToController: true,
      scope: {
        color: '=',
        title: '=',
        detail: '='
      },
      link: (scope, element, attrs, ctrl) => {
        const svg = d3.select(element[0]).selectAll('svg')
        const cx = 150
        const cy = 150
        const r = 120

        const drawSVG = () => {
          const updateP = svg.selectAll('path').data([ctrl.detail.percent * 100])
          const enterP = updateP.enter()
          const exitP = updateP.exit()

          updateP.attr('d', (d, i) => {
            const angle = 2 * Math.PI * d / 100

            return []
              .concat(
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
              )
              .join(' ')
          })

          enterP
            .append('path')
            .attr('fill', 'none')
            .attr('stroke-width', 30)
            .attr('stroke-linecap', 'round')
            .attr('stroke-miterlimit', 10)
            .attr('stroke', (d, i) => {
              return ctrl.color
            })
            .attr('d', (d, i) => {
              const angle = 2 * Math.PI * d / 100
              return []
                .concat(
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
                )
                .join(' ')
            })

          exitP.remove()
        }

        scope.$watch(
          () => {
            return ctrl.detail
          },
          value => {
            if (value) {
              drawSVG()
            }
          }
        )
      },
      controller: () => {},
      controllerAs: 'CircleChartCtrl'
    }
  }
}
