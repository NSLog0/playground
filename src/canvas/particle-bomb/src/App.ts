import Stats from "stats.js";

import Particle from "./components/Particle";
import './App.scss'
import { add } from "ramda";

const canvas: HTMLCanvasElement = document.getElementById("ctx") as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;
const maxParticle = 100



const result = add(1, 2)








let particles: Array<Particle> = []

canvas.width = window.innerWidth
canvas.height = window.innerHeight

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  particles = []
  particles = init(canvas)
})

const stats = new Stats()
document.body.appendChild(stats.dom)

function init(canvas: HTMLCanvasElement) {
  const item = []

  for (let i = 0; i < 10; i++) {
    item.push(new Particle(
      canvas.width * Math.random(),
      canvas.height * Math.random(),
      i,
    ))
  }

  return item
}

const timer = setInterval(() => {
  if(particles.length < maxParticle) {
    particles.push(new Particle(
      canvas.width * Math.random(),
      canvas.height * Math.random(),
      particles.length,
    ))
  }
}, 200)

function animate() {
  stats.begin()
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
  requestAnimationFrame(animate)
  if(particles.length === maxParticle) {
    clearInterval(timer)
  }

  for (let i = 0; i < particles.length; i++) {
    particles[i].update(ctx, window.innerWidth, window.innerHeight)
  }
  stats.end()
}

particles = init(canvas)
animate()
