import { css } from '@emotion/css'
import Border from './border'
import Text from './text'

export default function Button(props: {
  children: string
  onClick?: () => void
  disabled?: boolean
}) {
  const color = props.disabled ? 0x50 : 0x70

  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className={css`
        border: none;
        outline: none;
        padding: 0;
        cursor: var(${props.disabled ? '--cursor-default' : '--cursor-pointer'});
      `}
    >
      <Border
        color={color}
        width={props.children.length + 2}
        height={3}
        value={[
          [0x8b, 0x96, 0x8c],
          [0x86, null, 0x86],
          [0x9b, 0x96, 0x9c],
        ]}
      >
        <Text color={color}>{props.children}</Text>
      </Border>
    </button>
  )
}
