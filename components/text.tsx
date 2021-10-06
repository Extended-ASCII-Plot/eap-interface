import { colorize } from '../utils/encoding'
import Dot from './dot'

export default function Text(props: { children?: Uint8Array | string; color?: number }) {
  return (
    <>
      {props.children
        ? Array.from(
            typeof props.children === 'string' ? Buffer.from(props.children) : props.children,
          ).map((char, index) => (
            <Dot key={`${index}${char}`} value={colorize(char, props.color || 7 << 4)} />
          ))
        : null}
    </>
  )
}
