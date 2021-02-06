'use strict'
import * as dat from 'dat.gui';

import imageLoader from './components/imagesLoader';
import './App.scss'
import Particle from './components/Particle';

const gui = new dat.GUI();
const image = new Image()
const canvas: HTMLCanvasElement = document.getElementById("ctx") as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;
const mouse: MouseProp = {
  x: null,
  y: null,
  r: 100
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

function createParticle(canvas: HTMLCanvasElement, mouse: MouseProp, imageData: ImageData) {
  const item: Array<Particle> = []

  for (let y = 0, y2 = imageData.height; y < y2; y++) {
    for (let x = 0, x2 = imageData.width; x < x2; x++) {
      if (imageData.data[getPixel(x, y, imageData.width, 3)] > 128) {
        const posX = positionXY(x * 4, canvas.width, imageData.width)
        const posY = positionXY(y * 4, canvas.height, imageData.height)

        const r = imageData.data[getPixel(x, y, imageData.width, 0)]
        const g = imageData.data[getPixel(x, y, imageData.width, 1)]
        const b = imageData.data[getPixel(x, y, imageData.width, 2)]

        item.push(new Particle(posX, posY, 2, `rgb(${r}, ${g}, ${b})`, mouse))
      }
    }
  }

  return item
}

let frame = null

function animate () {
  frame = requestAnimationFrame(animate)
  ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'
  ctx.fillRect(0,0, canvas.width, canvas.height)

  for (let i = 0; i < particles.length; i++) {
    particles[i].update(ctx)
  }
}

function drawImage(ctx) {
  const data = ctx.getImageData(0, 0, image.width, image.height)
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  return data
}

canvas.width = window.innerWidth
canvas.height = window.innerHeight

function updatePointer() {
  for (let i = 0; i < particles.length; i++) {
    particles[i].pointer = mouse
  }
}

function onMouseMove(evt) {
  const e = (evt.touches && evt.touches[0]) || evt;
  mouse.x = e.clientX;
  mouse.y = e.clientY;

  updatePointer()
}

function onMouseLeave() {
  mouse.x = null;
  mouse.y = null;

  updatePointer()
}

window.addEventListener('mousemove', (e) => {
  onMouseMove(e)
})

window.addEventListener('touchmove', (e) => {
  e.preventDefault()
  e.stopPropagation()
  onMouseMove(e);
}, {passive: false});

window.addEventListener('mouseleave', onMouseLeave);
window.addEventListener('touchend', onMouseLeave);
window.addEventListener('touchcancel', onMouseLeave);

const data = {
  imageName: 'logo'
}

function init() {
  ctx.drawImage(image, 0, 0)
  dataPixel = drawImage(ctx)
  particles = []
  particles = createParticle(canvas, mouse, dataPixel)

  animate()
}

image.src = imageLoader(data.imageName)
image.onload = init

let dataPixel  = null

gui.add(data, 'imageName', [ 'logo', 'jedi' ]).onChange((value) => {
  cancelAnimationFrame(frame)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  image.src = imageLoader(value)
})

