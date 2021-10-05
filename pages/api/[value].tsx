import type { NextApiRequest, NextApiResponse } from 'next'

export default async function ValueAPI(req: NextApiRequest, res: NextApiResponse) {
  res.json({
    name: `${req.query.value}`,
    description: `${req.query.value}`,
    image: `http://localhost:3000/${req.query.value}`,
  })
}
