import * as d3 from 'd3'

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

        const data = []

        for (let i = 0; i <= 12; i++) {
          data.push([i, 0.5])
          data.push([i, 0.75])
          data.push([i, 1])
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

        const update = svg.selectAll('circle').data(data)
        const enter = update.enter()
        const exit = update.exit()

        enter
          .append('circle')
          .attr('transform', function(d) {
            var coors = line([d])
              .slice(1)
              .slice(0, -1)
            return 'translate(' + coors + ')'
          })
          .attr('r', (d, i) => {
            return 10
          })
          .attr('fill', (d, i) => {
            return `url(#grad_green)`
          })
          .append('animate')
          .attr('attributeName', 'r')
          .attr('dur', '5s')
          .attr('values', function(d, i) {
            const r = 10
            return [r, 1.3 * r, r].join(';')
          })
          .attr('repeatCount', 'indefinite')

        exit.remove()
      },
      controller: () => {},
      controllerAs: 'DirectedGraphCtrl'
    }
  }
}
