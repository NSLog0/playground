'use strict'

import imageLoader from './components/imagesLoader';
import Stats from "stats.js";

import './App.scss'
import Particle from './components/Particle';

const image = new Image()
const canvas: HTMLCanvasElement = document.getElementById("ctx") as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;
const stats = new Stats()
const mouse: MouseProp = {
  x: null,
  y: null,
  r: 50
}

let particles: Array<Particle> = []

function getPixel(x, y, width, offset) {
  const ch = 4

  return (x * ch + y * ch * width) + offset
}

function positionXY(axis: number, wrapSize: number, imageSize: number) {
  const offset = 2
  return axis + wrapSize / offset - imageSize * offset
}

function createParticle(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, mouse: MouseProp, imageData: ImageData) {
  const item: Array<Particle> = []

  for (let y = 0, y2 = imageData.height; y < y2; y++) {
    for (let x = 0, x2 = imageData.width; x < x2; x++) {
      if (imageData.data[getPixel(x, y, imageData.width, 3)] > 128) {
        const posX = positionXY(x * 4, canvas.width, imageData.width)
        const posY = positionXY(y * 4, canvas.height, imageData.height)

        const r = imageData.data[getPixel(x, y, imageData.width, 0)]
        const g = imageData.data[getPixel(x, y, imageData.width, 1)]
        const b = imageData.data[getPixel(x, y, imageData.width, 2)]
        
        item.push(new Particle(posX, posY, 1, `rgb(${r}, ${g}, ${b})`, ctx, mouse))
      }
    }
  }

  return item
}

function animate () {
  ctx.fillStyle = 'rgb(0, 0, 0, 0.5)'
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
  requestAnimationFrame(animate)

  for (let i = 0; i < particles.length; i++) {
    particles[i].update()
  }
}

function drawImage(ctx) {
  const data = ctx.getImageData(0, 0, image.width, image.height)
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  return data
}

canvas.width = window.innerWidth
canvas.height = window.innerHeight


window.addEventListener('mousemove', (e) => {
  mouse.x = e.x + canvas.clientLeft / 2
  mouse.y = e.y + canvas.clientTop / 2

  for (let i = 0; i < particles.length; i++) {
    particles[i].pointer = mouse
  }
})

image.src = imageLoader()
document.body.appendChild(stats.dom)

window.addEventListener('load', () => {
  ctx.drawImage(image, 0, 0)
  const dataPixel = drawImage(ctx)

  particles = createParticle(canvas, ctx, mouse, dataPixel)
  animate()
})

