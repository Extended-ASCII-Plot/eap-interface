import { ethers } from 'ethers'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import useSWR from 'swr'
import useContract from '../hooks/use-contract'
import useProvider from '../hooks/use-provider'
import Border from './border'
import Plot from './plot'

export default function Token(props: { address?: string; index: number; scale?: number }) {
  const provider = useProvider()
  const router = useRouter()
  const contract = useContract(provider)
  const { data: token } = useSWR(
    [
      props.address ? 'tokenOfOwnerByIndex' : 'tokenByIndex',
      contract!.address,
      props.address,
      props.index,
    ],
    () =>
      props.address
        ? contract!.tokenOfOwnerByIndex(props.address, props.index)
        : contract!.tokenByIndex(props.index),
    { revalidateOnFocus: false },
  )
  const value = useMemo(
    () => (token ? ethers.utils.hexZeroPad(token.toHexString(), 32) : undefined),
    [token],
  )

  return (
    <Border width={4 * (props.scale || 1) + 2} height={4 * (props.scale || 1) + 2}>
      <Link href={`/plot/${value}?from=${router.asPath}`} passHref={true}>
        <a>
          <Plot value={value} />
        </a>
      </Link>
    </Border>
  )
}
