import { css } from '@emotion/css'
import { ethers } from 'ethers'
import { useCallback, useEffect, useMemo, useState } from 'react'
import useSWR from 'swr'
import { useWallet } from 'use-wallet'
import Link from 'next/link'
import { ExtendedAsciiPlot__factory } from '../abi'
import Border from '../components/border'
import Box from '../components/box'
import Plot from '../components/plot'
import Text from '../components/text'
import Input from '../components/input'
import Button from '../components/button'
import { FONT_HEIGHT, FONT_SCALE_FACTOR, FONT_WIDTH } from '../utils/constants'

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
        margin: ${FONT_HEIGHT * FONT_SCALE_FACTOR}px auto;
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
          <Text>Extended ASCII Plot</Text>
        </span>
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
      </div>
      <div
        className={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
        `}
      >
        <Button
          onClick={async () => {
            setText(
              ethers.BigNumber.from(ethers.utils.randomBytes(32)).toHexString().replace(/^0x/, ''),
            )
          }}
        >
          RANDOM
        </Button>
        {contract && signer ? (
          <Button
            disabled={!text}
            onClick={async () => {
              if (contract && signer) {
                try {
                  // throw if does now have owner
                  await contract.ownerOf(`0x${text}`)
                  confirm('Token already minted.')
                } catch {
                  await contract.mint(signer._address, `0x${text}`, {
                    value: ethers.utils.parseEther('0.001'),
                  })
                  setText('')
                  mutate()
                }
              }
            }}
          >
            MINT
          </Button>
        ) : null}
      </div>
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
              padding-left: ${FONT_WIDTH * FONT_SCALE_FACTOR}px;
            `}
          >
            {Array.from({ length: balance.toNumber() }).map((_, index) => (
              <Token key={index} index={balance.toNumber() - index - 1} />
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
  const value = useMemo(
    () => (token ? ethers.utils.hexZeroPad(token.toHexString(), 32) : undefined),
    [token],
  )
  console.log(tokenURI)

  return (
    <Link href={`/plot/${value}`} passHref={true}>
      <a
        target="_blank"
        className={css`
          cursor: var(--cursor-pointer);
        `}
      >
        <Border width={4 + 2} height={4 + 2}>
          <Plot value={value} />
        </Border>
      </a>
    </Link>
  )
}
