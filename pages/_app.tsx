import Head from 'next/head'
import type { AppProps } from 'next/app'
import { injectGlobal } from '@emotion/css'
import { UseWalletProvider } from 'use-wallet'
import { reportWebVitals, useAppInit } from '@lukeshay/next-ga'

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

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, viewport-fit=cover"
        />
        <title>Extended ASCII Plot</title>
      </Head>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <UseWalletProvider>
        <Component {...pageProps} />
      </UseWalletProvider>
    </>
  )
}

export { reportWebVitals }
