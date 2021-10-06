import { css } from '@emotion/css'
import React, { ReactNode } from 'react'
import AsciiDot from './ascii-dot'
import Box from './box'

const defaultBorder: [
  [number, number, number],
  [number, number, number],
  [number, number, number],
] = [
  [0x8970, 0x9670, 0x8a70],
  [0x8670, 0x2070, 0x8670],
  [0x9970, 0x9670, 0x9a70],
]

export default function Border(props: {
  width: number
  height: number
  /**
   * [
   *   [top-left   , top-center   , top-right   ],
   *   [middle-left, background   , middle-right],
   *   [bottom-left, bottom-center, bottom-right],
   * ]
   */
  value?: [[number, number, number], [number, number, number], [number, number, number]]
  children?: ReactNode
}) {
  const { value = defaultBorder } = props

  return (
    <Box
      width={props.width}
      height={props.height}
      className={css`
        position: relative;
        background-color: black;
      `}
    >
      {Array.from({ length: props.width - 2 }).map((_, index) => (
        <AsciiDot key={index} value={value[0][1]} top={0} left={index + 1} />
      ))}
      {Array.from({ length: props.width - 2 }).map((_, index) => (
        <AsciiDot key={index} value={value[2][1]} bottom={0} left={index + 1} />
      ))}
      {Array.from({ length: props.height - 2 }).map((_, index) => (
        <AsciiDot key={index} value={value[1][0]} top={index + 1} left={0} />
      ))}
      {Array.from({ length: props.height - 2 }).map((_, index) => (
        <AsciiDot key={index} value={value[1][2]} top={index + 1} right={0} />
      ))}
      <AsciiDot value={value[0][0]} top={0} left={0} />
      <AsciiDot value={value[0][2]} top={0} right={0} />
      <AsciiDot value={value[2][0]} bottom={0} left={0} />
      <AsciiDot value={value[2][2]} bottom={0} right={0} />
      <Box
        width={props.width - 2}
        height={props.height - 2}
        x={1}
        y={1}
        className={css`
          background-image: url('/ascii-dot/${value[1][1].toString()}');
          background-repeat: repeat;
        `}
      >
        {props.children}
      </Box>
    </Box>
  )
}
