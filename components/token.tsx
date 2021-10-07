import { ethers } from 'ethers'
import Link from 'next/link'
import React, { useMemo } from 'react'
import useSWR from 'swr'
import { ExtendedAsciiPlot__factory } from '../abi'
import useProvider from '../hooks/use-provider'
import { CONTRACT_ADDRESS } from '../utils/constants'
import Border from './border'
import Plot from './plot'

export default function Token(props: { address: string; index: number; scale?: number }) {
  const provider = useProvider()
  const contract = useMemo(
    () => ExtendedAsciiPlot__factory.connect(CONTRACT_ADDRESS, provider),
    [provider],
  )
  const { data: token } = useSWR(
    ['tokenOfOwnerByIndex', contract.address, props.address, props.index],
    () => contract.tokenOfOwnerByIndex(props.address, props.index),
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
