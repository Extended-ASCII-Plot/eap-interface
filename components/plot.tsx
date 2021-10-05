import { ethers } from 'ethers'
import { useMemo } from 'react'
import useSWR from 'swr'
import svgToMiniDataURI from 'mini-svg-data-uri'
import { css } from '@emotion/css'
import { FONT_WIDTH, FONT_HEIGHT, FONT_SCALE_FACTOR, MASK, COLOR } from '../utils/constants'
import { ascii } from '../utils/encoding'

const SIZE = 4

export default function Plot(props: { value?: string }) {
  const { data } = useSWR(
    props.value === undefined ? null : `/plot/${props.value}`,
    (url) => fetch(url).then((response) => response.text()),
    { revalidateOnFocus: false },
  )
  const backgroundImage = useMemo(
    () => (data === undefined ? undefined : `url("${svgToMiniDataURI(data)}")`),
    [data],
  )
  const className = css`
    display: inline-block;
    width: ${FONT_WIDTH * FONT_SCALE_FACTOR * SIZE}px;
    height: ${FONT_HEIGHT * FONT_SCALE_FACTOR * SIZE}px;
    background-repeat: no-repeat;
    background-position: 0 0;
  `

  return props.value === undefined ? null : backgroundImage === undefined ? (
    <PlotSvg
      value={props.value}
      className={className}
      width={FONT_WIDTH * FONT_SCALE_FACTOR * SIZE}
      height={FONT_HEIGHT * FONT_SCALE_FACTOR * SIZE}
    />
  ) : (
    <i style={{ backgroundImage, backgroundSize: 'cover' }} className={className} />
  )
}

/**
 * split uint256 into 16 x uint16
 */
export function PlotSvg(props: {
  value: string
  width: number
  height: number
  className?: string
}) {
  const buf = Buffer.from(
    ethers.utils
      .hexZeroPad(ethers.BigNumber.from(props.value).toHexString(), 32)
      .replace(/^0x/, ''),
    'hex',
  )

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${FONT_WIDTH * SIZE} ${FONT_HEIGHT * SIZE}`}
      width={props.width}
      height={props.height}
      className={props.className}
    >
      {Array.from({ length: SIZE }).map((_, y) =>
        Array.from({ length: SIZE }).map((_, x) => (
          <PlotDot
            key={`${x}-${y}`}
            value={buf.readUInt16BE((y * SIZE + x) << 1)}
            x={x * FONT_WIDTH}
            y={y * FONT_HEIGHT}
          />
        )),
      )}
    </svg>
  )
}

/**
 * 16 bit:
 * 0~7: ascii
 * 8~11: foreground
 * 12~15: background
 */
function PlotDot(props: { value: number; x: number; y: number }) {
  const { value } = props
  const pixel = ascii[(value & 0xff00) >> 0x8] >> 0x10n
  const foreground = (value & 0xf0) >> 0x4
  const background = value & 0xf

  return (
    <>
      <rect
        x={props.x}
        y={props.y}
        width={FONT_WIDTH}
        height={FONT_HEIGHT}
        fill={COLOR[background]}
      />
      {MASK.map((line, y) =>
        line.map((n, x) =>
          n & pixel ? (
            <rect
              key={`${props.x + x}-${props.y + y}`}
              x={props.x + x}
              y={props.y + y}
              width={1}
              height={1}
              fill={COLOR[foreground]}
            />
          ) : null,
        ),
      )}
    </>
  )
}
