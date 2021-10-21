import * as Comlink from 'comlink'
import { renderDot, renderPlot } from '../utils/svg'

const workerApi: RenderWorkerApi = {
  renderDot,
  renderPlot,
}

export interface RenderWorkerApi {
  renderDot: typeof renderDot
  renderPlot: typeof renderPlot
}

Comlink.expose(workerApi)
