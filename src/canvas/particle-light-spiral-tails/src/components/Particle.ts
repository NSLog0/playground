class Particle implements IParticle {
  #x: number
  #y: number
  #size: number
  #color: string

  constructor(
    x: number,
    y: number,
    size: number,
    color: string,
  ) {
    this.#x = x
    this.#y = y
    this.#size = size
    this.#color = color
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.#x, this.#y, this.#size, 0, Math.PI * 2, false)
    ctx.shadowColor = this.#color
    ctx.shadowBlur = 12
    ctx.fillStyle = this.#color
    ctx.fill()
    ctx.closePath()
  }

  update(ctx: CanvasRenderingContext2D) {
    this.draw(ctx)
  }

}

export default Particle
