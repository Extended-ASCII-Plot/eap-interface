import { renderToStaticMarkup } from 'react-dom/server'
import svgToMiniDataURI from 'mini-svg-data-uri'
import type { ReactElement } from 'react'

export function SVG2DataURI(svg: ReactElement<SVGAElement>) {
  return `url("${svgToMiniDataURI(renderToStaticMarkup(svg))}")`
}
