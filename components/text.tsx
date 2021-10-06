import { ASCII } from '../utils/constants'
import Dot from './dot'

export default function Text(props: { children?: Uint8Array | string; color?: bigint }) {
  return (
    <>
      {props.children
        ? Array.from(
            typeof props.children === 'string' ? Buffer.from(props.children) : props.children,
          ).map((char, index) => (
            <Dot key={`${index}${char}`} value={ASCII[char]} color={props.color} />
          ))
        : null}
    </>
  )
}
