import { ethers } from 'ethers'

export function differentColors(token: string): number {
  const buf = Buffer.from(
    ethers.utils.hexZeroPad(ethers.BigNumber.from(token).toHexString(), 32).replace(/^0x/, ''),
    'hex',
  )
  const array = new Uint16Array(16)
  for (let i = 0; i < 16; i++) {
    array[i] = buf.readUInt16BE(i * 2)
  }
  return (
    array
      .reduce((prev, dot) => (1 << (dot & 0xf)) | (1 << ((dot & 0xf0) >> 4)) | prev, 0)
      .toString(2)
      .split('1').length - 1
  )
}

export function differentCharacters(token: string): number {
  const buf = Buffer.from(
    ethers.utils.hexZeroPad(ethers.BigNumber.from(token).toHexString(), 32).replace(/^0x/, ''),
    'hex',
  )
  const array = new Uint16Array(16)
  for (let i = 0; i < 16; i++) {
    array[i] = buf.readUInt16BE(i * 2)
  }
  return (
    array
      .reduce((prev, dot) => (1 << ((dot & 0xf00) >> 8)) | (1 << ((dot & 0xf000) >> 4)) | prev, 0)
      .toString(2)
      .split('1').length - 1
  )
}
