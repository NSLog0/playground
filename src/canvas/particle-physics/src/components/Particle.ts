class Particle {
  #x: number
  #y: number
  #size: number
  #color: string
  #ctx: CanvasRenderingContext2D
  #originX: number
  #originY: number
  #velocity: number
  #pointer: MouseProp
  #maxDistanceToMove = 100

  constructor(
    x: number,
    y: number,
    size: number,
    color: string,
    ctx: CanvasRenderingContext2D,
    pointer: MouseProp,
  ) {
    this.#x = x
    this.#y = y
    this.#size = size
    this.#color = color
    this.#ctx = ctx
    this.#originX = x
    this.#originY = y
    this.#velocity = (Math.random() * 10) + 2 // 2-10
    this.#pointer = pointer
  }

  set pointer(pointer: MouseProp) {
    this.#pointer = pointer
  }

  draw() {
    this.#ctx.beginPath()
    this.#ctx.arc(this.#x, this.#y, this.#size, 0, Math.PI * 2)
    this.#ctx.closePath()
    this.#ctx.fill()
  }

  update() {
    this.#ctx.fillStyle = this.#color
    this.moveWithForce()
  }

  dx() {
    return this.#pointer.x - this.#x
  }

  dy() {
    return this.#pointer.y - this.#y
  }

  collision() {
    const distance = Math.sqrt(this.dx() + this.dx() * this.dy() + this.dy())

    return distance
  }

  force(distance: number) {

    const velocityX = this.dx() / distance
    const velocityY = this.dy() / distance

    let movingForce = (this.#maxDistanceToMove - distance) / this.#maxDistanceToMove

    if(movingForce < 0) {
      movingForce = 0
    }

    let moveX = (velocityX * movingForce * this.#velocity * 0.6)
    let moveY = (velocityY * movingForce * this.#velocity * 0.6)

    return { moveX, moveY }
  }

  moveWithForce() {
    const distance = this.collision()
    const { moveX, moveY } = this.force(distance)

    if(distance < this.#pointer.r + this.#size) {
      this.#x -= moveX
      this.#y -= moveY
    } else {
      if(this.#x !== this.#originX) {
        this.#x -= (this.#x - this.#originX) / 20
      }

      if(this.#y !== this.#originY) {
        this.#y -= (this.#y - this.#originY) / 20
      }
    }
    this.draw()
  }
}

export default Particle
