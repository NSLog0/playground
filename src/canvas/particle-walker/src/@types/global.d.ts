declare global {
  interface Window {
    innerHeight: any
    innerWidth: any
  }
}

interface IVector2D {
  x: number | null;
  y: number | null;
}

interface IMouse {
  r: number | null;
}

type MouseProp = IVector2D & IMouse;

interface IGenerateOption {
  mouse: MouseProp
  total: number
  color: string
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  hideDot: boolean
}

interface IParticle {
  update(ctx: CanvasRenderingContext2D, width: number, height: number): void
  draw(ctx: CanvasRenderingContext2D): void
}

interface IConstructorParticle {
  new (
    x: number,
    y: number,
    size: number,
    color: string,
  ): IParticle
}

interface IRGB {
  r: number
  g: number
  b: number
}
