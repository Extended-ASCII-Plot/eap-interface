import Head from 'next/head'
import type { AppProps } from 'next/app'
import { injectGlobal } from '@emotion/css'
import { UseWalletProvider } from 'use-wallet'
import { reportWebVitals, useAppInit } from '@lukeshay/next-ga'
import { ethers } from 'ethers'
import { useEffect, useMemo, useRef } from 'react'
import * as Comlink from 'comlink'
import { CONTRACT_ADDRESS, JSON_RPC } from '../utils/constants'
import { ExtendedAsciiPlotPolygon__factory } from '../abi'
import { ContractProvider } from '../contexts/contract-context'
import { RenderProvider } from '../contexts/render-context'
import { RenderWorkerApi } from '../workers/render.worker'

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
  const workerRef = useRef<Worker>()
  const comlinkWorkerRef = useRef<Comlink.Remote<RenderWorkerApi>>()
  useEffect(() => {
    workerRef.current = new Worker(new URL('../workers/render.worker', import.meta.url))
    comlinkWorkerRef.current = Comlink.wrap<RenderWorkerApi>(workerRef.current)
    return workerRef.current?.terminate
  }, [])

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
        <title>Extended ASCII Plot</title>
      </Head>
      <RenderProvider value={comlinkWorkerRef.current}>
        <ContractProvider value={contract}>
          <UseWalletProvider>
            <Component {...pageProps} />
          </UseWalletProvider>
        </ContractProvider>
      </RenderProvider>
    </>
  )
}

export { reportWebVitals }
