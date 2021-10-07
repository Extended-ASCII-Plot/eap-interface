import { ethers } from 'ethers'
import { useMemo } from 'react'
import { JSON_RPC } from '../utils/constants'

export default function useProvider() {
  return useMemo(() => new ethers.providers.JsonRpcProvider(JSON_RPC), [])
}
