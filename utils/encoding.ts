export const ascii =
  typeof window === 'undefined'
    ? await (await import('../pages/api/ascii')).getAscii()
    : await fetch('/api/ascii')
        .then((response) => response.text())
        .then((base64) => new BigUint64Array(Buffer.from(base64, 'base64').buffer))

export function colorize(value: bigint, color?: bigint): bigint {
  return color === undefined ? value : (value & 0xffffffffffff_0000n) | color
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
