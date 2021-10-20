import Head from 'next/head'
import type { AppProps } from 'next/app'
import { injectGlobal } from '@emotion/css'
import { UseWalletProvider } from 'use-wallet'
import { reportWebVitals, useAppInit } from '@lukeshay/next-ga'
import { ethers } from 'ethers'
import { useMemo } from 'react'
import { CONTRACT_ADDRESS, JSON_RPC } from '../utils/constants'
import { ExtendedAsciiPlotPolygon__factory } from '../abi'
import { ContractProvider } from '../contexts/contract-context'

injectGlobal`
:root {
  --cursor-default: url(/cursors/cursor-default.svg), default;
  --cursor-pointer: url(/cursors/cursor-pointer.svg) 14 0, pointer;
  --cursor-text: url(/cursors/cursor-text.svg) 16 16, text;
}

::-webkit-scrollbar {
  display: none;
}

html {
  background-color: black;
  cursor: var(--cursor-default);
}

* {
  margin: 0;
  background-color: transparent;
  box-sizing: border-box;
  outline: none;
  -webkit-font-smoothing: none;
  -webkit-text-size-adjust: none;
  -webkit-tap-highlight-color: transparent;
}

a {
  line-height: 0;
  display: inline-block;
  cursor: var(--cursor-pointer);
}

div, span {
  line-height: 0;
}
`

export default function App({ Component, pageProps }: AppProps) {
  useAppInit()
  const provider = useMemo(() => new ethers.providers.JsonRpcBatchProvider(JSON_RPC), [])
  const contract = useMemo(
    () => ExtendedAsciiPlotPolygon__factory.connect(CONTRACT_ADDRESS, provider),
    [provider],
  )

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
        <title>Extended ASCII Plot</title>
      </Head>
      <ContractProvider value={contract}>
        <UseWalletProvider>
          <Component {...pageProps} />
        </UseWalletProvider>
      </ContractProvider>
    </>
  )
}

export { reportWebVitals }
