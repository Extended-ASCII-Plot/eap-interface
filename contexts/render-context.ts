import { Remote } from 'comlink'
import { createContext, useContext } from 'react'
import { RenderWorkerApi } from '../workers/render.worker'

const context = createContext<Remote<RenderWorkerApi> | undefined>(undefined)

export function useRender() {
  return useContext(context)
}

export const RenderProvider = context.Provider
