import { ethers } from 'ethers'
import { FONT_WIDTH, FONT_HEIGHT, FONT_SCALE_FACTOR, MASK, COLOR } from '../utils/constants'
import { ascii } from '../utils/encoding'

const SIZE = 4

const SCALE = 10

/**
 * split uint256 into 16 x uint16
 */
export default function Plot(props: { value: string }) {
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
      width={FONT_WIDTH * FONT_SCALE_FACTOR * SCALE * SIZE}
      height={FONT_HEIGHT * FONT_SCALE_FACTOR * SCALE * SIZE}
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
