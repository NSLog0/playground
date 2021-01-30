import Particle from "./Particle"

export default function generateParticle(options: IGenerateOption) {
  const items: Array<Particle> = []

  for(let i =0; i <= options.total; i++) {
    let size = (Math.random() * 6) + 2
    let x = (Math.random() * ((window.innerWidth - size * 2) - (size * 2)) + size * 2)
    let y = (Math.random() * ((window.innerHeight - size * 2) - (size * 2)) + size * 2)
    let positionVec2: IVector2D = { x: (Math.random() * 5) - 2.5, y: (Math.random() * 5) - 2.5 }

    items.push(new Particle(x, y, positionVec2, size, options.color, options.canvas, options.mouse, options.ctx, options.hideDot))
  }

  return items
}
