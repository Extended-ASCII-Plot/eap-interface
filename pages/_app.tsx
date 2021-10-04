import Head from 'next/head'
import type { AppProps } from 'next/app'
import { injectGlobal } from '@emotion/css'

injectGlobal`
::-webkit-scrollbar {
  display: none;
}

html {
  background-color: black;
}

* {
  margin: 0;
  background-color: transparent;
  box-sizing: border-box;
  outline: none;
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
      <Component {...pageProps} />
    </>
  )
}

export default App
