import { css } from '@emotion/css'
import padStart from 'lodash/padStart'
import { useCallback, useEffect, useRef, useState } from 'react'
import Border from '../components/border'
import Box from '../components/box'
import Dot from '../components/dot'
import Text from '../components/text'
import { FONT_HEIGHT, FONT_WIDTH, MASK } from '../utils/constants'
import { ascii } from '../utils/encoding'

const COLS = FONT_WIDTH

const ROWS = FONT_HEIGHT

const CELL_WIDTH = 3

const CELL_HEIGHT = 2

const CROSSHAIR_COLOR = 0xffffn

const LINE_COLOR = 0x999fn

export default function Generator() {
  const handleCell = useCallback((x: number, y: number) => {
    const matchX = x % (CELL_WIDTH + 1) === 0
    const leftX = x === 0
    const rightX = x === COLS * (CELL_WIDTH + 1)
    const matchY = y % (CELL_HEIGHT + 1) === 0
    const topY = y === 0
    const bottomY = y === ROWS * (CELL_HEIGHT + 1)
    if (leftX && topY) {
      return ascii[0x89]
    }
    if (rightX && topY) {
      return ascii[0x8a]
    }
    if (leftX && bottomY) {
      return ascii[0x99]
    }
    if (rightX && bottomY) {
      return ascii[0x9a]
    }
    if (matchX && topY) {
      return ascii[0x87]
    }
    if (matchX && bottomY) {
      return ascii[0x98]
    }
    if (leftX && matchY) {
      return ascii[0x97]
    }
    if (rightX && matchY) {
      return ascii[0x88]
    }
    if (matchX && matchY) {
      return ascii[0x8d]
    }
    if (matchX) {
      return ascii[0x86]
    }
    if (matchY) {
      return ascii[0x96]
    }
  }, [])
  const [value, setValue] = useState(0x000000000000_ffffn)
  const [crosshair, setCrosshair] = useState<{ x: number; y: number }>()
  const [colorCrosshair, setColorCrosshair] = useState<number>()
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (crosshair) {
        if (e.key === 'ArrowUp') {
          setCrosshair((old) => (old ? { x: old.x, y: (old.y + ROWS - 1) % ROWS } : old))
        } else if (e.key === 'ArrowRight') {
          setCrosshair((old) => (old ? { x: (old.x + 1) % COLS, y: old.y } : old))
        } else if (e.key === 'ArrowDown') {
          setCrosshair((old) => (old ? { x: old.x, y: (old.y + 1) % ROWS } : old))
        } else if (e.key === 'ArrowLeft') {
          setCrosshair((old) => (old ? { x: (old.x + COLS - 1) % COLS, y: old.y } : old))
        } else if (crosshair && e.key === ' ') {
          setValue((old) => old ^ (MASK[crosshair.y][crosshair.x] << 0x10n))
        }
      }
      if (colorCrosshair !== undefined) {
        const offset = [12n, 8n, 4n, 0n]
        const mask = [0xf000n, 0xf00n, 0xf0n, 0xfn]
        if (e.key === 'ArrowUp') {
          setValue(
            (old) =>
              (old & ~mask[colorCrosshair]) +
              (((((old & mask[colorCrosshair]) >> offset[colorCrosshair]) - 1n) & 0xfn) <<
                offset[colorCrosshair]),
          )
        } else if (e.key === 'ArrowRight') {
          setColorCrosshair((old) => (old === undefined ? old : (old + 1) % 4))
        } else if (e.key === 'ArrowDown') {
          setValue(
            (old) =>
              (old & ~mask[colorCrosshair]) +
              (((((old & mask[colorCrosshair]) >> offset[colorCrosshair]) + 1n) & 0xfn) <<
                offset[colorCrosshair]),
          )
        } else if (e.key === 'ArrowLeft') {
          setColorCrosshair((old) => (old === undefined ? old : (old + 4 - 1) % 4))
        } else if (/^[0-9a-fA-F]$/.test(e.key)) {
          setValue(
            (old) =>
              (old & ~mask[colorCrosshair]) +
              (BigInt(`0x${e.key.toLowerCase()}`) << offset[colorCrosshair]),
          )
        }
      }
    },
    [colorCrosshair, crosshair],
  )
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const { current } = ref
    if (!current) {
      return
    }
    current.addEventListener('keydown', handleKeyDown)
    return () => {
      current.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  return (
    <div ref={ref}>
      <Border width={27} height={33} color={LINE_COLOR}>
        <Box height={1}>
          <Text value={`   0x${padStart(value.toString(16).toUpperCase(), 16, '0')}`} />
        </Box>
        <Box
          width={COLS * (CELL_WIDTH + 1) + 1}
          height={ROWS * (CELL_HEIGHT + 1) + 1}
          tabIndex={0}
          onFocus={() => {
            setCrosshair({ x: 0, y: 0 })
          }}
          onBlur={() => {
            setCrosshair(undefined)
          }}
          className={css`
            position: relative;
            display: block;
          `}
        >
          {Array.from({ length: COLS * (CELL_WIDTH + 1) + 1 }).map((_, x) =>
            Array.from({ length: ROWS * (CELL_HEIGHT + 1) + 1 }).map((_, y) => (
              <Dot key={`${x}-${y}`} value={handleCell(x, y)} color={LINE_COLOR} left={x} top={y} />
            )),
          )}
          {Array.from({ length: COLS }).map((_, x) =>
            Array.from({ length: ROWS }).map((_, y) =>
              (MASK[y][x] << 0x10n) & value ? (
                <Cell key={`${x}-${y}`} x={x} y={y} color={value & 0xffffn} />
              ) : null,
            ),
          )}
          {crosshair ? <Crosshair x={crosshair.x} y={crosshair.y} /> : null}
        </Box>
        <Border height={5} width={COLS * (CELL_WIDTH + 1) + 1} color={LINE_COLOR}>
          <Text
            value={
              new Uint8Array([
                0x20, 0x20, 0x20, 0x18, 0x20, 0x20, 0x20, 0x20, 0x20, 0x18, 0x20, 0x20, 0x20, 0x20,
                0x20, 0x18, 0x20, 0x20, 0x20, 0x20, 0x20, 0x18,
              ])
            }
            color={LINE_COLOR}
          />
          <Box
            tabIndex={0}
            onFocus={() => {
              setColorCrosshair(0)
            }}
            onBlur={() => {
              setColorCrosshair(undefined)
            }}
          >
            <Text
              value={` R:${((value & 0xf000n) >> 12n).toString(16).toUpperCase()}   G:${(
                (value & 0xf00n) >>
                8n
              )
                .toString(16)
                .toUpperCase()}   B:${((value & 0xf0n) >> 4n).toString(16).toUpperCase()}   A:${(
                value & 0xfn
              )
                .toString(16)
                .toUpperCase()} `}
              color={LINE_COLOR}
            />
          </Box>
          <Text
            value={
              new Uint8Array([
                0x20, 0x20, 0x20, 0x19, 0x20, 0x20, 0x20, 0x20, 0x20, 0x19, 0x20, 0x20, 0x20, 0x20,
                0x20, 0x19, 0x20, 0x20, 0x20, 0x20, 0x20, 0x19,
              ])
            }
            color={LINE_COLOR}
          />
          {colorCrosshair === undefined ? null : (
            <Box x={colorCrosshair * 6 + 3} y={0} width={1}>
              <Dot value={ascii[0x18]} color={CROSSHAIR_COLOR} />
              <Dot value={ascii[0x20]} />
              <Dot value={ascii[0x19]} color={CROSSHAIR_COLOR} />
            </Box>
          )}
        </Border>
      </Border>
    </div>
  )
}

