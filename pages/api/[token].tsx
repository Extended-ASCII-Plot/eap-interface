import { ethers } from 'ethers'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ExtendedAsciiPlotPolygon__factory } from '../../abi'
import { differentCharacters, differentColors } from '../../utils/attributes'
import { BASE_URL, CONTRACT_ADDRESS, JSON_RPC } from '../../utils/constants'

const provider = new ethers.providers.JsonRpcProvider(JSON_RPC)

const contract = ExtendedAsciiPlotPolygon__factory.connect(CONTRACT_ADDRESS, provider)

export default async function TokenAPI(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.query as { token: string }
  const buf = Buffer.from(
    ethers.utils.hexZeroPad(ethers.BigNumber.from(token).toHexString(), 32).replace(/^0x/, ''),
    'hex',
  )
  const index = await contract.indexByToken(ethers.BigNumber.from(token))

  res.json({
    name: `EAP #${index}`,
    description: `\`\`\`\n${chunk(buf.toString('hex').toUpperCase().split(''), 16)
      .map((c16) => c16.join(''))
      .join('\n')}\n\`\`\``,
    image: `${BASE_URL}api/png/0x${buf.toString('hex')}`,
    external_url: `${BASE_URL}plot/0x${buf.toString('hex')}`,
    background_color: '000000',
    attributes: [
      { trait_type: 'Different Colors', value: differentColors(token) },
      { trait_type: 'Different Characters', value: differentCharacters(token) },
    ],
  })
}

function chunk<T>(input: T[], size: number): T[][] {
  return input.reduce((arr, item, idx) => {
    return idx % size === 0 ? [...arr, [item]] : [...arr.slice(0, -1), [...arr.slice(-1)[0], item]]
  }, [] as T[][])
}
