'use strict'

import imageLoader from './components/imagesLoader';
import Stats from "stats.js";

import './App.scss'
import Particle from './components/Particle';

const image = new Image()

function init() {
  const canvas: HTMLCanvasElement = document.getElementById("ctx") as HTMLCanvasElement;
  const ctx: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;
  const stats = new Stats()
  const mouse: MouseProp = {
    x: null,
    y: null,
    r: ((window.innerWidth / 20) * (window.innerHeight / 20))
  }

  let particles: Array<Particle> = []
  let pixels

  function positionXY(axis: number, wrapSize: number, imageSize: number) {
    const offset = 2
    return axis + wrapSize / offset - imageSize * offset
  }

  function getPixel(x, y, width, offset) {
    const ch = 4
    return (y * ch * width) + (x * ch) + offset
  }

  function createParticle(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, mouse: MouseProp, pixels: ImageData) {
    const item: Array<Particle> = []

    for (let y = 0; y < pixels.height; y++) {
      for (let x = 0; x < pixels.width; x++) {
        // console.log(pixels[(y * 4 * pixels.width) + (x * 4) + 3] > 128)
        if (pixels.data[getPixel(x, y, pixels.width, 3)] > 128) {
          const posX = positionXY(x, canvas.width, pixels.width)
          const posY = positionXY(y, canvas.height, pixels.height)
          const r = pixels.data[getPixel(x, y, pixels.width, 0)]
          const g = pixels.data[getPixel(x, y, pixels.width, 1)]
          const b = pixels.data[getPixel(x, y, pixels.width, 2)]

          item.push(new Particle(posX, posY, 3, `rgb(${r}, ${g}, ${b})`, ctx, mouse))
        }
      }
    }

    return item
  }
let t = new Particle(200, 600, 10, `rgb(255,0,0)`, ctx, mouse)
  function animate (particles: Array<Particle>) {
    requestAnimationFrame(() => animate(particles))
    t.update()

    // ctx.fillStyle = 'rgb(0, 0, 0, 0.05)'
    // ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    // for (let i = 0; i < particles.length; i++) {
    //   particles[i].update()
    // }

  }

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  ctx.drawImage(image, 0, 0, image.width, image.height)
  pixels = ctx.getImageData(0, 0, image.width, image.height)
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.x
    mouse.y = e.y
    t.pointer = mouse
   })
  // particles = createParticle(canvas, ctx, mouse, pixels)
  animate(particles)

  document.body.appendChild(stats.dom)
}

image.src = imageLoader()
image.onload = init
