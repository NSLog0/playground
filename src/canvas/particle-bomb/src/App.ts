import Particle from "./components/Particle";
import './App.scss'

const canvas: HTMLCanvasElement = document.getElementById("ctx") as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;
const maxParticle = 180

let particles: Array<Particle> = []

canvas.width = window.innerWidth
canvas.height = window.innerHeight

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  particles = []
  particles = init(canvas)
})

function init(canvas: HTMLCanvasElement) {
  const item = []

  for (let i = 0; i < 10; i++) {
    item.push(new Particle(
      canvas.width * Math.random(),
      canvas.height * Math.random(),
      i * 3,
      '255, 107, 107'
    ))
  }

  return item
}

setInterval(() => {
  if(particles.length < maxParticle) {
    particles.push(new Particle(
      canvas.width * Math.random(),
      canvas.height * Math.random(),
      particles.length * 2,
      '255, 107, 107'
    ))
  }
}, 160)

function animate() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
  requestAnimationFrame(animate)

  for (let i = 0; i < particles.length; i++) {
    particles[i].update(ctx, window.innerWidth, window.innerHeight)
  }
}

particles = init(canvas)
animate()
