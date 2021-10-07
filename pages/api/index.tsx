import type { NextApiRequest, NextApiResponse } from 'next'
import { BASE_URL, DESCRIPTION, FEE_RECIPIENT } from '../../utils/constants'

export default async function IndexAPI(_req: NextApiRequest, res: NextApiResponse) {
  res.json({
    name: 'Extended ASCII Plot',
    description: DESCRIPTION,
    image: `${BASE_URL}static/icons/icon-512x512.png`,
    external_link: BASE_URL,
    seller_fee_basis_points: 100,
    fee_recipient: FEE_RECIPIENT,
  })
}
