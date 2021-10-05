import Box from '../components/box'
import Text from '../components/text'
import { FONT_MAP_SIZE } from '../utils/constants'

const charEncodingMap = new Uint8Array(
  Array.from({ length: FONT_MAP_SIZE * FONT_MAP_SIZE }).map((_, index) => index),
)

export default function CodeMapPage() {
  return (
    <>
      <Box height={1} width={FONT_MAP_SIZE + 2} x={2} y={0}>
        <Text value={Uint8Array.from(Buffer.from('0123456789ABCDEF'))} color={0xbbbbn} />
      </Box>
      <Box width={1} height={FONT_MAP_SIZE + 2} x={0} y={2}>
        <Text value={Uint8Array.from(Buffer.from('0123456789ABCDEF'))} color={0xbbbbn} />
      </Box>
      <Box width={FONT_MAP_SIZE} height={FONT_MAP_SIZE} x={2} y={2}>
        <Text value={charEncodingMap} />
      </Box>
    </>
  )
}
