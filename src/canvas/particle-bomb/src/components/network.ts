import rgba from "./helpers/rgba";
import Particle from "./Particle";

class Network {
  #ctx: CanvasRenderingContext2D
  #particles: Array<Particle>
  #color: string
  #OFFSET_DISTANCE = 120

  constructor(
    ctx: CanvasRenderingContext2D,
    particles: Array<Particle>,
    color: string
  ) {
    this.#ctx = ctx
    this.#particles = particles
    this.#color = color
  }



  draw() {
    for (var i = 0; i < this.#particles.length; i++) {
      for (var j = this.#particles.length - 1; j > i; j--) {
        var distance = Math.sqrt(
          Math.pow(this.#particles[i].x - this.#particles[j].x, 2)
          + Math.pow(this.#particles[i].y - this.#particles[j].y, 2)
        );
        if (distance > this.#OFFSET_DISTANCE) {
          continue;
        }

        this.#ctx.beginPath();
        this.#ctx.strokeStyle = rgba(this.#color, (this.#OFFSET_DISTANCE - distance) / this.#OFFSET_DISTANCE)
        this.#ctx.lineWidth = 1;
        this.#ctx.moveTo(this.#particles[i].x, this.#particles[i].y);
        this.#ctx.lineTo(this.#particles[j].x, this.#particles[j].y);
        this.#ctx.stroke();
      }
    }
  }
}

export default Network
