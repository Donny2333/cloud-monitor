import React from 'react'
import * as THREE from 'three'

export default class App extends React.Component {
  componentDidMount() {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      400 / 300,
      0.1,
      1000
    )

    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(400, 300)
    this.ThreeChart.appendChild(renderer.domElement)

    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    camera.position.z = 5

    const animate = () => {
      requestAnimationFrame(animate)

      cube.rotation.x += 0.05
      cube.rotation.y += 0.05

      renderer.render(scene, camera)
    }

    animate()
  }
  render() {
    return (
      <div
        className="three-chart"
        ref={c => {
          this.ThreeChart = c
        }}
      />
    )
  }
}
