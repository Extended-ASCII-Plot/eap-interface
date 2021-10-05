import { css } from '@emotion/css'
import { FONT_MAP_SIZE } from '../utils/constants'
import AsciiDot from './ascii-dot'
import Box from './box'
import Text from './text'

const charEncodingMap = new Uint8Array(
  Array.from({ length: FONT_MAP_SIZE * FONT_MAP_SIZE }).map((_, index) => index),
)

export default function CodeMap() {
  return (
    <Box
      width={FONT_MAP_SIZE + 6}
      height={FONT_MAP_SIZE + 2}
      className={css`
        position: relative;
      `}
    >
      <Box height={1} width={FONT_MAP_SIZE + 1} x={1} y={0}>
        <Text color={0xff0fn}>b</Text>
        <Text color={0xaaafn}>0123456789ABCDEF</Text>
      </Box>
      <Box width={1} height={FONT_MAP_SIZE + 1} x={0} y={1}>
        <Text color={0xff0fn}>a</Text>
        <Text color={0xaaafn}>0123456789ABCDEF</Text>
      </Box>
      <Box width={FONT_MAP_SIZE} height={FONT_MAP_SIZE} x={2} y={2}>
        <Text>{charEncodingMap}</Text>
      </Box>
      <Box width={1} height={FONT_MAP_SIZE + 1} x={FONT_MAP_SIZE + 3} y={1}>
        <Text color={0xff0fn}>c</Text>
        {Array.from({ length: FONT_MAP_SIZE }).map((_, index) => (
          <AsciiDot
            key={index}
            value={
              (index.toString(16).toUpperCase().charCodeAt(0) << 8) +
              (index << 4) +
              (index === 0 ? 6 : 0)
            }
          />
        ))}
      </Box>
      <Box width={1} height={FONT_MAP_SIZE + 1} x={FONT_MAP_SIZE + 5} y={1}>
        <Text color={0xff0fn}>d</Text>
        {Array.from({ length: FONT_MAP_SIZE }).map((_, index) => (
          <AsciiDot
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
