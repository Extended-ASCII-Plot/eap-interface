import { ascii } from '../utils/encoding'
import Dot from './dot'

export default function Text(props: { value?: Uint8Array | string; color?: bigint }) {
  return (
    <>
      {props.value
        ? Array.from(typeof props.value === 'string' ? Buffer.from(props.value) : props.value).map(
            (char, index) => (
              <Dot key={`${index}${char}`} value={ascii[char]} color={props.color} />
            ),
          )
        : null}
    </>
  )
}
