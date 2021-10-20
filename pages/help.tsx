import { css } from '@emotion/css'
import Link from 'next/link'
import Button from '../components/button'
import Text from '../components/text'
import { FONT_WIDTH, FONT_SCALE_FACTOR, FONT_HEIGHT } from '../utils/constants'

export default function HelpPage() {
  return (
    <div
      className={css`
        margin: 0 auto;
        width: ${24 * FONT_WIDTH * FONT_SCALE_FACTOR}px;
        height: 100vh;
        padding: ${FONT_HEIGHT * FONT_SCALE_FACTOR}px ${FONT_WIDTH * FONT_SCALE_FACTOR}px;
      `}
    >
      <div>
        <Link href="/" passHref={true}>
          <a>
            <Text>{Uint8Array.from([0x1b, 0x20])}</Text>
          </a>
        </Link>
        <Text>Help</Text>
      </div>
      <div>
        <Text> </Text>
      </div>
      <Button
        onClick={() => {
          window.open(
            'https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0',
          )
        }}
      >
        1. SWAP WITH UNISWAP
      </Button>
      <Button
        onClick={() => {
          window.open('https://wallet.polygon.technology/bridge')
        }}
      >
        2. BRIDGE TO POLYGON
      </Button>
    </div>
  )
}
