import THREE from 'three'

const SEPARATION = 80
const AMOUNTX = 60
const AMOUNTY = 25

let container
let camera, scene, renderer

let particles
let particle
let count = 0

const init = () => {
  container = document.createElement('div')
  container.className = 'wave'
  document.body.appendChild(container)

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    10000
  )
  camera.position.x = 0
  camera.position.y = 500
  camera.position.z = 1500

  scene = new THREE.Scene()

  particles = []

  let PI2 = Math.PI * 2
  let material = new THREE.SpriteCanvasMaterial({
    color: new THREE.Color(0x3399cc),
    opacity: 0.5,
    program: context => {
      context.beginPath()
      context.arc(0, 0, 0.5, 0, PI2, true)
      context.fill()
    }
  })

  let i = 0

  for (let ix = 0; ix < AMOUNTX; ix++) {
    for (let iy = 0; iy < AMOUNTY; iy++) {
      particle = particles[i++] = new THREE.Sprite(material)
      particle.position.x = ix * SEPARATION - AMOUNTX * SEPARATION / 2
      particle.position.z = iy * SEPARATION - AMOUNTY * SEPARATION / 2
      scene.add(particle)
    }
  }

  renderer = new THREE.CanvasRenderer({ alpha: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)

  container.appendChild(renderer.domElement)

  window.addEventListener('resize', onWindowResize, false)
}

const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
}

const animate = () => {
  requestAnimationFrame(animate)
  render()
}

const render = () => {
  camera.lookAt(scene.position)

  let i = 0
  for (let ix = 0; ix < AMOUNTX; ix++) {
    for (let iy = 0; iy < AMOUNTY; iy++) {
      particle = particles[i++]
      particle.position.y =
        Math.sin((ix + count) * 0.3) * 50 + Math.sin((iy + count) * 0.5) * 50
      particle.scale.x = particle.scale.y =
        (Math.sin((ix + count) * 0.3) + 1) * 4 +
        (Math.sin((iy + count) * 0.5) + 1) * 4
    }
  }

  renderer.render(scene, camera)

  count += 0.01
}

export class AppCtrl {
  constructor() {
    init()
    animate()
  }
}