function Cell(props: { x: number; y: number; color: bigint }) {
  const handleCell = useCallback((x: number, y: number) => {
    let value = 0xffffffffffff_ffffn
    if (x === 0) {
      value &= 0x00ffffffffff_ffffn
    }
    if (x === CELL_WIDTH - 1) {
      value &= 0xffffffff0000_ffffn
    }
    if (y === CELL_HEIGHT - 1) {
      value &= 0xfefefefefefe_ffffn
    }
    return value
  }, [])

  return (
    <Box width={CELL_WIDTH} height={CELL_HEIGHT}>
      {Array.from({ length: CELL_WIDTH }).map((_, dx) =>
        Array.from({ length: CELL_HEIGHT }).map((_, dy) => (
          <Dot
            key={`${dx}-${dy}`}
            value={handleCell(dx, dy)}
            color={props.color}
            left={props.x * (CELL_WIDTH + 1) + 1 + dx}
            top={props.y * (CELL_HEIGHT + 1) + 1 + dy}
          />
        )),
      )}
    </Box>
  )
}

function Crosshair(props: { x: number; y: number }) {
  const handleCell = useCallback((x: number, y: number) => {
    const leftX = x === 0
    const rightX = x === CELL_WIDTH + 1
    const topY = y === 0
    const bottomY = y === CELL_HEIGHT + 1
    if (leftX && topY) {
      return ascii[0x89]
    }
    if (rightX && topY) {
      return ascii[0x8a]
    }
    if (leftX && bottomY) {
      return ascii[0x99]
    }
    if (rightX && bottomY) {
      return ascii[0x9a]
    }
    if (topY || bottomY) {
      return ascii[0x96]
    }
    if (leftX || rightX) {
      return ascii[0x86]
    }
  }, [])

  return (
    <Box
      width={CELL_WIDTH + 2}
      height={CELL_HEIGHT + 2}
      x={props.x * (CELL_WIDTH + 1)}
      y={props.y * (CELL_HEIGHT + 1)}
    >
      {Array.from({ length: CELL_WIDTH + 2 }).map((_, x) =>
        Array.from({ length: CELL_HEIGHT + 2 }).map((_, y) => {
          const value = handleCell(x, y)
          return value === undefined ? null : (
            <Dot key={`${x}-${y}`} value={value} color={CROSSHAIR_COLOR} left={x} top={y} />
          )
        }),
      )}
    </Box>
  )
}
