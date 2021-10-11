import { ethers } from 'ethers'

export function differentColors(token: string): number {
  const buf = Buffer.from(
    ethers.utils.hexZeroPad(ethers.BigNumber.from(token).toHexString(), 32).replace(/^0x/, ''),
    'hex',
  )
  const array = new Uint8Array(16)
  for (let i = 0; i < 16; i++) {
    array[i] = buf.readUInt8(i * 2 + 1)
  }
  return (
    array
      .reduce((prev, dot) => (1 << ((dot & 0xf) + 1)) | (1 << (((dot & 0xf0) >> 4) + 1)) | prev, 0)
      .toString(2)
      .split('1').length - 1
  )
}

export function differentCharacters(token: string): number {
  const buf = Buffer.from(
    ethers.utils.hexZeroPad(ethers.BigNumber.from(token).toHexString(), 32).replace(/^0x/, ''),
    'hex',
  )
  const array = new Uint8Array(16)
  for (let i = 0; i < 16; i++) {
    array[i] = buf.readUInt8(i * 2)
  }
  return new Set(array).size
}
