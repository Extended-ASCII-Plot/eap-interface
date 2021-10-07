import type { ethers, Signer } from 'ethers'
import { useMemo } from 'react'
import { ExtendedAsciiPlot__factory } from '../abi'
import { CONTRACT_ADDRESS } from '../utils/constants'

export default function useContract(
  signerOrProvider: Signer | ethers.providers.Provider | undefined,
) {
  return useMemo(
    () =>
      signerOrProvider
        ? ExtendedAsciiPlot__factory.connect(CONTRACT_ADDRESS, signerOrProvider)
        : undefined,
    [signerOrProvider],
  )
}
