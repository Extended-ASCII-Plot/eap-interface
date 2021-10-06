import { css, cx } from '@emotion/css'
import { forwardRef, HTMLAttributes } from 'react'
import { FONT_HEIGHT, FONT_SCALE_FACTOR, FONT_WIDTH } from '../utils/constants'

export default forwardRef<
  HTMLDivElement,
  {
    width?: number
    height?: number
    x?: number
    y?: number
  } & HTMLAttributes<HTMLDivElement>
>(function Box(props, ref) {
  const { width, height, x, y, className, ...restProps } = props

  return (
    <div
      ref={ref}
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
})
