import type { NextApiRequest, NextApiResponse } from 'next'
import { renderToStaticMarkup } from 'react-dom/server'
import { PlotSvg } from '../../../components/plot'
import { FONT_WIDTH, FONT_SCALE_FACTOR, FONT_HEIGHT } from '../../../utils/constants'

const SCALE = 32

export default async function SvgAPI(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Content-Type', 'image/svg+xml')
  res.write(
    renderToStaticMarkup(
      <PlotSvg
        value={req.query.token as string}
        width={FONT_WIDTH * FONT_SCALE_FACTOR * SCALE}
        height={FONT_HEIGHT * FONT_SCALE_FACTOR * SCALE}
      />,
    ),
  )
  res.end()
}
