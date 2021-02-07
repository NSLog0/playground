class Particle implements IParticle {
  #x: number
  #y: number
  #size: number
  #originSize: number
  #life: number
  #originLife: number
  #globalAlpha = Math.random() * Math.random() * Math.random()
  #color = '255, 107, 107'
  #sizeOffset = 4

  constructor(
    x: number,
    y: number,
    size: number,
  ) {
    this.#x = x
    this.#y = y
    this.#size = size * this.#sizeOffset
    this.#originSize = size
    this.#life = Math.floor((Math.random() * 500) + 1)
    this.#originLife = this.#life
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.globalAlpha = this.#globalAlpha
    ctx.globalCompositeOperation = 'lighter'
    ctx.beginPath()
    ctx.arc(this.#x, this.#y, this.#size, 0, Math.PI * 2, false)
    ctx.fillStyle = this.gradient(ctx)
    ctx.fill();
    ctx.closePath()
    ctx.restore();
  }

  reborn(width: number, height: number) {
    if (this.#life < 0) {
      this.#x = Math.random() * width
      this.#y = Math.random() * height
      this.#size = this.#originSize * this.#sizeOffset
      this.#globalAlpha = Math.random() * Math.random() * Math.random()
      this.#life = Math.floor((Math.random() * 500) + 1)
      this.#originLife = this.#life
    }
  }

  update(ctx: CanvasRenderingContext2D, width: number, height: number) {
    this.lifeUpdate()
    this.reborn(width, height)
    this.alpha()
    this.move(width, height)
    this.draw(ctx)
  }

  gradient(ctx: CanvasRenderingContext2D) {
    const radialContent = ctx.createRadialGradient(this.#x, this.#y, 0, this.#x, this.#y, this.#size);

    radialContent.addColorStop(0, `rgba(${this.#color}, 1)`)
    radialContent.addColorStop(0.2, `rgba(${this.#color}, 0.2)`)
    radialContent.addColorStop(1, `rgba(${this.#color}, 0)`)

    return radialContent;
  }

  alpha () {
    const ratio = this.#life / this.#originLife;

    this.#globalAlpha = this.#globalAlpha * ratio * 1.3;
  }

  lifeUpdate() {
    this.#life -= 1;
  }

  move(width: number, height: number) {
    const _x = (width /  2) - this.#x
    const _y = (height / 2) - this.#y
    this.#x += _x / 20
    this.#y += _y / 20;
  }
}

export default Particle
