import type { NextApiRequest, NextApiResponse } from 'next'
import { FEE_RECIPIENT } from '../../utils/constants'

export default async function IndexAPI(_req: NextApiRequest, res: NextApiResponse) {
  res.json({
    name: 'Extended ASCII Plot',
    description: 'Extended ASCII Plot (EAP) is user created ASCII Art',
    image: 'https://eap.wtf/static/icons/icon-512x512.svg',
    external_link: 'https://eap.wtf',
    seller_fee_basis_points: 100,
    fee_recipient: FEE_RECIPIENT,
  })
}
