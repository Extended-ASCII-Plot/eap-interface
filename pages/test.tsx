import { ethers } from 'ethers'
import { useState } from 'react'
import useSWR from 'swr'
import { ExtendedAsciiPlot__factory } from '../abi'
import Border from '../components/border'
import Box from '../components/box'
import Text from '../components/text'
import Textarea from '../components/textarea'

const ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545')
const signer = provider.getSigner('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266')
const contract = ExtendedAsciiPlot__factory.connect(ADDRESS, signer)

export default function Test() {
  const [text, setText] = useState('')
  const { data: balance, mutate } = useSWR(['balanceOf', signer._address], () =>
    contract.balanceOf(signer._address),
  )

  return (
    <Box width={44} height={3}>
      <Border width={44} height={3}>
        <Textarea value={text} onChange={setText} width={42} height={1} />
      </Border>
      <button
        onClick={async () => {
          await contract.mint(signer._address, text, {
            value: ethers.utils.parseEther('0.001'),
          })
          setText('')
          mutate()
        }}
      >
        MINT
      </button>
      <Border width={44} height={3}>
        <Text value={balance?.toBigInt().toString()} />
      </Border>
      {balance
        ? Array.from({ length: balance.toNumber() }).map((_, index) => (
            <Token key={index} index={index} />
          ))
        : null}
    </Box>
  )
}

function Token(props: { index: number }) {
  const { data: token } = useSWR(
    ['tokenOfOwnerByIndex', signer._address, props.index],
    () => contract.tokenOfOwnerByIndex(signer._address, props.index),
    { revalidateOnFocus: false },
  )

  return (
    <Border width={44} height={3}>
      <Text value={token?.toHexString()} />
    </Border>
  )
}
