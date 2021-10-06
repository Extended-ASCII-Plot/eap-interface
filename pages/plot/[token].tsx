import type { GetServerSideProps } from 'next'
import { renderToStaticMarkup } from 'react-dom/server'
import { PlotSvg } from '../../components/plot'
import { FONT_WIDTH, FONT_SCALE_FACTOR, FONT_HEIGHT } from '../../utils/constants'

export default function TokenPage() {
  return null
}

const SCALE = 32

export const getServerSideProps: GetServerSideProps<{}, { token: string }> = async ({
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
      <PlotSvg
        value={params.token}
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
