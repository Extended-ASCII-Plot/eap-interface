import { ethers } from 'ethers'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { memo, useMemo } from 'react'
import useSWR from 'swr'
import { useContract } from '../contexts/contract-context'
import Border from './border'
import Plot from './plot'

export default memo(function Token(props: { address?: string; index: number; scale?: number }) {
  const contract = useContract()
  const router = useRouter()
  const { data: token } = useSWR(
    [
      props.address ? 'tokenOfOwnerByIndex' : 'tokenByIndex',
      contract.address,
      props.address,
      props.index,
    ],
    () =>
      props.address
        ? contract.tokenOfOwnerByIndex(props.address, props.index)
        : contract.tokenByIndex(props.index),
    { revalidateOnFocus: false, revalidateIfStale: false },
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
})
