import * as THREE from 'three'

import './App.scss'

function init() {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 10)
  const renderer = new THREE.WebGLRenderer({ antialias: true });

  camera.position.z = 1
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setClearColor(0xffffff)
  renderer.render(scene, camera)

  return { camera , scene, renderer }
}


function createLight() {
  return new THREE.AmbientLight(0xffffff, 0.5)
}

function createPointLight() {
  new THREE.PointLight( 0xff0040, 2.5, 100, decay );
				light1.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c1 } ) ) );
				scene.add( light1 );
}

function createMesh() {
  const geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
	const material = new THREE.MeshNormalMaterial();
	const mesh = new THREE.Mesh( geometry, material );

  return mesh
}

function animate(scene: THREE.Scene, camera: THREE.Camera, renderer: THREE.WebGLRenderer, mesh: THREE.Mesh) {
  requestAnimationFrame(() => animate(scene, camera, renderer, mesh))
  mesh.rotation.x += 0.01
  mesh.rotation.y += 0.01
  renderer.render(scene, camera)
}

const { camera , scene, renderer }= init()
const mesh = createMesh()
const light = createLight()

scene.add(mesh);
scene.add(light)
document.getElementById('root')?.appendChild(renderer.domElement)
animate(scene, camera, renderer, mesh)


