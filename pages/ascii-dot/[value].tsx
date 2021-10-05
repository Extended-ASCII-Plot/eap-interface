import type { GetServerSideProps } from 'next'
import { renderToStaticMarkup } from 'react-dom/server'
import { AsciiDotSvg } from '../../components/ascii-dot'

export default function AsciiDotPage() {
  return null
}

export const getServerSideProps: GetServerSideProps<{}, { value: string }> = async ({
  res,
  params,
}) => {
  if (!params) {
    return {
      props: {},
    }
  }
  res.setHeader('Content-Type', 'image/svg+xml')
  res.write(renderToStaticMarkup(<AsciiDotSvg value={parseInt(params.value)} />))
  res.end()
  return {
    props: {},
  }
}
