import { ethers } from 'ethers'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function TokenAPI(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.query
  const buf = Buffer.from(
    ethers.utils.hexZeroPad(ethers.BigNumber.from(token).toHexString(), 32).replace(/^0x/, ''),
    'hex',
  )

  res.json({
    name: `${buf.toString('base64')}`,
    description: `0x${buf.toString('hex')}`,
    image: process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/0x${buf.toString('hex')}`
      : `http://localhost:3000/0x${buf.toString('hex')}`,
  })
}
