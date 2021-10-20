import { ethers } from 'ethers'
import { createContext, useContext } from 'react'
import { ExtendedAsciiPlotPolygon__factory } from '../abi'
import { CONTRACT_ADDRESS, JSON_RPC } from '../utils/constants'

const provider = new ethers.providers.JsonRpcBatchProvider(JSON_RPC)

const contract = ExtendedAsciiPlotPolygon__factory.connect(CONTRACT_ADDRESS, provider)

const context = createContext(contract)

export function useContract() {
  return useContext(context)
}

export const ContractProvider = context.Provider
