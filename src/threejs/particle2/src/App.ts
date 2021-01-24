import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import fragment from './sharders/fragment.glsl'
import vertex from './sharders/vertex.glsl'

import './App.scss'

import patten from './images/star_wars.jpeg'

function init() {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 5000)
  const renderer = new THREE.WebGLRenderer({ antialias: true });

  new OrbitControls(camera, renderer.domElement)

  camera.position.z = 500
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.render(scene, camera)

  return { camera , scene, renderer }
}

function createParticle() {

  const material = new THREE.ShaderMaterial({
    extensions: {
      derivatives: true,
    },
    uniforms: {
      time: {  value: 0 },
      resolution: { value: new THREE.Vector4() }
      texture1: { value: new THREE.TextureLoader().load(patten)},
    },
    side: THREE.DoubleSide,
    fragmentShader: fragment,
    vertexShader: vertex
  })
  const geometry = new THREE.PlaneBufferGeometry(500*.5, 889*.5, 500, 889)

  return new THREE.Points(geometry, material)
}

const { camera , scene, renderer }= init()
const particle = createParticle()

function animate() {
  requestAnimationFrame(animate)

  renderer.render(scene, camera)
}

scene.add(particle)
document.getElementById('root')?.appendChild(renderer.domElement)
animate()
