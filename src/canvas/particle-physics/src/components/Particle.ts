class Particle {
  #x: number
  #y: number
  #size: number
  #color: string
  #originX: number
  #originY: number
  #pointer: MouseProp
  #maxDistanceToMove = 50
  #density = (Math.random() * 10) + 300

  constructor(
    x: number,
    y: number,
    size: number,
    color: string,
    pointer: MouseProp,
  ) {
    this.#x = x
    this.#y = y
    this.#size = size
    this.#color = color
    this.#originX = x
    this.#originY = y
    this.#pointer = pointer
  }

  set pointer(pointer: MouseProp) {
    this.#pointer = pointer
  }

  draw(ctx) {
    ctx.fillStyle = this.#color
    ctx.beginPath()
    ctx.arc(this.#x, this.#y, this.#size, 0, Math.PI * 2)
    ctx.closePath()
    ctx.fill()
  }

  update(ctx) {
    let dx = this.#pointer.x - this.#x;
    let dy = this.#pointer.y - this.#y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    let forceDirectionX = dx / distance;
    let forceDirectionY = dy / distance;
    let force = (this.#maxDistanceToMove - distance) / this.#maxDistanceToMove;

    let directionX = forceDirectionX * force * this.#density;
    let directionY = forceDirectionY * force * this.#density;

    if(distance < this.#pointer.r) {
      this.#x -= directionX;
      this.#y -= directionY;
    }
    else {
      if(this.#x !== this.#originX) {
        let dx = this.#x - this.#originX;
        this.#x -= dx / 10;
      }

      if(this.#y !== this.#originY) {
        let dy = this.#y - this.#originY;
        this.#y -= dy / 10;
      }
    }


    this.draw(ctx)
  }
}

export default Particle
