import React from 'react'
import './Hello.less'

export default class Hello extends React.Component {
  render() {
    return <p className="Hello"> Hello {this.props.name}!</p>
  }
}
