export function colorize(value: number, color: number = 0x70): number {
  return (value << 8) | color
}
