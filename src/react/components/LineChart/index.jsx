import React from 'react'
import * as d3 from 'd3'
import './LineChart.less'

export default class LineChart extends React.Component {
  componentDidMount() {
    this.dawSVG()
  }

  componentDidUpdate() {
    this.dawSVG()
  }

  dawSVG() {
    const chart = {
      height: 200,
      width: 300,
      padding: 10,
      colorList: ['#2EC667', '#AB14B2', '#F04B09', '#FCB212', '#1E69D2']
    }
    chart.text = {
      color: '#A5A6BB',
      width: 60,
      fontSize: 10,
      padding: 2
    }
    chart.bar = {
      color: '#F39800',
      radius: 8,
      deltaY: 20,
      padding: 2
    }
    const svg = d3.select(this.LineChart).selectAll('svg')

    const updateRaw = svg.selectAll('g.raw').data(this.props.chart.data)
    const enterRaw = updateRaw.enter()
    const exitRaw = updateRaw.exit()

    const raw = enterRaw.append('g').attr('class', 'raw')

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
    updateRaw.select('linearGradient').attr('x2', d => {
      return (
        chart.text.width +
        (this.props.chart.number ? d.number : d.value) *
          (chart.width - chart.text.width) /
          100
      )
    })

    const gradient = raw
      .append('linearGradient')
      .attr('id', (d, i) => {
        return `LG_${this.props.chart.label}_${i + 1}`
      })
      .attr('gradientUnits', 'userSpaceOnUse')
      .attr('x1', chart.text.width)
      .attr('y1', 0)
      .attr('x2', d => {
        return (
          chart.text.width +
          (this.props.chart.number ? d.number : d.value) *
            (chart.width - chart.text.width) /
            100
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
    updateRaw.select('path.inner').attr('d', (d, i) => {
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
          [
            'h',
            (this.props.chart.number ? d.number : d.value) *
              (chart.width - chart.text.width - 30) /
              100
          ],
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

    raw
      .append('path')
      .attr('class', 'inner')
      .attr('opacity', 0.8)
      .attr('fill', (d, i) => {
        return `url(#LG_${this.props.chart.label}_${i + 1})`
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
            [
              'h',
              (this.props.chart.number ? d.number : d.value) *
                (chart.width - chart.text.width - 30) /
                100
            ],
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
    updateRaw.select('text.name').text(d => {
      return d.name
    })

    raw
      .append('text')
      .attr('class', 'name')
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
      .text(d => {
        return d.name
      })

    // percent of bar
    updateRaw.select('text.percent').text(d => {
      return `${d.value}${this.props.chart.unit || ''}`
    })

    raw
      .append('text')
      .attr('class', 'percent')
      .attr('x', chart.width - 15)
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
      .style('text-anchor', 'end')
      .text(d => {
        return `${d.value}${this.props.chart.unit || ''}`
      })

    exitRaw.remove()
  }

  render() {
    return (
      <div
        ref={c => {
          this.LineChart = c
        }}
        className="line-chart"
      >
        <div className="label">{this.props.chart.label}</div>
        <svg x="0px" y="0px" width="100%" height="100%" viewBox="0 0 300 200" />
      </div>
    )
  }
}
