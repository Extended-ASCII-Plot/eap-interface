import type { NextApiRequest, NextApiResponse } from 'next'
import { BASE_URL, FEE_RECIPIENT } from '../../utils/constants'

export default async function IndexAPI(_req: NextApiRequest, res: NextApiResponse) {
  res.json({
    name: 'Extended ASCII Plot',
    description: 'Extended ASCII Plot (EAP) is user created ASCII Art',
    image: `${BASE_URL}static/icons/icon-512x512.svg`,
    external_link: BASE_URL,
    seller_fee_basis_points: 100,
    fee_recipient: FEE_RECIPIENT,
  })
}
