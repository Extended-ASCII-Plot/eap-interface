import * as Comlink from 'comlink'
import svgToMiniDataURI from 'mini-svg-data-uri'
import { renderToStaticMarkup } from 'react-dom/server'
import { DotSvg, PlotSvg } from '../components/svg'

function renderDot(value: number) {
  return `url("${svgToMiniDataURI(renderToStaticMarkup(<DotSvg value={value} />))}")`
}

function renderPlot(value: string, width: number, height: number) {
  return `url("${svgToMiniDataURI(
    renderToStaticMarkup(<PlotSvg value={value} width={width} height={height} />),
  )}")`
}

const workerApi: RenderWorkerApi = {
  renderDot,
  renderPlot,
}

export interface RenderWorkerApi {
  renderDot: typeof renderDot
  renderPlot: typeof renderPlot
}

Comlink.expose(workerApi)
