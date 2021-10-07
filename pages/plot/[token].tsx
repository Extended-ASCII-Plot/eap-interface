import { css } from '@emotion/css'
import { ethers } from 'ethers'
import { useRouter } from 'next/dist/client/router'
import useSWR from 'swr'
import Border from '../../components/border'
import Dot from '../../components/dot'
import Plot from '../../components/plot'
import Text from '../../components/text'
import useContract from '../../hooks/use-contract'
import useProvider from '../../hooks/use-provider'
import { FONT_WIDTH, FONT_SCALE_FACTOR, FONT_HEIGHT, CONTRACT_ADDRESS } from '../../utils/constants'

const SCALE = 8

export default function PlotPage() {
  const router = useRouter()
  const { token } = router.query as { token?: string }
  const provider = useProvider()
  const contract = useContract(provider)
  const { data: index } = useSWR(
    contract && token ? ['indexByToken', contract.address, token] : null,
    () => contract!.indexByToken(ethers.BigNumber.from(token!)),
  )

  return (
    <div
      className={css`
        margin: 0 auto;
        width: ${36 * FONT_WIDTH * FONT_SCALE_FACTOR}px;
        padding: ${FONT_HEIGHT * FONT_SCALE_FACTOR}px ${FONT_WIDTH * FONT_SCALE_FACTOR}px;
      `}
    >
      <div
        className={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
        `}
      >
        <span>
          <Text>{`Extended ASCII Plot`}</Text>
        </span>
        <a
          title="OpenSea"
          href={`https://opensea.io/assets/matic/${CONTRACT_ADDRESS}/${token}`}
          target="_blank"
        >
          <Dot value={0x067c} />
        </a>
      </div>
      <div>
        <Text> </Text>
      </div>
      <Text>{`#${index?.toBigInt().toString() || ''}`}</Text>
      <div>
        <Text> </Text>
      </div>
      <Border width={4 * SCALE + 2} height={4 * SCALE + 2}>
        <Plot value={token} scale={SCALE} />
      </Border>
    </div>
  )
}
