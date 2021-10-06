import { css, cx } from '@emotion/css'
import { FONT_MAP_SIZE } from '../utils/constants'
import Dot from './dot'
import Box from './box'
import Text from './text'

const charEncodingMap = Uint8Array.from(
  Array.from({ length: FONT_MAP_SIZE * FONT_MAP_SIZE }).map((_, index) => index),
)

const selector = Array.from({ length: FONT_MAP_SIZE })
  .map((_, x) =>
    Array.from({ length: FONT_MAP_SIZE }).map((_, y) =>
      (x + y) % 2 === 1 ? `svg:nth-child(${x * FONT_MAP_SIZE + y + 1})` : '',
    ),
  )
  .flat()
  .filter((s) => !!s)
  .join(',')

export default function CodeMap(props: { className?: string }) {
  return (
    <Box
      width={FONT_MAP_SIZE + 2}
      height={FONT_MAP_SIZE + 6}
      className={cx(
        css`
          position: relative;
        `,
        props.className,
      )}
    >
      <Box width={1} height={FONT_MAP_SIZE + 1} x={1} y={0}>
        <Text color={0xa0}>{Uint8Array.from([0x03])}</Text>
        <Text color={0x50}>0123456789ABCDEF</Text>
      </Box>
      <Box
        width={FONT_MAP_SIZE}
        height={FONT_MAP_SIZE}
        x={2}
        y={1}
        className={css`
          ${selector} {
            background-color: #222 !important;
          }
        `}
      >
        <Text>{charEncodingMap}</Text>
      </Box>
      <Box height={1} width={FONT_MAP_SIZE + 1} x={1} y={FONT_MAP_SIZE + 1}>
        <Text color={0xa0}>{Uint8Array.from([0x04])}</Text>
        <Text color={0x50}>0123456789ABCDEF</Text>
      </Box>
      <Box width={FONT_MAP_SIZE + 1} height={1} x={1} y={FONT_MAP_SIZE + 3}>
        <Text color={0xa0}>{Uint8Array.from([0x05])}</Text>
        {Array.from({ length: FONT_MAP_SIZE }).map((_, index) => (
          <Dot
            key={index}
            value={
              (index.toString(16).toUpperCase().charCodeAt(0) << 8) +
              (index << 4) +
              (index === 0 ? 6 : 0)
            }
          />
        ))}
      </Box>
      <Box width={FONT_MAP_SIZE + 1} height={1} x={1} y={FONT_MAP_SIZE + 5}>
        <Text color={0xa0}>{Uint8Array.from([0x06])}</Text>
        {Array.from({ length: FONT_MAP_SIZE }).map((_, index) => (
          <Dot
            key={index}
            value={
              (index.toString(16).toUpperCase().charCodeAt(0) << 8) +
              ((index === 0 ? 6 : 0) << 4) +
              index
            }
          />
        ))}
      </Box>
    </Box>
  )
}
