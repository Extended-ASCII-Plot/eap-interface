import { FONT_MAP_SIZE } from '../utils/constants'
import Border from './border'
import Box from './box'
import Text from './text'

const left = new Uint8Array(
  Array.from({ length: FONT_MAP_SIZE * FONT_MAP_SIZE }).map((_, index) => index),
)

export default function CodeMap() {
  return (
    <Border width={FONT_MAP_SIZE + 2} height={FONT_MAP_SIZE + 2}>
      <Box width={FONT_MAP_SIZE} height={FONT_MAP_SIZE}>
        <Text>{left}</Text>
      </Box>
    </Border>
  )
}
