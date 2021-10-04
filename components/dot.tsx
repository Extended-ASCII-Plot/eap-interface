import { css, cx } from '@emotion/css'
import { CSSProperties, useMemo } from 'react'
import useSWR from 'swr'
import svgToMiniDataURI from 'mini-svg-data-uri'
import { FONT_HEIGHT, FONT_WIDTH, FONT_SCALE_FACTOR, MASK } from '../utils/constants'
import { color2Opacity, color2Hex, colorize } from '../utils/encoding'

export default function Dot(props: {
  value?: bigint
  color?: bigint
  top?: number
  right?: number
  bottom?: number
  left?: number
}) {
  const { data } = useSWR(
    props.value === undefined ? null : `/dot/${colorize(props.value, props.color).toString()}`,
    (url) => fetch(url).then((response) => response.text()),
    { revalidateOnFocus: false },
  )
  const style = useMemo(
    () => ({
      top: props?.top === undefined ? undefined : props.top * FONT_SCALE_FACTOR * FONT_HEIGHT,
      right: props?.right === undefined ? undefined : props.right * FONT_SCALE_FACTOR * FONT_WIDTH,
      bottom:
        props?.bottom === undefined ? undefined : props.bottom * FONT_SCALE_FACTOR * FONT_HEIGHT,
      left: props?.left === undefined ? undefined : props.left * FONT_SCALE_FACTOR * FONT_WIDTH,
    }),
    [props.bottom, props.left, props.right, props.top],
  )
  const backgroundImage = useMemo(
    () => (data === undefined ? undefined : `url("${svgToMiniDataURI(data)}")`),
    [data],
  )
  const className = cx(
    css`
      display: inline-block;
      width: ${FONT_WIDTH * FONT_SCALE_FACTOR}px;
      height: ${FONT_HEIGHT * FONT_SCALE_FACTOR}px;
      background-repeat: no-repeat;
      background-position: 0 0;
    `,
    props.top !== undefined ||
      props.right !== undefined ||
      props.bottom !== undefined ||
      props.left !== undefined
      ? css`
          position: absolute;
        `
      : undefined,
  )

  return props.value === undefined ? null : backgroundImage === undefined ? (
    <DotSvg style={style} value={colorize(props.value, props.color)} className={className} />
  ) : (
    <i style={{ ...style, backgroundImage }} className={className} />
  )
}

/**
 * total 64 bit:
 * 0~47: 6x8=48 pixel
 * 48~63: 4x4=16 RGBA color
 */
export function DotSvg(props: { value: bigint; style?: CSSProperties; className?: string }) {
  const { value } = props
  const pixel = value >> 0x10n
  const hex = color2Hex(value)
  const opacity = color2Opacity(value)

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${FONT_WIDTH} ${FONT_HEIGHT}`}
      fill={hex}
      width={FONT_WIDTH * FONT_SCALE_FACTOR}
      height={FONT_HEIGHT * FONT_SCALE_FACTOR}
      style={{
        ...props.style,
        opacity,
      }}
      className={props.className}
    >
      {MASK.map((line, y) =>
        line.map((n, x) =>
          n & pixel ? <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} /> : null,
        ),
      )}
    </svg>
  )
}
