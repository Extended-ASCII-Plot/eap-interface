import { css } from '@emotion/css'
import type { CSSProperties, ReactNode } from 'react'
import { FONT_HEIGHT, FONT_SCALE_FACTOR, FONT_WIDTH } from '../utils/constants'

export default function Flex(props: {
  width: number
  height: number
  children: ReactNode
  margin?: { top?: number; right?: number; bottom?: number; left?: number }
  direction?: CSSProperties['flexDirection']
  align?: CSSProperties['alignItems']
  justify?: CSSProperties['justifyContent']
  wrap?: CSSProperties['flexWrap']
}) {
  return (
    <div
      className={css`
        width: ${props.width * FONT_WIDTH * FONT_SCALE_FACTOR}px;
        height: ${props.height * FONT_HEIGHT * FONT_SCALE_FACTOR}px;
        margin-top: ${(props.margin?.top || 0) * FONT_HEIGHT * FONT_SCALE_FACTOR}px;
        margin-right: ${(props.margin?.right || 0) * FONT_WIDTH * FONT_SCALE_FACTOR}px;
        margin-bottom: ${(props.margin?.bottom || 0) * FONT_HEIGHT * FONT_SCALE_FACTOR}px;
        margin-left: ${(props.margin?.left || 0) * FONT_WIDTH * FONT_SCALE_FACTOR}px;
        display: flex;
        flex-direction: ${props.direction || 'unset'};
        align-items: ${props.align || 'unset'};
        justify-content: ${props.justify || 'unset'};
        flex-wrap: ${props.wrap || 'unset'};
      `}
    >
      {props.children}
    </div>
  )
}
