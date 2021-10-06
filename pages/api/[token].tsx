import { ethers } from 'ethers'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function TokenAPI(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.query
  const buf = Buffer.from(
    ethers.utils.hexZeroPad(ethers.BigNumber.from(token).toHexString(), 32).replace(/^0x/, ''),
    'hex',
  )
  const url = `${
    process.env.NODE_ENV === 'production' ? 'https://eap.wtf' : 'http://localhost:3000'
  }/plot/0x${buf.toString('hex')}`

  res.json({
    name: `${buf.toString('base64')}`,
    description: `\`\`\`\n${chunk(buf.toString('hex').toUpperCase().split(''), 16)
      .map((c16) => c16.join(''))
      .join('\n')}\n\`\`\``,
    image: url,
    external_url: url,
    background_color: '000000',
  })
}

function chunk<T>(input: T[], size: number): T[][] {
  return input.reduce((arr, item, idx) => {
    return idx % size === 0 ? [...arr, [item]] : [...arr.slice(0, -1), [...arr.slice(-1)[0], item]]
  }, [] as T[][])
}
