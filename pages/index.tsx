import { css } from '@emotion/css'
import { ethers } from 'ethers'
import { useCallback, useEffect, useMemo, useState } from 'react'
import useSWR from 'swr'
import { useWallet } from 'use-wallet'
import Link from 'next/link'
import { useRouter } from 'next/router'
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
import Token from '../components/token'
import { ExtendedAsciiPlotPolygon__factory } from '../abi'
import { useContract } from '../contexts/contract-context'

export default function IndexPage() {
  const wallet = useWallet()
  const router = useRouter()
  const signer = useMemo(
    () =>
      wallet.ethereum && wallet.account
        ? new ethers.providers.Web3Provider(wallet.ethereum, CHAIN_ID).getSigner(wallet.account)
        : undefined,
    [wallet],
  )
  const contract = useMemo(
    () =>
      signer ? ExtendedAsciiPlotPolygon__factory.connect(CONTRACT_ADDRESS, signer) : undefined,
    [signer],
  )
  const contractRead = useContract()
  const [value, setValue] = useState('')
  const [pending, setPending] = useState(false)
  const { data: balance, mutate } = useSWR(
    signer && contract ? ['balanceOf', signer._address, contract.address] : null,
    () => contract!.balanceOf(signer!._address),
  )
  const { data: nativeBalance } = useSWR(signer ? ['getBalance', signer._address] : null, () =>
    signer?.getBalance(),
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
  const handleRefresh = useCallback(async () => {
    await mutate()
    setPending(false)
  }, [mutate])
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
  const handleMint = useCallback(async () => {
    if (contract && signer) {
      try {
        // throw if does now have owner
        await contract.ownerOf(`0x${value}`)
        confirm('Token already minted.')
      } catch {
        await contract.mint(signer._address, `0x${value}`, {
          value: ethers.utils.parseEther('1'),
        })
        localStorage.setItem('value', value)
        setPending(true)
      }
    }
  }, [contract, signer, value])
  const { data: totalSupply } = useSWR(['totalSupply', contractRead.address], () =>
    contractRead.totalSupply(),
  )

  return (
    <div
      className={css`
        margin: 0 auto;
        width: ${38 * FONT_WIDTH * FONT_SCALE_FACTOR}px;
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
          <Text>Extended ASCII Plot</Text>
        </span>
        <span>
          <Link href="/help" passHref={true}>
            <a>
              <Text color={0x0a}>?</Text>
            </a>
          </Link>
          <Text> </Text>
          <a
            title="Twitter"
            href="https://twitter.com/aliez_ren"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Dot value={0xf47c} />
          </a>
          <Text> </Text>
          <a
            title="Discord"
            href="https://discord.gg/btyVYANhNy"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Dot value={0xf57d} />
          </a>
          <Text> </Text>
          <a
            title="GitHub"
            href="https://github.com/Extended-ASCII-Plot"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Dot value={0xf207} />
          </a>
          <Text> </Text>
          <a
            title="OpenSea"
            href="https://opensea.io/collection/extended-ascii-plot"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Dot value={0xfa7c} />
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
            nativeBalance?.toBigInt() === 0n ? (
              <Button
                onClick={() => {
                  router.push('/help')
                }}
              >
                GET MATIC
              </Button>
            ) : (
              <Button disabled={!value || pending} onClick={handleMint}>
                {pending ? 'PENDING' : 'MINT'}
              </Button>
            )
          ) : (
            <Button
              onClick={async () => {
                if (!signer) {
                  return
                }
                try {
                  await signer.provider.send('wallet_switchEthereumChain', [
                    { chainId: `0x${CHAIN_ID.toString(16)}` },
                  ])
                } catch {
                  await signer.provider.send('wallet_addEthereumChain', [
                    {
                      chainId: `0x${CHAIN_ID.toString(16)}`,
                      chainName: 'Polygon Mainnet',
                      nativeCurrency: {
                        name: 'Matic',
                        symbol: 'MATIC',
                        decimals: 18,
                      },
                      rpcUrls: ['https://polygon-rpc.com/'],
                      blockExplorerUrls: ['https://polygonscan.com/'],
                    },
                  ])
                }
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
          <Border width={18} height={6} color={0xa0}>
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
                scale={4}
              />
            ) : null}
          </Border>
        </div>
        <div>
          <Text color={0x50}>{Uint8Array.from([0x96, 0x8a])}</Text>
          <div>
            <Text color={0x50}>{Uint8Array.from([0x20, 0x1f])}</Text>
            <Text color={0x60}> CODEBOOK</Text>
          </div>
          <CodeMap />
        </div>
      </div>
      {signer && balance ? (
        <div
          className={css`
            margin-top: ${FONT_HEIGHT * FONT_SCALE_FACTOR}px;
          `}
        >
          <div
            className={css`
              display: flex;
              justify-content: space-between;
            `}
          >
            <span>
              <Text>{`Owned:${balance.toBigInt().toString()}`}</Text>
            </span>
            <Link href="/gallery" passHref={true}>
              <a>
                <Text>GALLERY </Text>
                <Text>{Uint8Array.from([0x1a])}</Text>
              </a>
            </Link>
          </div>
          <div
            className={css`
              display: flex;
              flex-wrap: wrap;
              margin-top: ${FONT_HEIGHT * FONT_SCALE_FACTOR}px;
            `}
          >
            {Array.from({ length: balance.toNumber() }).map((_, index) => (
              <Token key={index} address={signer._address} index={balance.toNumber() - index - 1} />
            ))}
          </div>
        </div>
      ) : (
        <div
          className={css`
            margin-top: ${FONT_HEIGHT * FONT_SCALE_FACTOR}px;
          `}
        >
          <div
            className={css`
              display: flex;
              justify-content: space-between;
            `}
          >
            <span>
              <Text>Minted by others:</Text>
            </span>
            <Link href="/gallery" passHref={true}>
              <a>
                <Text>GALLERY </Text>
                <Text>{Uint8Array.from([0x1a])}</Text>
              </a>
            </Link>
          </div>
          {totalSupply ? (
            <div
              className={css`
                display: flex;
                flex-wrap: wrap;
                margin-top: ${FONT_HEIGHT * FONT_SCALE_FACTOR}px;
              `}
            >
              {Array.from({ length: 18 }).map((_, index) => (
                <Token key={index} index={totalSupply.toNumber() - index - 1} />
              ))}
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}
