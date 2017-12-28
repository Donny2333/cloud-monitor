import * as d3 from 'd3'

export default class LineChart {
  constructor() {
    return {
      restrict: 'E',
      template: require('./LineChart.html'),
      replace: true,
      bindToController: true,
      scope: {
        label: '=',
        data: '='
      },
      link: (scope, element, attrs, ctrl) => {
        const chart = {
          height: 160,
          width: 380,
          padding: 16,
          text: {
            color: '#A5A6BB',
            width: 100,
            fontSize: 10,
            padding: 2
          },
          bar: {
            color: '#F39800',
            radius: 8,
            deltaY: 13,
            padding: 2
          },
          colorList: ['#2EC667', '#AB14B2', '#F04B09', '#FCB212', '#1E69D2']
        }
        const svg = d3.select(element[0]).selectAll('svg')
        const data = ctrl.data

        const updatePointer = svg.selectAll('g.raw').data(data)
        const enterPointer = updatePointer.enter()
        const exitPointer = updatePointer.exit()

        const raw = enterPointer.append('g').attr('class', 'raw')

        // background of bar
        raw
          .append('path')
          .attr('opacity', 0.8)
          .attr('fill', '#2D2D2C')
          .attr('enable-background', 'new')
          .attr('d', (d, i) => {
            return []
              .concat(
                [
                  'M',
                  chart.width - 2 * chart.bar.radius,
                  i * (2 * chart.bar.radius + chart.bar.deltaY) + chart.padding
                ],
                [
                  'c',
                  2 * chart.bar.radius,
                  0,
                  2 * chart.bar.radius,
                  2 * chart.bar.radius,
                  0,
                  2 * chart.bar.radius
                ],
                ['H', chart.text.width + chart.bar.radius],
                [
                  'c',
                  -2 * chart.bar.radius,
                  0,
                  -2 * chart.bar.radius,
                  -2 * chart.bar.radius,
                  0,
                  -2 * chart.bar.radius
                ],
                ['z']
              )
              .join(' ')
          })

        // gradient of bar
        const gradient = raw
          .append('linearGradient')
          .attr('id', (d, i) => {
            return `LineChartLinearGradient_${i}`
          })
          .attr('gradientUnits', 'userSpaceOnUse')
          .attr('x1', chart.text.width)
          .attr('y1', 0)
          .attr('x2', (d, i) => {
            return (
              chart.text.width +
              d.value * (chart.width - chart.text.width) / 100
            )
          })
          .attr('y2', 0)

        gradient
          .append('stop')
          .attr('offset', 0)
          .attr('style', (d, i) => {
            return `stop-color:${chart.colorList[i]};stop-opacity:0`
          })

        gradient
          .append('stop')
          .attr('offset', 1)
          .attr('style', (d, i) => {
            return `stop-color:${chart.colorList[i]}`
          })

        // inner of bar
        raw
          .append('path')
          .attr('opacity', 0.8)
          .attr('fill', (d, i) => {
            return `url(#LineChartLinearGradient_${i})`
          })
          .attr('enable-background', 'new')
          .attr('d', (d, i) => {
            return []
              .concat(
                [
                  'M',
                  chart.text.width + chart.bar.radius + chart.bar.padding,
                  i * (2 * chart.bar.radius + chart.bar.deltaY) +
                  chart.padding +
                  chart.bar.padding
                ],
                [
                  'c',
                  -2 * chart.bar.radius,
                  0,
                  -2 * chart.bar.radius,
                  2 * (chart.bar.radius - chart.bar.padding),
                  0,
                  2 * (chart.bar.radius - chart.bar.padding)
                ],
                ['h', d.value * (chart.width - chart.text.width) / 100],
                [
                  'c',
                  2 * chart.bar.radius,
                  0,
                  2 * chart.bar.radius,
                  -2 * (chart.bar.radius - chart.bar.padding),
                  0,
                  -2 * (chart.bar.radius - chart.bar.padding)
                ],
                ['z']
              )
              .join(' ')
          })

        // name of bar
        raw
          .append('text')
          .attr('x', 0)
          .attr('y', (d, i) => {
            return (
              i * (2 * chart.bar.radius + chart.bar.deltaY) +
              chart.padding +
              chart.bar.padding +
              chart.text.fontSize
            )
          })
          .attr('fill', chart.text.color)
          .attr('font-size', chart.text.fontSize)
          .text((d, i) => {
            return d.name
          })

        // percent of bar
        raw
          .append('text')
          .attr('x', chart.width - 30)
          .attr('y', (d, i) => {
            return (
              i * (2 * chart.bar.radius + chart.bar.deltaY) +
              chart.padding +
              chart.bar.padding +
              chart.text.fontSize
            )
          })
          .attr('fill', '#F39800')
          .attr('font-size', chart.text.fontSize)
          .text((d, i) => {
            return `${d.value}%`
          })

        exitPointer.remove()
      },
      controller: () => {},
      controllerAs: 'LineChartCtrl'
    }
  }
}
