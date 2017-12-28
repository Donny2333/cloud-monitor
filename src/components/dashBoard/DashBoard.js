import * as d3 from 'd3'

export default class DashBoard {
  constructor() {
    return {
      restrict: 'E',
      template: require('./DashBoard.html'),
      replace: true,
      bindToController: true,
      scope: {
        data: '='
      },
      link: (scope, element, attrs, ctrl) => {
        const svg = d3.select(element[0]).selectAll('svg')
        const chart = {
          height: 120,
          width: 200,
          center: [100, 100],
          xRay: {
            number: 53,
            colorList: ['#45E8FF', '#0098FF', '#FF5B00', '#0A52BF']
          }
        }
        const dataList = []

        for (let i = 0; i < chart.xRay.number; i++) {
          dataList.push(i)
        }

        const updateX = svg.selectAll('path.xRay').data(dataList)
        const enterX = updateX.enter()
        const exitX = updateX.exit()

        enterX.append('path')
          .attr('class', 'xRay')
          .attr('fill', (d, i) => {
            return chart.xRay.colorList[0]
          })
          .attr('opacity', (d, i) => {
            return 1
          })
          .attr('d', (d, i) => {
            return [].concat(['M', 0, 0]).join(' ')
          })

        exitX.remove()
      },
      controller: () => {},
      controllerAs: 'DashBoardCtrl'
    }
  }
}
