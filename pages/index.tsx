import { useState } from 'react'
import Box from '../components/box'
import Layers from '../components/layers'
import Text from '../components/text'
import Border from '../components/border'
import { ascii, colorize } from '../utils/encoding'
import Textarea from '../components/textarea'

export default function IndexPage() {
  const [text, setText] = useState('')

  return (
    <Layers
      layers={[
        ({ width, height }) => (
          <Border
            width={width}
            height={height}
            value={[
              [
                colorize(ascii[0x8b], 0xffddn),
                colorize(ascii[0x96], 0xffddn),
                colorize(ascii[0x8c], 0xffddn),
              ],
              [
                colorize(ascii[0x86], 0xffddn),
                colorize(ascii[0x80], 0x333fn),
                colorize(ascii[0x86], 0xffddn),
              ],
              [
                colorize(ascii[0x9b], 0xffddn),
                colorize(ascii[0x96], 0xffddn),
                colorize(ascii[0x9c], 0xffddn),
              ],
            ]}
          >
            <Box width={width - 2} height={height - 2}>
              <Text value={`${width}x${height}`} color={0x0ff9n} />
              <Border
                width={10}
                height={10}
                value={[
                  [ascii[0x89], ascii[0xab], ascii[0x8a]],
                  [ascii[0xbb], ascii[0x20], ascii[0xac]],
                  [ascii[0x99], ascii[0xbc], ascii[0x9a]],
                ]}
                color={0xffddn}
              >
                <Textarea value={text} onChange={setText} width={8} height={8} />
              </Border>
              <Border width={30} height={20} />
            </Box>
          </Border>
        ),
      ]}
    />
  )
}
