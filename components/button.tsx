import { css } from '@emotion/css'
import Border from './border'
import Text from './text'

export default function Button(props: {
  children: string
  onClick: () => void
  disabled?: boolean
}) {
  const color = props.disabled ? 0x60 : 0x70

  return (
    <button
      onClick={props.onClick}
      className={css`
        border: none;
        outline: none;
        padding: 0;
        cursor: var(${props.disabled ? '--cursor-default' : '--cursor-pointer'});
      `}
    >
      <Border color={color} width={props.children.length + 2} height={3}>
        <Text color={color}>{props.children}</Text>
      </Border>
    </button>
  )
}
