import { css } from '@emotion/css'
import { useState } from 'react'
import { FONT_HEIGHT, FONT_WIDTH, FONT_SCALE_FACTOR } from '../utils/constants'
import Box from './box'
import Text from './text'

export default function Input(props: {
  value: string
  onChange(value: string): void
  width: number
  height: number
}) {
  const [cursorX, setCursorX] = useState(0)
  const [cursorY, setCursorY] = useState(0)
  const [focused, setFocused] = useState(false)

  return (
    <Box
      width={props.width}
      height={props.height}
      tabIndex={0}
      onFocus={() => {
        setFocused(true)
      }}
      onBlur={() => {
        setFocused(false)
      }}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') {
          setCursorX((old) => (old + props.width - 1) % props.width)
        } else if (e.key === 'ArrowUp') {
          setCursorY((old) => (old + props.height - 1) % props.height)
        } else if (e.key === 'ArrowRight') {
          setCursorX((old) => (old + 1) % props.width)
        } else if (e.key === 'ArrowDown') {
          setCursorY((old) => (old + 1) % props.height)
        } else if (/^[0-9a-fA-F]$/.test(e.key)) {
          const i = cursorY * props.width + cursorX
          props.onChange(
            props.value.substring(0, i) + e.key.toUpperCase() + props.value.substring(i + 1),
          )
        }
      }}
      className={css`
        position: relative;
        cursor: var(--cursor-pointer);
      `}
    >
      <Text>{props.value}</Text>
      {focused ? (
        <i
          style={{
            left: cursorX * FONT_WIDTH * FONT_SCALE_FACTOR,
            top: cursorY * FONT_HEIGHT * FONT_SCALE_FACTOR,
          }}
          className={css`
            @keyframes blink {
              50% {
                background: transparent;
              }
            }
            position: absolute;
            animation: blink 1s step-start 0s infinite;
            width: ${FONT_WIDTH * FONT_SCALE_FACTOR}px;
            height: ${FONT_HEIGHT * FONT_SCALE_FACTOR}px;
            display: inline-block;
            background: #fff;
            mix-blend-mode: difference;
          `}
        />
      ) : null}
    </Box>
  )
}
