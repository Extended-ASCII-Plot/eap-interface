import { css } from '@emotion/css'
import { ethers } from 'ethers'
import { useCallback, useEffect, useMemo, useState } from 'react'
import useSWR from 'swr'
import { useWallet } from 'use-wallet'
import Link from 'next/link'
import { ExtendedAsciiPlot__factory } from '../abi'
import Border from '../components/border'
import Plot from '../components/plot'
import Text from '../components/text'
import Input from '../components/input'
import Button from '../components/button'
import {
  CHAIN_ID,
  CONTRACT_ADDRESS,
  FONT_HEIGHT,
  FONT_SCALE_FACTOR,
  FONT_WIDTH,
} from '../utils/constants'
import CodeMap from '../components/code-map'
import Dot from '../components/dot'

export default function IndexPage() {
  const wallet = useWallet()
  const signer = useMemo(
    () =>
      wallet.ethereum && wallet.account
        ? new ethers.providers.Web3Provider(wallet.ethereum, CHAIN_ID).getSigner(wallet.account)
        : undefined,
    [wallet],
  )
  const contract = useMemo(
    () =>
      signer && CONTRACT_ADDRESS
        ? ExtendedAsciiPlot__factory.connect(CONTRACT_ADDRESS, signer)
        : undefined,
    [signer],
  )
  const [value, setValue] = useState('')
  const { data: balance, mutate } = useSWR(
    signer && contract ? ['balanceOf', signer._address, contract.address] : null,
    () => contract!.balanceOf(signer!._address),
  )
  const event = useMemo(
    () =>
      signer
        ? {
            address: CONTRACT_ADDRESS,
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
  const handleRandom = useCallback(() => {
    setValue(
      ethers.BigNumber.from(ethers.utils.randomBytes(32))
        .toHexString()
        .replace(/^0x/, '')
        .toUpperCase(),
    )
  }, [])
  useEffect(() => {
    const cache = localStorage.getItem('value')
    if (typeof cache === 'string' && cache.length === 64) {
      setValue(cache)
    } else {
      handleRandom()
    }
  }, [handleRandom])

  return (
    <div
      className={css`
        margin: ${FONT_HEIGHT * FONT_SCALE_FACTOR}px auto;
        width: ${36 * FONT_WIDTH * FONT_SCALE_FACTOR}px;
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
        <span>
          <a
            title="Font"
            href="https://polyducks.itch.io/kitchen-sink-textmode-font"
            target="_blank"
          >
            <Dot value={0x1470} />
          </a>
          <Text> </Text>
          <a
            title="OpenSea"
            href="https://opensea.io/collection/extended-ascii-plot"
            target="_blank"
          >
            <Dot value={0x067c} />
          </a>
          <Text> </Text>
          <a title="GitHub" href="https://github.com/Extended-ASCII-Plot" target="_blank">
            <Dot value={0xf907} />
          </a>
        </span>
      </div>
      <div
        className={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: ${FONT_HEIGHT * FONT_SCALE_FACTOR}px;
          margin-bottom: ${FONT_HEIGHT * FONT_SCALE_FACTOR}px;
        `}
      >
        <Button onClick={handleRandom}>RANDOM</Button>
        {wallet.status === 'connected' ? (
          wallet.chainId === CHAIN_ID ? (
            <Button
              disabled={!value}
              onClick={async () => {
                if (contract && signer) {
                  try {
                    // throw if does now have owner
                    await contract.ownerOf(`0x${value}`)
                    confirm('Token already minted.')
                  } catch {
                    await contract.mint(signer._address, `0x${value}`, {
                      value: ethers.utils.parseEther('0'),
                    })
                    mutate()
                  }
                }
              }}
            >
              MINT
            </Button>
          ) : (
            <Button
              onClick={() => {
                signer?.provider?.send('wallet_switchEthereumChain', [
                  { chainId: `0x${CHAIN_ID.toString(16)}` },
                ])
              }}
            >
              SWITCH NETWORK
            </Button>
          )
        ) : (
          <Button
            onClick={async () => {
              await wallet.connect('injected')
            }}
          >
            CONNECT METAMASK
          </Button>
        )}
      </div>
      <div
        className={css`
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        `}
      >
        <div>
          <div>
            <Text color={0xa0}>{Uint8Array.from([0x20, 0x03, 0x04, 0x05, 0x06])}</Text>
            {Array.from({ length: 3 }).map((_, index) => (
              <Text key={index} color={0x50}>
                {Uint8Array.from([0x89, 0x96, 0x96, 0x8a])}
              </Text>
            ))}
            <Text color={0x50}>{Uint8Array.from([0x96])}</Text>
          </div>
          <Border width={18} height={6}>
            <Input
              value={value}
              onChange={(v) => {
                setValue(v)
                localStorage.setItem('value', v)
              }}
              width={16}
              height={4}
            />
          </Border>
          <Border width={16 + 2} height={16 + 2}>
            {value ? (
              <Plot
                value={ethers.utils.hexZeroPad(
                  ethers.BigNumber.from(`0x${value}`).toHexString(),
                  32,
                )}
                factor={4}
              />
            ) : null}
          </Border>
        </div>
        <div>
          <Text color={0x50}>{Uint8Array.from([0x96, 0x8a])}</Text>
          <div>
            <Text color={0x50}>{Uint8Array.from([0x20, 0x1e])}</Text>
            <Text color={0x60}> CODEBOOK</Text>
          </div>
          <CodeMap />
        </div>
      </div>
      {balance ? (
        <div
          className={css`
            margin-top: ${FONT_HEIGHT * FONT_SCALE_FACTOR}px;
          `}
        >
          <Text>{`Balance:${balance.toBigInt().toString()}`}</Text>
          <div
            className={css`
              display: flex;
              flex-wrap: wrap;
            `}
          >
            {Array.from({ length: balance.toNumber() }).map((_, index) => (
              <Token key={index} index={balance.toNumber() - index - 1} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}

function Token(props: { index: number }) {
  const wallet = useWallet()
  const signer = useMemo(
    () =>
      wallet.ethereum && wallet.account
        ? new ethers.providers.Web3Provider(wallet.ethereum, CHAIN_ID).getSigner(wallet.account)
        : undefined,
    [wallet],
  )
  const contract = useMemo(
    () =>
      signer && CONTRACT_ADDRESS
        ? ExtendedAsciiPlot__factory.connect(CONTRACT_ADDRESS, signer)
        : undefined,
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

  return (
    <Border width={4 + 2} height={4 + 2}>
      <Link href={`/plot/${value}`} passHref={true}>
        <a target="_blank">
          <Plot value={value} />
        </a>
      </Link>
    </Border>
  )
}
