import Head from 'next/head'
import type { AppProps } from 'next/app'
import { injectGlobal } from '@emotion/css'
import { UseWalletProvider } from 'use-wallet'

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

@font-face {
  font-family: 'Kitchen Sink';
  src: url('/Kitchen Sink.ttf') format('truetype');
}
`

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="referrer" content="no-referrer" />
        <title>Extended ASCII Plot</title>
      </Head>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <UseWalletProvider>
        <Component {...pageProps} />
      </UseWalletProvider>
    </>
  )
}

export default App
