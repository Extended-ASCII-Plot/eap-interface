import { ethers } from 'ethers'
import { useMemo } from 'react'
import useSWR from 'swr'
import { useWallet } from 'use-wallet'
import Button from '../components/button'
import { CHAIN_ID } from '../utils/constants'

const targetCancelTxId = ''

export default function CancelPage() {
  const wallet = useWallet()
  const signer = useMemo(
    () =>
      wallet.ethereum && wallet.account
        ? new ethers.providers.Web3Provider(wallet.ethereum, CHAIN_ID).getSigner(wallet.account)
        : undefined,
    [wallet],
  )
  const { data: transactionDetail } = useSWR(
    signer ? ['getTransaction', targetCancelTxId, signer._address] : null,
    () => signer!.provider.getTransaction(targetCancelTxId),
  )
  console.log(transactionDetail)

  return (
    <>
      <Button
        onClick={() => {
          wallet.connect('injected')
        }}
      >
        CONNECT
      </Button>
      <Button
        onClick={() => {
          if (!transactionDetail || !signer) {
            return
          }
          var cancelTxFrom = transactionDetail.from
          var cancelTxNonce = transactionDetail.nonce
          var cancelGasPrice = transactionDetail.gasPrice!
          var gas = 21000
          var gasPrice = cancelGasPrice?.mul(2)
          console.log({
            from: cancelTxFrom,
            to: cancelTxFrom,
            gasLimit: ethers.BigNumber.from(gas),
            gasPrice: ethers.BigNumber.from(gasPrice),
            value: ethers.utils.parseEther('0'),
            nonce: cancelTxNonce,
            data: '0x',
          })
          signer.sendUncheckedTransaction({
            from: cancelTxFrom,
            to: cancelTxFrom,
            gasLimit: ethers.BigNumber.from(gas),
            gasPrice: ethers.BigNumber.from(gasPrice),
            value: ethers.utils.parseEther('0'),
            nonce: cancelTxNonce,
            data: '0x',
          })
        }}
      >
        CANCEL
      </Button>
    </>
  )
}
