import { css } from '@emotion/css'
import { ethers } from 'ethers'
import { useRouter } from 'next/dist/client/router'
import useSWR from 'swr'
import Link from 'next/link'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { useMemo } from 'react'
import Border from '../../components/border'
import Dot from '../../components/dot'
import Plot from '../../components/plot'
import Text from '../../components/text'
import {
  FONT_WIDTH,
  FONT_SCALE_FACTOR,
  FONT_HEIGHT,
  CONTRACT_ADDRESS,
  BASE_URL,
} from '../../utils/constants'
import { useContract } from '../../contexts/contract-context'

const SCALE = 8

export default function PlotPage(props: { token: string }) {
  const router = useRouter()
  const { token = props.token, from } = router.query as { token?: string; from?: string }
  const contract = useContract()
  const { data: index } = useSWR(
    token ? ['indexByToken', contract.address, token] : null,
    () => contract.indexByToken(ethers.BigNumber.from(token!)),
    { revalidateOnFocus: false, revalidateIfStale: false },
  )
  const { data: owner } = useSWR(
    token ? ['ownerOf', contract.address, token] : null,
    () => contract.ownerOf(ethers.BigNumber.from(token!)),
    { revalidateOnFocus: false, revalidateIfStale: false },
  )
  const { data: txs } = useSWR<{ result: { timeStamp: string; tokenID: string }[] | string }>(
    owner ? ['txs', owner] : null,
    () =>
      fetch(
        `https://api.polygonscan.com/api?module=account&action=tokennfttx&contractaddress=${CONTRACT_ADDRESS}&address=${owner}&sort=asc`,
      ).then((response) => response.json()),
    { revalidateOnFocus: false, revalidateIfStale: false },
  )
  const timestamp = useMemo(
    () =>
      typeof txs?.result === 'string'
        ? undefined
        : txs?.result.find((item) => item.tokenID === ethers.BigNumber.from(token).toString())
            ?.timeStamp,
    [txs, token],
  )

  return (
    <>
      <Head>
        <meta key="og:image" property="og:image" content={`${BASE_URL}api/png/${token}`} />
        <meta key="twitter:image" name="twitter:image" content={`${BASE_URL}api/png/${token}`} />
      </Head>
      <div
        className={css`
          margin: 0 auto;
          width: ${(4 * SCALE + 2 + 2) * FONT_WIDTH * FONT_SCALE_FACTOR}px;
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
            <Link href={from || '/'} passHref={true}>
              <a>
                <Text>{Uint8Array.from([0x1b, 0x20])}</Text>
              </a>
            </Link>
            <Text>{`Extended ASCII Plot #${index?.toBigInt().toString() || ''}`}</Text>
          </span>
          <a
            title="OpenSea"
            href={`https://opensea.io/assets/matic/${CONTRACT_ADDRESS}/${ethers.BigNumber.from(
              token,
            ).toString()}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Dot value={0xfa7c} />
          </a>
        </div>
        <div>
          <Text> </Text>
        </div>
        <Border width={4 * SCALE + 2} height={4 * SCALE + 2}>
          <Plot value={token} scale={SCALE} />
        </Border>
        <div>
          <Text> </Text>
        </div>
        <div
          className={css`
            width: 100%;
            display: flex;
            justify-content: space-between;
          `}
        >
          <div
            className={css`
              width: ${16 * FONT_WIDTH * FONT_SCALE_FACTOR}px;
            `}
          >
            <Text>Data:</Text>
            <div>
              <Text> </Text>
            </div>
            <Text>
              {token
                ? ethers.utils
                    .hexZeroPad(ethers.BigNumber.from(token).toHexString(), 32)
                    .replace(/^0x/, '')
                    .toUpperCase()
                : undefined}
            </Text>
          </div>
          <div
            className={css`
              width: ${10 * FONT_WIDTH * FONT_SCALE_FACTOR}px;
            `}
          >
            <Text>Owned by:</Text>
            <div>
              <Text> </Text>
            </div>
            <Text>
              {owner
                ? ethers.utils.hexZeroPad(owner, 20).replace(/^0x/, '').toUpperCase()
                : undefined}
            </Text>
          </div>
          <div
            className={css`
              width: ${4 * FONT_WIDTH * FONT_SCALE_FACTOR}px;
            `}
          >
            <Text>UTC:</Text>
            <div>
              <Text> </Text>
            </div>
            <Text>
              {timestamp
                ? new Date(parseInt(timestamp, 10) * 1000)
                    .toISOString()
                    .replace('T', '')
                    .replaceAll('-', '')
                    .replaceAll(':', '')
                    .replace(/.000Z$/, '00')
                : undefined}
            </Text>
          </div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return { props: { token: context.query.token } }
}
