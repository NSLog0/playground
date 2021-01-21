import * as THREE from 'three'

import './App.scss'

function init() {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1500)
  const renderer = new THREE.WebGLRenderer({ antialias: true });

  camera.position.z = 10
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.render(scene, camera)

  return { camera , scene, renderer }
}

function createPointLight(color: any) {
  const sphere = new THREE.SphereBufferGeometry(0.05, 20, 20);
  const light = new THREE.PointLight(color, Math.random(), 25, 0.4);

  light.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color } ) ) );

  return light
}

function createSpotLight() {
  const spotLight = new THREE.SpotLight(0xa1a1a1);

  spotLight.position.set(-0, 30, 40);
  spotLight.castShadow = true;
  spotLight.intensity = 0.8;

  return spotLight
}

function createMesh() {
  const geometry = new THREE.BoxBufferGeometry(1.7, 1.7, 1.7);
  const material = new THREE.MeshPhongMaterial({ color: 0xffffff });
  const mesh = new THREE.Mesh( geometry, material );

  return mesh
}

const { camera , scene, renderer }= init()
const mesh = createMesh()
const pLightColors = [0xff4757, 0xff9f43, 0x5f27cd, 0x7bed9f]
const pLights = pLightColors.map((color) => createPointLight(color))

function animate() {
  requestAnimationFrame(animate)

  mesh.rotation.x += 0.01
  mesh.rotation.y += 0.01

  const time = Date.now() * 0.002;
  const d = 4;

  pLights[0].position.x = Math.sin(time * 0.4) * d
  pLights[0].position.z = Math.cos(time * 1.2) * d
  pLights[0].position.y = Math.cos(time * 0.3) * d

  pLights[1].position.y = Math.cos(time * 0.2) * d
  pLights[1].position.x = Math.sin(time * 0.3) * d
  pLights[1].position.z = Math.sin(time * 0.2) * d

  pLights[2].position.x = Math.sin( time * 0.7 ) * d
  pLights[2].position.z = Math.cos( time * 0.5 ) * d

  pLights[3].position.y = Math.sin( time * 0.2 ) * d
  pLights[3].position.z = Math.sin( time * 0.7 ) * d

  renderer.render(scene, camera)
}

const sligth = createSpotLight()
scene.add(sligth)
pLights.map(x => { scene.add(x) })
scene.add(mesh);
document.getElementById('root')?.appendChild(renderer.domElement)
animate()
