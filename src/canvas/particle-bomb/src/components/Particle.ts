class Particle implements IParticle {
  #x: number
  #y: number
  #size: number
  #color: string
  #life: number
  #originLife: number
  #globalAlpha = Math.random() * Math.random() * Math.random()

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
    this.#life = Math.floor((Math.random() * 500) + 1)
    this.#originLife = this.#life
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    // ctx.globalAlpha = this.#globalAlpha
    ctx.globalCompositeOperation = 'lighter'
    ctx.beginPath()
    ctx.arc(this.#x, this.#y, this.#size, 0, Math.PI * 2, false)
    ctx.fillStyle = this.gradient(ctx)
    ctx.fill();
    ctx.closePath()
    ctx.restore();
  }

  gradient(ctx: CanvasRenderingContext2D) {
    const radialContent = ctx.createRadialGradient(this.#x, this.#y, 0, this.#x, this.#y, this.#size);

    radialContent.addColorStop(0, `rgba(${this.#color}, 1)`)
    radialContent.addColorStop(0.1, `rgba(${this.#color}, 0.1)`)
    radialContent.addColorStop(1, `rgba(${this.#color}, 0)`)

    return radialContent;
  }

  update(ctx: CanvasRenderingContext2D, width: number, height: number) {
    this.updateGloblaAlpha()
    this.lifeUpdate()
    this.move(width, height)

    if (this.#life < 0) {
      this.#x = Math.random() * width
      this.#y = Math.random() * height
      this.#life = Math.floor((Math.random() * 500) + 1)
    }

    this.draw(ctx)
  }

  updateGloblaAlpha () {
    const ratio = this.#life / this.#originLife;

    this.#globalAlpha = this.#globalAlpha * ratio * 1.3;
  }

  lifeUpdate() {
    this.#life -= 1;
  }

  move(width: number, height: number) {
    const _x = width / 2 - this.#x
    const _y = height / 2 - this.#y
    this.#x += _x / 25
    this.#y += _y / 25;
  }
}

export default Particle
