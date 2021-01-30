class Particle {
  #x: number
  #y: number
  #positionVec2: IVector2D
  #size: number
  #color: string
  #sizeOffset = 10
  #canvas: HTMLCanvasElement
  #pointer: MouseProp
  #ctx: CanvasRenderingContext2D
  #hideDot: boolean

  constructor(
    x: number,
    y: number,
    positionVec2: IVector2D,
    size: number,
    color: string,
    canvas: HTMLCanvasElement,
    pointer: MouseProp,
    ctx: CanvasRenderingContext2D,
    hideDot: boolean
  ) {
    this.#x = x
    this.#y = y
    this.#positionVec2 = positionVec2
    this.#size = size
    this.#color = color
    this.#canvas = canvas
    this.#pointer = pointer
    this.#ctx = ctx
    this.#hideDot = hideDot
  }

  set pointer(vec2: MouseProp) {
    this.#pointer = vec2
  }

  get x(): number {
    return this.#x
  }

  get y(): number {
    return this.#y
  }

  set hideDot(v: boolean) {
    this.#hideDot = v
  }

  set color(v: string) {
    this.#color = v
  }

  draw() {
    this.#ctx.beginPath()
    this.#ctx.arc(this.#x, this.#y, this.#size, 0, Math.PI * 2, true)
    this.#ctx.fillStyle = this.#color
    this.#ctx.fill()

    if(this.#hideDot) {
      this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    }
  }

  updateMovement() {

    // check out off screen
    if(this.#x > this.#canvas.width || this.#x < 0) {
      this.#positionVec2.x = -this.#positionVec2.x
    }

    if(this.#y > this.#canvas.height || this.#y < 0) {
      this.#positionVec2.y = -this.#positionVec2.y
    }

    // circle collision
    // https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    let dx = this.#pointer.x - this.#x
    let dy = this.#pointer.y - this.#y
    let distance = Math.sqrt(dx * dx + dy * dy)

    if(distance < this.#pointer.r + this.#size) {
      if(this.#pointer.x < this.#x && this.#x < this.#canvas.width - this.#size * this.#sizeOffset) {
        this.#x += this.#sizeOffset
      }

      if(this.#pointer.x > this.#x && this.#x > this.#size * this.#sizeOffset) {
        this.#x -= this.#sizeOffset
      }

      if(this.#pointer.y < this.#x && this.#y < this.#canvas.height - this.#size * this.#sizeOffset) {
        this.#y += this.#sizeOffset
      }

      if(this.#pointer.y < this.#x && this.#y < this.#size * this.#sizeOffset) {
        this.#y -= this.#sizeOffset
      }
    }

    this.#x += this.#positionVec2.x
    this.#y += this.#positionVec2.y
    this.draw()
  }
}

export default Particle
