import Stats from "stats.js";

import Particle from "./components/Particle";
import './App.scss'

const canvas: HTMLCanvasElement = document.getElementById("ctx") as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;
const color = {
  r: 72,
  g: 52,
  b: 212
}

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

  for (let i = 0; i < 100; i++) {
    item.push(
      new Particle(
        Math.random() * canvas.height,
        Math.random() * canvas.width,
        5,
        color
      )
    )
  }

  return item
}

let mode = 'lighter'
let modeTimer = 80
let directionTimer = 30

function animate() {
  stats.begin()
  modeTimer -= 1
  directionTimer -= 1
  requestAnimationFrame(animate)

  if(modeTimer < 0) {
    if(mode === 'lighter') {
      mode = 'source-over'
      ctx.globalCompositeOperation = 'source-over'
    }
    else {
      mode = 'lighter'
      ctx.globalCompositeOperation = 'lighter'
    }

    modeTimer = 20
  }
  if(directionTimer < 0){
    for (let i = 0; i < particles.length; i++) {
      particles[i].changeDirection()
    }
    directionTimer = 30
  }

  ctx.shadowBlur = 0;
  ctx.fillStyle = "rgba(0, 0, 0, 0.09)"
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.shadowColor = "rgba(246, 229, 141, 1)";
  ctx.shadowBlur = 25;

  for (let i = 0; i < particles.length; i++) {
    particles[i].update(ctx, window.innerWidth, window.innerHeight)
  }

  stats.end()
}

particles = init(canvas)
animate()
