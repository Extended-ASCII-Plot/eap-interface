import type { GetServerSideProps } from 'next'
import { renderToStaticMarkup } from 'react-dom/server'
import Plot from '../components/plot'
import { FONT_WIDTH, FONT_SCALE_FACTOR, FONT_HEIGHT } from '../utils/constants'

export default function ValuePage() {
  return null
}

const SCALE = 40

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
  res.write(
    renderToStaticMarkup(
      <Plot
        value={params.value}
        width={FONT_WIDTH * FONT_SCALE_FACTOR * SCALE}
        height={FONT_HEIGHT * FONT_SCALE_FACTOR * SCALE}
      />,
    ),
  )
  res.end()
  return {
    props: {},
  }
}
