import Particle from "./components/Particle";
import './App.scss'

const canvas: HTMLCanvasElement = document.getElementById("ctx") as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;

let particles: Array<Particle> = []
let isClick = false

canvas.width = window.innerWidth
canvas.height = window.innerHeight

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  particles = init(canvas, ctx)
})

const btn = document.getElementById('start') as HTMLButtonElement

btn.onclick = function() {
  isClick = !isClick
}

function init(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, number = 100) {
  const colors = ['#2185C5', '#778beb', '#FFF6E5', '#FF7F66', '#FFC312', '#1289A7', '#f7d794']
  const item = []
  const widthWithBoundery = canvas.width + 800
  const heightWithBoundery = canvas.height + 800

  for (let i = 0; i < number; i++) {
    const color = colors[Math.floor((Math.random() * colors.length))]
    const x = (Math.random() * widthWithBoundery) - widthWithBoundery / 2
    const y = (Math.random() * heightWithBoundery) - heightWithBoundery / 2
    const size = (Math.random() * 3) + 1
    item.push(new Particle(x, y, size, color))
  }

  return item
}

let radians = 0
let alpha = 1
function animate() {
  requestAnimationFrame(animate)
  ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`
  ctx.fillRect(0,0, canvas.width, canvas.height)
  ctx.save()
  ctx.translate(canvas.width / 2,canvas.height / 2)
  ctx.rotate(radians)
  particles.map(p => p.update(ctx))
  ctx.restore()

  if(isClick) {
    radians += 0.03
    if(alpha >= 0.03) alpha -= 0.006
    if(particles.length !== 1000) {
      particles = [...particles, ...init(canvas, ctx, 5)]
    }
  }

  if(!isClick && alpha < 1){
    radians += 0.02
    alpha += 0.069
  }

  if(particles.length > 100 && !isClick) {
    particles = []
    particles = init(canvas, ctx)
  }

  radians += 0.002
}

particles = init(canvas, ctx)
animate()
