import { ethers } from 'ethers'
import { FONT_WIDTH, FONT_HEIGHT, ASCII, COLOR, MASK, FONT_SCALE_FACTOR } from '../utils/constants'

const PLOT_SIZE = 4

/**
 * 16 bit:
 * 0~7: ascii
 * 8~11: foreground
 * 12~15: background
 */
export function DotSvg(props: { value: number }) {
  const { value } = props
  const pixel = ASCII[(value & 0xff00) >> 0x8]
  const foreground = (value & 0xf0) >> 0x4
  const background = value & 0xf

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${FONT_WIDTH} ${FONT_HEIGHT}`}
      fill={COLOR[foreground]}
      width={FONT_WIDTH * FONT_SCALE_FACTOR}
      height={FONT_HEIGHT * FONT_SCALE_FACTOR}
      style={{
        backgroundColor: COLOR[background],
      }}
      shapeRendering="crispEdges"
    >
      {MASK.map((line, y) =>
        line.map((n, x) =>
          n & pixel ? <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} /> : null,
        ),
      )}
    </svg>
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
      viewBox={`0 0 ${FONT_WIDTH * PLOT_SIZE} ${FONT_HEIGHT * PLOT_SIZE}`}
      width={props.width}
      height={props.height}
      shapeRendering="crispEdges"
      className={props.className}
    >
      {Array.from({ length: PLOT_SIZE }).map((_, y) =>
        Array.from({ length: PLOT_SIZE }).map((_, x) => (
          <PlotDot
            key={`${x}-${y}`}
            value={buf.readUInt16BE((y * PLOT_SIZE + x) << 1)}
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
  const pixel = ASCII[(value & 0xff00) >> 0x8]
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
