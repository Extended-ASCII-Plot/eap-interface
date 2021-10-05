import { css } from '@emotion/css'
import { ethers } from 'ethers'
import { useCallback, useEffect, useMemo, useState } from 'react'
import useSWR from 'swr'
import { useWallet } from 'use-wallet'
import { ExtendedAsciiPlot__factory } from '../abi'
import Border from '../components/border'
import Box from '../components/box'
import Plot from '../components/plot'
import Text from '../components/text'
import Input from '../components/input'
import Button from '../components/button'

const ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

export default function IndexPage() {
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
    <Box
      width={68}
      height={40}
      className={css`
        margin: 0 auto;
      `}
    >
      {wallet.status === 'connected' ? (
        <Button
          onClick={() => {
            wallet.reset()
          }}
        >
          DISCONNECT
        </Button>
      ) : (
        <Button
          onClick={async () => {
            await wallet.connect('injected')
          }}
        >
          CONNECT
        </Button>
      )}
      <Button
        onClick={async () => {
          setText(
            ethers.BigNumber.from(ethers.utils.randomBytes(32)).toHexString().replace(/^0x/, ''),
          )
        }}
      >
        RANDOM
      </Button>
      <Button
        disabled={!text || !contract || !signer}
        onClick={async () => {
          if (contract && signer) {
            await contract.mint(signer._address, `0x${text}`, {
              value: ethers.utils.parseEther('0.001'),
            })
            setText('')
            mutate()
          }
        }}
      >
        MINT
      </Button>
      <Border width={68} height={3}>
        <div
          className={css`
            display: flex;
          `}
        >
          <Text color={0xcccfn}>0x</Text>
          <Input value={text} onChange={setText} mask={/[0-9a-fA-F]{0,64}/g} width={65} />
        </div>
      </Border>
      <Border width={4 + 2} height={4 + 2}>
        {text ? (
          <Plot
            value={ethers.utils.hexZeroPad(ethers.BigNumber.from(`0x${text}`).toHexString(), 32)}
          />
        ) : null}
      </Border>
      {balance ? (
        <>
          <Text>{` balance: ${balance.toBigInt().toString()}`}</Text>
          <div
            className={css`
              display: flex;
              flex-wrap: wrap;
            `}
          >
            {Array.from({ length: balance.toNumber() }).map((_, index) => (
              <Token key={index} index={index} />
            ))}
          </div>
        </>
      ) : null}
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
    <Border width={4 + 2} height={4 + 2}>
      {token ? <Plot value={ethers.utils.hexZeroPad(token.toHexString(), 32)} /> : null}
    </Border>
  )
}
