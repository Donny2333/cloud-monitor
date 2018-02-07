import '@/common/style'
import React from 'react'
import reactDOM from 'react-dom'
import LineChart from './components/LineChart/'

const getChart = () => {
  const chart = {
    label: 'ReactChart',
    data: []
  }

  for (let i = 0; i < 5; i += 1) {
    chart.data.push({
      name: `host-${i + 1}`,
      value: (Math.random() * 100).toFixed(0)
    })
  }
  return chart
}

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      chart: getChart()
    }
  }
  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState(() => {
        return {
          chart: getChart()
        }
      })
    }, 5000)
  }
  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }
  render() {
    return (
      <div className="app">
        <LineChart chart={this.state.chart} />
      </div>
    )
  }
}

reactDOM.render(<App />, document.getElementById('app'))
