export function colorize(value: bigint, color?: bigint): bigint {
  return color === undefined ? value : (value & 0xffffffffffff_0000n) | color
}

export function colorize2(value: number, color: number = 0x70): number {
  return (value << 8) | color
}

export function color2Hex(color: bigint): string {
  const red = (color & 0xf000n) >> 12n
  const green = (color & 0x0f00n) >> 8n
  const blue = (color & 0x00f0n) >> 4n
  return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`
}

export function color2Opacity(color: bigint): number {
  return parseInt((color & 0x000fn).toString(), 10) / 0xf
}
