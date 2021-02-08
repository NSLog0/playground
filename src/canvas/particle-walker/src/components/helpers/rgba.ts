export default function rgba(hex: string, alpha: number) {
  const color = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
    ,(m, r, g, b) => '#' + r + r + g + g + b + b)
    .substring(1).match(/.{2}/g)
    .map(x => parseInt(x, 16))

  const [_r, _g, _b] = color

  return `rgba(${_r}, ${_b}, ${_g}, ${alpha})`
}
