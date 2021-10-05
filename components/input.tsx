import { css } from '@emotion/css'
import { useCallback, useEffect, useRef, useState } from 'react'
import getCaretCoordinates from 'textarea-caret'
import { FONT_HEIGHT, FONT_WIDTH, FONT_SCALE_FACTOR } from '../utils/constants'
import { color2Opacity, color2Hex } from '../utils/encoding'
import Box from './box'

export default function Input(props: {
  value: string
  onChange(value: string): void
  mask?: RegExp
  width: number
  color?: bigint
}) {
  const ref = useRef<HTMLTextAreaElement>(null)
  const [caret, setCaret] = useState(0)
  const [focused, setFocused] = useState(false)
  const handleCaret = useCallback(() => {
    if (ref.current) {
      const coordinates = getCaretCoordinates(
        ref.current,
        ref.current.selectionDirection === 'backward'
          ? ref.current.selectionStart
          : ref.current.selectionEnd,
      )
      setCaret(coordinates.left)
    }
  }, [])
  useEffect(() => {
    const { current } = ref
    if (!current) {
      return
    }
    current.addEventListener('click', handleCaret)
    current.addEventListener('keydown', handleCaret)
    current.addEventListener('keyup', handleCaret)
    return () => {
      current.addEventListener('click', handleCaret)
      current.removeEventListener('keydown', handleCaret)
      current.removeEventListener('keyup', handleCaret)
    }
  }, [handleCaret])
  const hex = color2Hex(props.color || 0xffffn)
  const opacity = color2Opacity(props.color || 0xffffn)

  return (
    <Box
      width={props.width}
      height={1}
      className={css`
        position: relative;
        opacity: ${opacity};
      `}
    >
      <textarea
        ref={ref}
        value={props.value}
        onChange={(e) => {
          const newValue = props.mask ? e.target.value.match(props.mask)?.[0] || '' : e.target.value
          props.onChange(newValue)
          if (newValue) {
            handleCaret()
          }
        }}
        autoCorrect="off"
        spellCheck="false"
        cols={props.width}
        rows={1}
        onFocus={() => {
          setFocused(true)
        }}
        onBlur={() => {
          setFocused(false)
        }}
        className={css`
          position: absolute;
          width: ${props.width * FONT_WIDTH * FONT_SCALE_FACTOR}px;
          height: ${1 * FONT_HEIGHT * FONT_SCALE_FACTOR}px;
          font-family: 'Kitchen Sink';
          font-size: ${FONT_HEIGHT * FONT_SCALE_FACTOR}px;
          line-height: ${FONT_HEIGHT * FONT_SCALE_FACTOR}px;
          text-shadow: none;
          letter-spacing: 0;
          display: block;
          resize: none;
          border: none;
          outline: none;
          cursor: var(--cursor-text);
          padding: 0;
          color: ${hex};
          caret-color: transparent;
          -webkit-font-smoothing: antialiased;
          overflow: hidden;
          ::selection {
            color: ${hex};
            background-color: #555;
          }
        `}
      />
      {focused ? (
        <i
          style={{
            left: caret,
          }}
          className={css`
            @keyframes blink {
              50% {
                border-bottom-color: transparent;
              }
            }
            position: absolute;
            animation: blink 1s step-start 0s infinite;
            width: ${FONT_WIDTH * FONT_SCALE_FACTOR}px;
            height: ${FONT_HEIGHT * FONT_SCALE_FACTOR}px;
            display: inline-block;
            background: transparent;
            border-bottom: ${FONT_SCALE_FACTOR}px solid lightgoldenrodyellow;
            cursor: var(--cursor-text);
          `}
        />
      ) : null}
    </Box>
  )
}
