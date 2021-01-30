import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module.js'

import fragment from './sharders/fragment.glsl'
import vertex from './sharders/vertex.glsl'

import './App.scss'

import patten from './images/star_wars.jpeg'

function init() {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000)
  const renderer = new THREE.WebGLRenderer({ antialias: true });

  new OrbitControls(camera, renderer.domElement)

  const stats = new Stats();

  document.body.appendChild( stats.dom );

  camera.position.z = 300
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.render(scene, camera)

  return { camera , scene, renderer, stats }
}

const uniforms = {
  time: {  value: 0 },
  resolution: { value: new THREE.Vector4() },
  uTexture: { value: new THREE.TextureLoader().load(patten)},
  uMouse: { value: new THREE.Vector2() },
}

function createParticle() {
  const material = new THREE.ShaderMaterial({
    uniforms,
    side: THREE.DoubleSide,
    fragmentShader: fragment,
    vertexShader: vertex
  })
  const geometry =new THREE.PlaneBufferGeometry(400 * 0.56, 711 * 0.56, 400, 711);
  const points = new THREE.Points(geometry, material)

  return points
}

const { camera , scene, renderer, stats }= init()
const particle = createParticle()

function animate() {
  requestAnimationFrame(animate)
  stats.update()
  renderer.render(scene, camera)
}

window.addEventListener("mousemove", function(event) {
  uniforms.uMouse.value.x = (event.clientX / window.innerWidth) * 2 - 1;
  uniforms.uMouse.value.y = -(event.clientY / window.innerHeight) * 2 + 1;
}, false)

scene.add(particle)
document.getElementById('root')?.appendChild(renderer.domElement)
animate()
