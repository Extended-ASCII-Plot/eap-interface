import { ascii } from '../utils/encoding'
import Dot from './dot'

export default function Text(props: { children?: Uint8Array | string; color?: bigint }) {
  return (
    <>
      {props.children
        ? Array.from(
            typeof props.children === 'string' ? Buffer.from(props.children) : props.children,
          ).map((char, index) => (
            <Dot key={`${index}${char}`} value={ascii[char]} color={props.color} />
          ))
        : null}
    </>
  )
}
