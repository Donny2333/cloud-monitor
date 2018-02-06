import React from 'react'
import * as d3 from 'd3'
import './LineChart.less'

export default class LineChart extends React.Component {
  componentDidMount() {
    const svg = d3.select(this.refs.LineChart).selectAll('svg')

    const updateRaw = svg.selectAll('g.raw').data([1, 2, 3])
    const enterRaw = updateRaw.enter()
    const exitRaw = updateRaw.exit()

    updateRaw.attr('class', 'raw')
    enterRaw.append('g').attr('class', 'raw')
    exitRaw.remove()
  }

  render() {
    return (
      <div ref="LineChart">
        <svg />
      </div>
    )
  }
}
