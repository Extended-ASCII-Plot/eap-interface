import { css } from '@emotion/css'
import { ethers } from 'ethers'
import { useRouter } from 'next/dist/client/router'
import useSWR from 'swr'
import Border from '../../components/border'
import Plot from '../../components/plot'
import Text from '../../components/text'
import useContract from '../../hooks/use-contract'
import useProvider from '../../hooks/use-provider'
import { FONT_WIDTH, FONT_SCALE_FACTOR, FONT_HEIGHT } from '../../utils/constants'

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
      <Text>{`Extended ASCII Plot #${index?.toBigInt().toString() || ''}`}</Text>
      <div>
        <Text> </Text>
      </div>
      <Border width={4 * SCALE + 2} height={4 * SCALE + 2}>
        <Plot value={token} scale={SCALE} />
      </Border>
    </div>
  )
}
