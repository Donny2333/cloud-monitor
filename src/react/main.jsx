import React from 'react'
import reactDOM from 'react-dom'
import LineChart from './components/LineChart/'
import '@/common/style'

class App extends React.Component {
  render() {
    return <LineChart name="React" />
  }
}

reactDOM.render(<App />, document.getElementById('app'))
