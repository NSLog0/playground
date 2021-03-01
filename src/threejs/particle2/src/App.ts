import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module.js'

import fragment from './sharders/fragment.glsl'
import vertex from './sharders/vertex.glsl'

import './App.scss'

import pattern from './images/star_wars.jpeg'

function init() {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 3000)
  const renderer = new THREE.WebGLRenderer({ antialias: true });

  new OrbitControls(camera, renderer.domElement)

  const stats = new Stats();

  document.body.appendChild( stats.dom );

  camera.position.z = 200
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.render(scene, camera)

  return { camera , scene, renderer, stats }
}

const dimension = {
  x: 400,
  y: 711,
}

const aOffset = new THREE.BufferAttribute(new Float32Array(400 * 711), 1)
const aSpeed = new THREE.BufferAttribute(new Float32Array(400 * 711), 1)

const uniforms = {
  time: { value: 0.0 },
  resolution: { value: new THREE.Vector4() },
  uTexture: { value: new THREE.TextureLoader().load(pattern)},
  uMouse: { value: new THREE.Vector2() },
}

const geometry = new THREE.PlaneBufferGeometry(dimension.x * 0.56, dimension.y * 0.56, dimension.x, dimension.y);
const material = new THREE.ShaderMaterial({
    uniforms,
    side: THREE.DoubleSide,
    fragmentShader: fragment,
    vertexShader: vertex
  })

function createParticle(geo: THREE.PlaneBufferGeometry, mat: THREE.ShaderMaterial) {
  return new THREE.Points(geo, mat)
}

function rand(a: number, b: number): number {
  return a + (b - a) * Math.random()
}

let idx = 0
for(let i = 0; i < dimension.x; i++) {
  for(let i = 0; i < dimension.x; i++) {
    aSpeed.setX(idx, rand(0.4, 1.0))
    idx++
  }
}

const { camera , scene, renderer, stats } = init()

geometry.setAttribute('aSpeed', aSpeed)

const particle = createParticle(geometry, material)

function animate() {
  stats.begin()
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
  stats.end()
}

window.addEventListener("mousemove", function(event) {
  uniforms.uMouse.value.x = (event.clientX / window.innerWidth) * 2 - 1;
  uniforms.uMouse.value.y = -(event.clientY / window.innerHeight) * 2 + 1;
}, false)

scene.add(particle)
document.getElementById('root')?.appendChild(renderer.domElement)
animate()
