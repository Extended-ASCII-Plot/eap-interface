// import { Canvas, loadImage } from 'skia-canvas'
// import { FONT_MAP_SIZE, FONT_WIDTH, FONT_HEIGHT } from '../utils/constants'

async function getAscii(): Promise<BigUint64Array> {
  // const canvas = new Canvas(FONT_WIDTH * FONT_MAP_SIZE, FONT_HEIGHT * FONT_MAP_SIZE)
  // const ctx = canvas.getContext('2d')
  // const image = await loadImage('public/kitchen-sink.png')
  // ctx.drawImage(image, 0, 0)
  const array: bigint[] = []
  // for (let y = 0; y < FONT_MAP_SIZE; y += 1) {
  //   for (let x = 0; x < FONT_MAP_SIZE; x += 1) {
  //     const { data } = ctx.getImageData(x * FONT_WIDTH, y * FONT_HEIGHT, FONT_WIDTH, FONT_HEIGHT)
  //     let n = 0n
  //     for (let i = 0; i < data.length; i += 4) {
  //       if (data[i]) {
  //         const index = i >> 2
  //         n |=
  //           1n <<
  //           (BigInt(
  //             (FONT_WIDTH - (index % FONT_WIDTH) - 1) * FONT_HEIGHT +
  //               FONT_WIDTH -
  //               Math.floor(index / FONT_WIDTH) +
  //               1,
  //           ) +
  //             1n)
  //       }
  //     }
  //     array.push((n << 0xfn) | 0xffffn)
  //   }
  // }
  return new BigUint64Array(array)
}

getAscii()

export {}
