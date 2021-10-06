import { colorize2 } from '../utils/encoding'
import AsciiDot from './ascii-dot'

export default function Text(props: { children?: Uint8Array | string; color?: number }) {
  return (
    <>
      {props.children
        ? Array.from(
            typeof props.children === 'string' ? Buffer.from(props.children) : props.children,
          ).map((char, index) => (
            <AsciiDot key={`${index}${char}`} value={colorize2(char, props.color || 7 << 4)} />
          ))
        : null}
    </>
  )
}
