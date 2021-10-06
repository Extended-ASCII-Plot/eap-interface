import { ethers } from 'ethers'
import type { NextApiRequest, NextApiResponse } from 'next'
import base85 from 'base85'
import { BASE_URL } from '../../utils/constants'

export default async function TokenAPI(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.query
  const buf = Buffer.from(
    ethers.utils.hexZeroPad(ethers.BigNumber.from(token).toHexString(), 32).replace(/^0x/, ''),
    'hex',
  )

  res.json({
    name: `${base85.encode(buf)}`,
    description: `\`\`\`\n${chunk(buf.toString('hex').toUpperCase().split(''), 16)
      .map((c16) => c16.join(''))
      .join('\n')}\n\`\`\``,
    image: `${BASE_URL}api/svg/0x${buf.toString('hex')}`,
    external_url: `${BASE_URL}plot/0x${buf.toString('hex')}`,
    background_color: '000000',
  })
}

function chunk<T>(input: T[], size: number): T[][] {
  return input.reduce((arr, item, idx) => {
    return idx % size === 0 ? [...arr, [item]] : [...arr.slice(0, -1), [...arr.slice(-1)[0], item]]
  }, [] as T[][])
}
