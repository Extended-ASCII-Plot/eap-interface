import { css } from '@emotion/css'
import { useRouter } from 'next/dist/client/router'
import Border from '../../components/border'
import Plot from '../../components/plot'
import Text from '../../components/text'
import { FONT_WIDTH, FONT_SCALE_FACTOR, FONT_HEIGHT } from '../../utils/constants'

const SCALE = 8

export default function PlotPage() {
  const router = useRouter()

  return (
    <div
      className={css`
        margin: 0 auto;
        width: ${36 * FONT_WIDTH * FONT_SCALE_FACTOR}px;
        padding: ${FONT_HEIGHT * FONT_SCALE_FACTOR}px ${FONT_WIDTH * FONT_SCALE_FACTOR}px;
      `}
    >
      <Text>{Uint8Array.from([0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20])}</Text>
      <Text>Extended ASCII Plot</Text>
      <div>
        <Text> </Text>
      </div>
      <Border width={4 * SCALE + 2} height={4 * SCALE + 2}>
        <Plot value={router.query.token as string} scale={SCALE} />
      </Border>
    </div>
  )
}
