import { css } from '@emotion/css'
import { ethers } from 'ethers'
import { useCallback, useEffect, useMemo, useState } from 'react'
import useSWR from 'swr'
import { useWallet } from 'use-wallet'
import { ExtendedAsciiPlot__factory } from '../abi'
import Border from '../components/border'
import Box from '../components/box'
import Text from '../components/text'
import Textarea from '../components/textarea'

const ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

export default function Test() {
  const wallet = useWallet()
  const signer = useMemo(
    () =>
      wallet.ethereum && wallet.account
        ? new ethers.providers.Web3Provider(wallet.ethereum).getSigner(wallet.account)
        : undefined,
    [wallet],
  )
  const contract = useMemo(
    () => (signer ? ExtendedAsciiPlot__factory.connect(ADDRESS, signer) : undefined),
    [signer],
  )
  const [text, setText] = useState('')
  const { data: balance, mutate } = useSWR(
    signer && contract ? ['balanceOf', signer._address, contract.address] : null,
    () => contract!.balanceOf(signer!._address),
  )
  const event = useMemo(
    () =>
      signer
        ? {
            address: ADDRESS,
            topics: [
              ethers.utils.id('Transfer(address,address,uint256)'),
              null,
              ethers.utils.hexZeroPad(signer._address, 32),
            ],
          }
        : undefined,
    [signer],
  )
  const handleRefresh = useCallback(() => mutate(), [mutate])
  useEffect(() => {
    if (!signer || !event) {
      return
    }
    signer.provider.on(event, handleRefresh)
    return () => {
      signer.provider.removeListener(event, handleRefresh)
    }
  }, [event, signer, handleRefresh])

  return (
    <Box width={68} height={3}>
      {wallet.status === 'connected' ? (
        <button
          onClick={() => {
            wallet.reset()
          }}
          className={css`
            color: white;
            cursor: var(--cursor-pointer);
          `}
        >
          DISCONNECT
        </button>
      ) : (
        <button
          onClick={async () => {
            await wallet.connect('injected')
          }}
          className={css`
            color: white;
            cursor: var(--cursor-pointer);
          `}
        >
          CONNECT
        </button>
      )}
      <button
        onClick={async () => {
          setText(ethers.BigNumber.from(ethers.utils.randomBytes(32)).toHexString())
        }}
        className={css`
          color: white;
          cursor: var(--cursor-pointer);
        `}
      >
        RANDOM
      </button>
      <button
        onClick={async () => {
          if (contract && signer) {
            await contract.mint(signer._address, text, {
              value: ethers.utils.parseEther('0.001'),
            })
            setText('')
            mutate()
          }
        }}
        className={css`
          color: white;
          cursor: var(--cursor-pointer);
        `}
      >
        MINT
      </button>
      <Border width={68} height={3}>
        <Textarea value={text} onChange={setText} width={66} height={1} />
      </Border>
      <Border width={68} height={3}>
        <Text value={balance?.toBigInt().toString()} />
      </Border>
      {balance
        ? Array.from({ length: balance.toNumber() }).map((_, index) => (
            <Token key={index} index={index} />
          ))
        : null}
    </Box>
  )
}

function Token(props: { index: number }) {
  const wallet = useWallet()
  const signer = useMemo(
    () =>
      wallet.ethereum && wallet.account
        ? new ethers.providers.Web3Provider(wallet.ethereum).getSigner(wallet.account)
        : undefined,
    [wallet],
  )
  const contract = useMemo(
    () => (signer ? ExtendedAsciiPlot__factory.connect(ADDRESS, signer) : undefined),
    [signer],
  )
  const { data: token } = useSWR(
    contract && signer
      ? ['tokenOfOwnerByIndex', contract.address, signer._address, props.index]
      : null,
    () => contract!.tokenOfOwnerByIndex(signer!._address, props.index),
    { revalidateOnFocus: false },
  )
  const { data: tokenURI } = useSWR(
    token && contract ? ['tokenURI', token.toHexString(), contract.address] : null,
    () => contract!.tokenURI(token!.toHexString()),
  )
  console.log(tokenURI)

  return (
    <Border width={68} height={3}>
      {token ? <Text value={ethers.utils.hexZeroPad(token.toHexString(), 32)} /> : null}
    </Border>
  )
}
