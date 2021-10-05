import { css } from '@emotion/css'
import { FONT_MAP_SIZE } from '../utils/constants'
import Box from './box'
import Text from './text'

const charEncodingMap = new Uint8Array(
  Array.from({ length: FONT_MAP_SIZE * FONT_MAP_SIZE }).map((_, index) => index),
)

export default function CodeMap() {
  return (
    <Box
      width={FONT_MAP_SIZE + 2}
      height={FONT_MAP_SIZE + 2}
      className={css`
        position: relative;
      `}
    >
      <Box height={1} width={FONT_MAP_SIZE + 2} x={2} y={0}>
        <Text color={0xbbbbn}>0123456789ABCDEF</Text>
      </Box>
      <Box width={1} height={FONT_MAP_SIZE + 2} x={0} y={2}>
        <Text color={0xbbbbn}>0123456789ABCDEF</Text>
      </Box>
      <Box width={FONT_MAP_SIZE} height={FONT_MAP_SIZE} x={2} y={2}>
        <Text>{charEncodingMap}</Text>
      </Box>
    </Box>
  )
}
