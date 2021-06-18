import './style.css'
import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'

function main() {
  const canvas = document.querySelector('#canvas')
  const renderer = new THREE.WebGLRenderer({canvas})
  const stats = new Stats()
  stats.showPanel(0)

  document.body.appendChild(stats.dom)

  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setClearColor(0xffffff)

  const fov = 40
  const aspect = 2
  const near = 0.1
  const far = 1000
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)

  camera.position.z = 10

  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xaaaaaa)

  const plane = new THREE.PlaneGeometry(10, 20)
  const planeMaterial = new THREE.MeshPhongMaterial({color: 0xe1e1e1})
  const planeMesh = new THREE.Mesh(plane, planeMaterial)

  planeMesh.position.y = -2
  planeMesh.rotation.x = 5

  scene.add(planeMesh)

  const makeInstance = (geometry, color, x) => {
    const material = new THREE.MeshPhongMaterial({color, flatShading: true, shininess: 80})
    const cube = new THREE.Mesh(geometry, material)

    cube.position.x = x

    const axes = new THREE.AxesHelper()
    axes.material.depthTest = false
    //axes.renderOrder = 1
    cube.add(axes)

    scene.add(cube)

    return cube
  }

  const box = {
    width: 1,
    height: 1,
    depth: 1
  }

  const geometry = new THREE.BoxGeometry(box.width, box.height, box.depth, 5, 5, 5)

  const cubes = [
    makeInstance(geometry, 0x44aa88, 0),
    makeInstance(geometry, 0x8844aa, -2),
    makeInstance(geometry, 0xaa8844, 2),
  ]

  const color = 0xFFFFFF
  const intensity = 1
  const light = new THREE.DirectionalLight(color, intensity)

  light.position.set(-1, 2, 4)

  scene.add(light)

  renderer.render(scene, camera)

  const resizeRendererToDisplaySize = () => {
    const needsResize = canvas.width != canvas.clientWidth || canvas.height != canvas.clientHeight

    if (needsResize) {
      renderer.setSize(canvas.clientWidth, canvas.clientHeight, false)
    }

    return needsResize
  }

  const render = (time) => {
    stats.begin()

    time *= 0.001

    if (resizeRendererToDisplaySize()) {
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()
    }

    cubes.forEach((cube, index) => {
      const speed = 1 + index * 0.1
      const rotation = time * speed

      cube.rotation.x = rotation
      cube.rotation.y = rotation
    })

    renderer.render(scene, camera)

    stats.end()

    requestAnimationFrame(render)
  }

  requestAnimationFrame(render)

  const DELTA = 0.5

  window.addEventListener('mousewheel', (event) => {
    camera.position.z += event.deltaY*0.01
  })

  window.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key == '+') {
      camera.position.z -= DELTA
      event.preventDefault()
    }

    if (event.ctrlKey && event.key == '-') {
      camera.position.z += DELTA
      event.preventDefault()
    }

    if (event.ctrlKey && event.key == '0') {
      camera.position.z = 10
      event.preventDefault()
    }
  })
}

main()
