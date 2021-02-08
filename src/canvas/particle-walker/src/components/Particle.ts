class Particle implements IParticle {
  #x: number
  #y: number
  #size: number
  #color: IRGB
  #speed = 1.5
  #alpha = 1
  #alphaLoseSpeed = 0.002
  #direction = Math.floor(Math.random() * 4)
  #ROffset = 1
  #GOffset = 1
  #BOffset = 1

  constructor(
    x: number,
    y: number,
    size: number,
    color: IRGB
  ) {
    this.#x = x
    this.#y = y
    this.#size = size
    this.#color = color
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.fillStyle = `rgba(${Object.values(this.#color).join(',')},1)`
    ctx.fillRect(this.#x, this.#y, this.#size, this.#size);
    ctx.fill();
    ctx.closePath();
  }

  deduceAlpha() {
    this.#alpha -= this.#alphaLoseSpeed
  }

  reborn(width: number, height: number) {
    if(this.#alpha < 0) {
      this.#speed = 1.5
      this.#alpha = 1
      this.#x = Math.floor(Math.random() * width);
      this.#y = Math.floor(Math.random() * height);
    }
  }

  changeColor() {
    if (this.#color.r == 0 || this.#color.r == 255) this.#ROffset *= -1;
    if (this.#color.g == 0 || this.#color.g == 255) this.#GOffset *= -1;
    if (this.#color.b == 0 || this.#color.b == 255) this.#BOffset *= -1;

    this.#color.r += 1 * this.#ROffset
    this.#color.g += 1 * this.#GOffset
    this.#color.b += 1 * this.#BOffset
  }

  move() {
    if (this.#direction == 0) {
      this.#x += this.#speed;
      this.#y += this.#speed;
    }
    if (this.#direction == 1) {
      this.#x += this.#speed;
      this.#y -= this.#speed;
    }
    if (this.#direction == 2) {
      this.#x -= this.#speed;
      this.#y += this.#speed;
    }
    if (this.#direction == 3) {
      this.#x -= this.#speed;
      this.#y -= this.#speed;
    }
  }

  changeDirection(){
    var newDir = Math.floor(Math.random() * 4);
    if (this.#direction === newDir ||
      (this.#direction === 0 && newDir === 3) ||
      (this.#direction === 1 && newDir === 2) ||
      (this.#direction === 2 && newDir === 1) ||
      (this.#direction === 3 && newDir === 0)) {
      this.changeDirection();
      return;
    } else {
      this.#direction = newDir;
    }
  }

  update(ctx: CanvasRenderingContext2D, width: number, height: number) {
    this.deduceAlpha()
    this.reborn(width, height)
    this.move()
    this.draw(ctx)
  }
}

export default Particle
