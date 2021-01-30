import * as dat from 'dat.gui';
import Stats from "stats.js";

import Particle from "./components/Particle";
import generateParticle from "./components/generateParticle";
import './App.scss'
import Network from './components/network';

const PARTICLE_OFFSET = 8000
const MOUSE_AREA = 120;

const gui = new dat.GUI();
const canvas: HTMLCanvasElement = document.getElementById("ctx") as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;
const mouse: MouseProp = {
  x: null,
  y: null,
  r: ((window.innerWidth / MOUSE_AREA) * (window.innerHeight / MOUSE_AREA))
}

let particles: Array<Particle> = []

var stats = new Stats()
document.body.appendChild(stats.dom)


canvas.width = window.innerWidth
canvas.height = window.innerHeight

function handlePointer() {
  for (let i = 0; i < particles.length; i++) {
    particles[i].pointer= mouse
  }
}

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x
  mouse.y = e.y

  handlePointer()
});

window.addEventListener("mouseout", () => {
  mouse.x = undefined
  mouse.y = undefined

  handlePointer()
});

const particleOption: IGenerateOption = {
  mouse,
  total: (canvas.height * canvas.width) / PARTICLE_OFFSET,
  color: '#fdfdfd',
  canvas,
  ctx,
  hideDot: false,
}

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  mouse.r = ((canvas.height / MOUSE_AREA) * (canvas.width / MOUSE_AREA))
  init()
})

function init() {
  particles = generateParticle(particleOption)
}

function animate() {
  stats.begin();
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

  for (let i = 0; i < particles.length; i++) {
    particles[i].updateMovement();
  }

  (new Network(ctx, particles, '#fff')).draw()
  stats.end();

  requestAnimationFrame(animate)
}

init()
animate()

gui.add(particleOption, 'total', 50, 400).onChange(() => {
  init()
})

gui.add(particleOption, 'hideDot').onChange((value)=> {
  for (let i = 0; i < particles.length; i++) {
    particles[i].hideDot = value
  }
})

gui.addColor(particleOption, 'color').onChange((value)=> {
  for (let i = 0; i < particles.length; i++) {
    particles[i].color = value
  }
})

