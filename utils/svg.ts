import svgToMiniDataURI from 'mini-svg-data-uri'
import { renderToStaticMarkup } from 'react-dom/server'
import { DotSvg, PlotSvg } from '../components/svg'

export function renderDot(value: number) {
  return `url("${svgToMiniDataURI(renderToStaticMarkup(DotSvg({ value })))}")`
}

export function renderPlot(value: string, width: number, height: number) {
  return `url("${svgToMiniDataURI(renderToStaticMarkup(PlotSvg({ value, width, height })))}")`
}
