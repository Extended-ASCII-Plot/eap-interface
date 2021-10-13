import { css } from '@emotion/css'
import { ethers } from 'ethers'
import { useMemo } from 'react'
import useSWR from 'swr'
import { useWallet } from 'use-wallet'
import { ExtendedAsciiPlotPolygon, ExtendedAsciiPlotPolygon__factory } from '../abi'
import useContract from '../hooks/use-contract'
import { CHAIN_ID } from '../utils/constants'

export default function Migrate() {
  const wallet = useWallet()
  const signer = useMemo(
    () =>
      wallet.ethereum && wallet.account
        ? new ethers.providers.Web3Provider(wallet.ethereum, CHAIN_ID).getSigner(wallet.account)
        : undefined,
    [wallet],
  )
  const contract = useContract(signer)
  const { data: totalSupply } = useSWR(contract ? ['totalSupply', contract?.address] : null, () =>
    contract?.totalSupply(),
  )
  console.log(totalSupply)

  return (
    <div
      className={css`
        * {
          color: white;
          line-height: normal;
        }
      `}
    >
      <button
        onClick={() => {
          wallet.connect('injected')
        }}
      >
        CONNECT
      </button>
      <button
        onClick={() => {
          contract?.destory()
        }}
      >
        destory
      </button>
      <div>totalSupply {totalSupply?.toString()}</div>
      {totalSupply && contract
        ? Array.from({ length: totalSupply.toNumber() }).map((_, index) => (
            <Token key={index} index={index} contract={contract} />
          ))
        : null}
    </div>
  )
}

function Token(props: { index: number; contract: ExtendedAsciiPlotPolygon }) {
  const { data: token } = useSWR(
    ['tokenByIndex', props.contract.address, props.index],
    () => props.contract.tokenByIndex(props.index),
    { revalidateOnFocus: false },
  )
  const value = useMemo(
    () => (token ? ethers.utils.hexZeroPad(token.toHexString(), 32) : undefined),
    [token],
  )
  const { data: owner } = useSWR(
    value ? ['ownerOf', props.contract.address, value] : null,
    () => props.contract.ownerOf(value!),
    { revalidateOnFocus: false },
  )
  const wallet = useWallet()
  const signer = useMemo(
    () =>
      wallet.ethereum && wallet.account
        ? new ethers.providers.Web3Provider(wallet.ethereum, CHAIN_ID).getSigner(wallet.account)
        : undefined,
    [wallet],
  )
  const newContract = useMemo(
    () =>
      signer
        ? ExtendedAsciiPlotPolygon__factory.connect(
            '0x4b68e53E3B3d6Ff159bf274327F04c808892Aec9',
            signer,
          )
        : undefined,
    [signer],
  )
  const { data: newOwner } = useSWR(
    value && newContract ? ['ownerOf', newContract.address, value] : null,
    () => newContract!.ownerOf(value!),
    { revalidateOnFocus: false, shouldRetryOnError: false },
  )

  return (
    <ul>
      <button
        disabled={!!newOwner && newOwner === owner}
        onClick={() => {
          if (owner && value) {
            newContract?.mint(owner, value)
          }
        }}
      >
        migrate #{props.index}
      </button>
      {value} {owner}
    </ul>
  )
}
