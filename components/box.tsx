import { css, cx } from '@emotion/css'
import type { HTMLAttributes } from 'react'
import { FONT_HEIGHT, FONT_SCALE_FACTOR, FONT_WIDTH } from '../utils/constants'

export default function Box(
  props: {
    width?: number
    height?: number
    x?: number
    y?: number
  } & HTMLAttributes<HTMLDivElement>,
) {
  const { width, height, x, y, className, ...restProps } = props

  return (
    <div
      style={{
        width: width === undefined ? undefined : width * FONT_WIDTH * FONT_SCALE_FACTOR,
        height: height === undefined ? undefined : height * FONT_HEIGHT * FONT_SCALE_FACTOR,
        left: x === undefined ? undefined : x * FONT_WIDTH * FONT_SCALE_FACTOR,
        top: y === undefined ? undefined : y * FONT_HEIGHT * FONT_SCALE_FACTOR,
      }}
      className={cx(
        css`
          line-height: 0;
        `,
        x !== undefined || y !== undefined
          ? css`
              position: absolute;
            `
          : undefined,
        className,
      )}
      {...restProps}
    />
  )
}
