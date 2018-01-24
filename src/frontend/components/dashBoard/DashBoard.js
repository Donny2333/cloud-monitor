import * as d3 from 'd3'

export default class DashBoard {
  constructor() {
    return {
      restrict: 'E',
      template: require('./DashBoard.html'),
      replace: true,
      bindToController: true,
      scope: {
        chart: '='
      },
      link: (scope, element, attrs, ctrl) => {
        const svg = d3.select(element[0]).selectAll('svg')
        const pointer = svg.select('polygon.pointer')

        const angle = d3
          .scaleLinear()
          .domain([0, 100])
          .range([-195, 10])

        const drawSVG = () => {
          pointer
            .style('transform-origin', '100px 100px')
            .attr('transform', () => {
              return `rotate(${angle(ctrl.chart.value)})`
            })
        }

        scope.$watch(
          () => {
            return ctrl.chart && ctrl.chart.value
          },
          value => {
            if (value) {
              drawSVG()
            }
          }
        )
      },
      controller: () => {},
      controllerAs: 'DashBoardCtrl'
    }
  }
}
