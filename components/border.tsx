import { css } from '@emotion/css'
import type { ReactNode } from 'react'
import React from 'react'
import { FONT_HEIGHT, FONT_SCALE_FACTOR, FONT_WIDTH } from '../utils/constants'
import { ascii } from '../utils/encoding'
import Box from './box'
import Dot from './dot'

const defaultBorder: [
  [bigint, bigint, bigint],
  [bigint, bigint, bigint],
  [bigint, bigint, bigint],
] = [
  [ascii[0x89], ascii[0x96], ascii[0x8a]],
  [ascii[0x86], ascii[0x20], ascii[0x86]],
  [ascii[0x99], ascii[0x96], ascii[0x9a]],
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
  value?: [[bigint, bigint, bigint], [bigint, bigint, bigint], [bigint, bigint, bigint]]
  color?: bigint
  children?: ReactNode
}) {
  const { value = defaultBorder, color } = props

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
        <Dot key={index} value={value[0][1]} color={color} top={0} left={index + 1} />
      ))}
      {Array.from({ length: props.width - 2 }).map((_, index) => (
        <Dot key={index} value={value[2][1]} color={color} bottom={0} left={index + 1} />
      ))}
      {Array.from({ length: props.height - 2 }).map((_, index) => (
        <Dot key={index} value={value[1][0]} color={color} top={index + 1} left={0} />
      ))}
      {Array.from({ length: props.height - 2 }).map((_, index) => (
        <Dot key={index} value={value[1][2]} color={color} top={index + 1} right={0} />
      ))}
      <Dot value={value[0][0]} color={color} top={0} left={0} />
      <Dot value={value[0][2]} color={color} top={0} right={0} />
      <Dot value={value[2][0]} color={color} bottom={0} left={0} />
      <Dot value={value[2][2]} color={color} bottom={0} right={0} />
      <Box
        width={props.width - 2}
        height={props.height - 2}
        x={1}
        y={1}
        className={css`
          background-image: url('/dot/${value[1][1].toString()}');
          background-repeat: repeat;
        `}
      >
        {props.children}
      </Box>
    </Box>
  )
}
