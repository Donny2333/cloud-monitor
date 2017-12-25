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
        const dataList = [60]

        // const updatePointer = svg.selectAll('path').data(dataList)
        // const enterPointer = updatePointer.enter()
        // const exitPointer = updatePointer.exit()

        // enterPointer.append('path')

        // exitPointer.remove()
      },
      controller: () => {},
      controllerAs: 'DashBoardCtrl'
    }
  }
}
