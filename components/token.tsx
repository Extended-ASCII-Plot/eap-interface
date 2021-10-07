import { ethers } from 'ethers'
import Link from 'next/link'
import React, { useMemo } from 'react'
import useSWR from 'swr'
import useWallet from 'use-wallet'
import { ExtendedAsciiPlot__factory } from '../abi'
import { CHAIN_ID, CONTRACT_ADDRESS } from '../utils/constants'
import Border from './border'
import Plot from './plot'

export default function Token(props: { index: number; scale?: number }) {
  const wallet = useWallet()
  const signer = useMemo(
    () =>
      wallet.ethereum && wallet.account
        ? new ethers.providers.Web3Provider(wallet.ethereum, CHAIN_ID).getSigner(wallet.account)
        : undefined,
    [wallet],
  )
  const contract = useMemo(
    () => (signer ? ExtendedAsciiPlot__factory.connect(CONTRACT_ADDRESS, signer) : undefined),
    [signer],
  )
  const { data: token } = useSWR(
    contract && signer
      ? ['tokenOfOwnerByIndex', contract.address, signer._address, props.index]
      : null,
    () => contract!.tokenOfOwnerByIndex(signer!._address, props.index),
    { revalidateOnFocus: false },
  )
  const value = useMemo(
    () => (token ? ethers.utils.hexZeroPad(token.toHexString(), 32) : undefined),
    [token],
  )

  return (
    <Border width={4 * (props.scale || 1) + 2} height={4 * (props.scale || 1) + 2}>
      <Link href={`/plot/${value}`} passHref={true}>
        <a target="_blank">
          <Plot value={value} />
        </a>
      </Link>
    </Border>
  )
}
