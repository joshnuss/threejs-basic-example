import './style.css'
import * as THREE from 'three'

function main() {
  const canvas = document.querySelector('#canvas')
  const renderer = new THREE.WebGLRenderer({canvas})

  const fov = 25
  const aspect = 2
  const near = 0.1
  const far = 50
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)

  camera.position.z = 10

  const scene = new THREE.Scene()

  const makeInstance = (geometry, color, x) => {
    const material = new THREE.MeshPhongMaterial({color})
    const cube = new THREE.Mesh(geometry, material)

    cube.position.x = x

    scene.add(cube)

    return cube
  }

  const box = {
    width: 1,
    height: 1,
    depth: 1
  }

  const geometry = new THREE.BoxGeometry(box.width, box.height, box.depth)

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

  const render = (time) => {
    time *= 0.001

    cubes.forEach((cube, index) => {
      const speed = 1 + index * 0.1
      const rotation = time * speed

      cube.rotation.x = rotation
      cube.rotation.y = rotation
    })

    renderer.render(scene, camera)

    requestAnimationFrame(render)
  }

  requestAnimationFrame(render)
}

main()
