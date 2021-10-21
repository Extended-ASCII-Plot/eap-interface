import { css } from '@emotion/css'
import { memo, ReactNode } from 'react'
import { colorize } from '../utils/encoding'
import Dot from './dot'
import Box from './box'

const defaultBorder: [[number, number, number], [number, null, number], [number, number, number]] =
  [
    [0x89, 0x96, 0x8a],
    [0x86, null, 0x86],
    [0x99, 0x96, 0x9a],
  ]

export default memo(function Border(props: {
  width: number
  height: number
  /**
   * [
   *   [top-left   , top-center   , top-right   ],
   *   [middle-left, ignored      , middle-right],
   *   [bottom-left, bottom-center, bottom-right],
   * ]
   */
  value?: [[number, number, number], [number, null, number], [number, number, number]]
  color?: number
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
        <Dot key={index} value={colorize(value[0][1], props.color)} top={0} left={index + 1} />
      ))}
      {Array.from({ length: props.width - 2 }).map((_, index) => (
        <Dot key={index} value={colorize(value[2][1], props.color)} bottom={0} left={index + 1} />
      ))}
      {Array.from({ length: props.height - 2 }).map((_, index) => (
        <Dot key={index} value={colorize(value[1][0], props.color)} top={index + 1} left={0} />
      ))}
      {Array.from({ length: props.height - 2 }).map((_, index) => (
        <Dot key={index} value={colorize(value[1][2], props.color)} top={index + 1} right={0} />
      ))}
      <Dot value={colorize(value[0][0], props.color)} top={0} left={0} />
      <Dot value={colorize(value[0][2], props.color)} top={0} right={0} />
      <Dot value={colorize(value[2][0], props.color)} bottom={0} left={0} />
      <Dot value={colorize(value[2][2], props.color)} bottom={0} right={0} />
      <Box width={props.width - 2} height={props.height - 2} x={1} y={1}>
        {props.children}
      </Box>
    </Box>
  )
})
