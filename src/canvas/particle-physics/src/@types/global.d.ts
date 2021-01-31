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

interface IImageProp {
  w: number
  h: number
}
