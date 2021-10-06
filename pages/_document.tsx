import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'
import createEmotionServer from '@emotion/server/create-instance'
import { cache } from '@emotion/css'
import { GoogleAnalytics } from '@lukeshay/next-ga'
import { BASE_URL } from '../utils/constants'

const renderStatic = async (html: string) => {
  const { extractCritical } = createEmotionServer(cache)
  const { ids, css } = extractCritical(html)

  return { html, ids, css }
}

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const page = await ctx.renderPage()
    const { css, ids } = await renderStatic(page.html)
    const initialProps = await Document.getInitialProps(ctx)

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <style
            data-emotion={`css ${ids.join(' ')}`}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: css }}
          />
        </>
      ),
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta charSet="UTF-8" />
          <meta httpEquiv="x-dns-prefetch-control" content="on" />

          <meta name="application-name" content="Extended ASCII Plot" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="Extended ASCII Plot" />
          <meta name="description" content="Mint your ASCII Art on Ethereum" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="theme-color" content="#f9f7f1" />

          <link rel="apple-touch-icon" href="/static/icons/touch-icon-iphone.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/static/icons/touch-icon-ipad.png" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/static/icons/touch-icon-iphone-retina.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="167x167"
            href="/static/icons/touch-icon-ipad-retina.png"
          />

          <link rel="icon" type="image/png" sizes="32x32" href="/static/icons/favicon-32x32.png" />
          <link rel="manifest" href="/static/manifest.json" />
          <link rel="mask-icon" href="/static/icons/icon-512x512.svg" color="#f9f7f1" />
          <link rel="shortcut icon" href="/favicon.ico" />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:url" content={BASE_URL} />
          <meta name="twitter:title" content="Extended ASCII Plot" />
          <meta name="twitter:description" content="Mint your ASCII Art on Ethereum" />
          <meta
            name="twitter:image"
            content={`${BASE_URL}static/icons/android-chrome-192x192.png`}
          />
          <meta name="twitter:creator" content="@RenzHoly" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Extended ASCII Plot" />
          <meta property="og:description" content="Mint your ASCII Art on Ethereum" />
          <meta property="og:site_name" content="Extended ASCII Plot" />
          <meta property="og:url" content={BASE_URL} />
          <meta property="og:image" content={`${BASE_URL}static/icons/touch-icon-iphone.png`} />
          <GoogleAnalytics />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
