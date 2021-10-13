import invariant from 'tiny-invariant'

export const FONT_HEIGHT = 8

export const FONT_WIDTH = 8

export const FONT_SCALE_FACTOR = typeof window === 'undefined' ? 2 : window.devicePixelRatio

export const FONT_MAP_SIZE = 16

export const MASK = [
  [
    0x8000000000000000n,
    0x0080000000000000n,
    0x0000800000000000n,
    0x0000008000000000n,
    0x0000000080000000n,
    0x0000000000800000n,
    0x0000000000008000n,
    0x0000000000000080n,
  ],
  [
    0x4000000000000000n,
    0x0040000000000000n,
    0x0000400000000000n,
    0x0000004000000000n,
    0x0000000040000000n,
    0x0000000000400000n,
    0x0000000000004000n,
    0x0000000000000040n,
  ],
  [
    0x2000000000000000n,
    0x0020000000000000n,
    0x0000200000000000n,
    0x0000002000000000n,
    0x0000000020000000n,
    0x0000000000200000n,
    0x0000000000002000n,
    0x0000000000000020n,
  ],
  [
    0x1000000000000000n,
    0x0010000000000000n,
    0x0000100000000000n,
    0x0000001000000000n,
    0x0000000010000000n,
    0x0000000000100000n,
    0x0000000000001000n,
    0x0000000000000010n,
  ],
  [
    0x0800000000000000n,
    0x0008000000000000n,
    0x0000080000000000n,
    0x0000000800000000n,
    0x0000000008000000n,
    0x0000000000080000n,
    0x0000000000000800n,
    0x0000000000000008n,
  ],
  [
    0x0400000000000000n,
    0x0004000000000000n,
    0x0000040000000000n,
    0x0000000400000000n,
    0x0000000004000000n,
    0x0000000000040000n,
    0x0000000000000400n,
    0x0000000000000004n,
  ],
  [
    0x0200000000000000n,
    0x0002000000000000n,
    0x0000020000000000n,
    0x0000000200000000n,
    0x0000000002000000n,
    0x0000000000020000n,
    0x0000000000000200n,
    0x0000000000000002n,
  ],
  [
    0x0100000000000000n,
    0x0001000000000000n,
    0x0000010000000000n,
    0x0000000100000000n,
    0x0000000001000000n,
    0x0000000000010000n,
    0x0000000000000100n,
    0x0000000000000001n,
  ],
]

export const COLOR = [
  '#000000',
  '#1D2B53',
  '#7E2553',
  '#008751',
  '#AB5236',
  '#5F574F',
  '#C2C3C7',
  '#FFF1E8',
  '#FF004D',
  '#FFA300',
  '#FFEC27',
  '#00E436',
  '#29ADFF',
  '#83769C',
  '#FF77A8',
  '#FFCCAA',
]

invariant(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, 'env NEXT_PUBLIC_CONTRACT_ADDRESS not set')

export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS

export const CHAIN_ID = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || '1', 10)

invariant(process.env.NEXT_PUBLIC_BASE_URL, 'env NEXT_PUBLIC_BASE_URL not set')

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const JSON_RPC = process.env.NEXT_PUBLIC_JSON_RPC

export const FEE_RECIPIENT = process.env.FEE_RECIPIENT

export const ASCII = [
  0xffffffffffffffffn,
  0x7ed7dbfbfbdbd77en,
  0x7edbd7f7f7d7db7en,
  0x70f8fc7efcf87000n,
  0x10387cfe7c381000n,
  0x3838fafefa383800n,
  0x18387afe7a381800n,
  0x3c7effffffff7e3cn,
  0x3c66c38181c3663cn,
  0x007e7e7e7e7e7e00n,
  0x007e424242427e00n,
  0x0e1f1111bfeec0e0n,
  0x0072fa8f8ffa7200n,
  0x00040e0efc402000n,
  0x040efca0a4aefc00n,
  0x995a24c3c3245a99n,

  0xffff7e7e3c3c1818n,
  0x18183c3c7e7effffn,
  0x00000000aaaaaaaan,
  0xaaaaaaaa00000000n,
  0x7effdbe7e7dbff7en,
  0x7cffe7dbdbe7ff7en,
  0x7effc3dbdbc3ff7en,
  0x7ef3ebdbdbebf37en,
  0x102040fe40201000n,
  0x100804fe04081000n,
  0x1010109254381000n,
  0x1038549210101000n,
  0x3333cccc3333ccccn,
  0x10386cc66c381000n,
  0x030f3fffff3f0f03n,
  0xc0f0fcfffffcf0c0n,

  0x0000000000000000n,
  0x000000fafa000000n,
  0x0000e0c000e0c000n,
  0x28fefe28fefe2800n,
  0x207454fe545c0800n,
  0x00666c1830664600n,
  0x0c5ef2baec5e1200n,
  0x000000e0c0000000n,
  0x0000387cc6820000n,
  0x000082c67c380000n,
  0x10547c38387c5410n,
  0x0008083e3e080800n,
  0x0000010706000000n,
  0x0000080808080000n,
  0x0000000202000000n,
  0x00060c183060c000n,

  0x007cfe92a2fe7c00n,
  0x000040fefe000000n,
  0x004ede9292f66600n,
  0x0044c69292fe6c00n,
  0x183868c8fefe0800n,
  0x00f4f69292decc00n,
  0x007cfe9292de4c00n,
  0x00c0c08e9ef0e000n,
  0x006cfe9292fe6c00n,
  0x0064f69292fe7c00n,
  0x0000001414000000n,
  0x0000011716000000n,
  0x0000081c36220000n,
  0x0014141414140000n,
  0x000022361c080000n,
  0x0040c08a9af06000n,

  0x7cfe82baaafa7000n,
  0x003e7ec8c87e3e00n,
  0x00fefe9292fe6c00n,
  0x007cfe8282c64400n,
  0x00fefe8282fe7c00n,
  0x00fefe9292828200n,
  0x00fefe9090808000n,
  0x007cfe8292de5c00n,
  0x00fefe1010fefe00n,
  0x000082fefe820000n,
  0x0004060282fefc00n,
  0x00fefe1038eec600n,
  0x00fefe0202020200n,
  0xfefe603060fefe00n,
  0x00fefe6030fefe00n,
  0x007cfe8282fe7c00n,

  0x00fefe9090f06000n,
  0x007cfe8286ff7d00n,
  0x00fefe9090fe6e00n,
  0x0064f69292de4c00n,
  0x008080fefe808000n,
  0x00fcfe0202fefc00n,
  0x00f8fc0606fcf800n,
  0xfcfe061c06fefc00n,
  0x00c6ee3838eec600n,
  0x00e0f01e1ef0e000n,
  0x00868e9ab2e2c200n,
  0x0000fefe82820000n,
  0x00c06030180c0600n,
  0x00008282fefe0000n,
  0x002060c0c0602000n,
  0x0202020202020202n,

  0x0000c0e020000000n,
  0x00042e2a2a3e1e00n,
  0x00fefe22223e1c00n,
  0x001c3e2222361400n,
  0x001c3e2222fefe00n,
  0x001c3e2a2a3a1800n,
  0x107efe9090c04000n,
  0x00183d25253f3e00n,
  0x00fefe20203e1e00n,
  0x000000bcbe020000n,
  0x000121bfbe000000n,
  0x00fefe081c362200n,
  0x000000fcfe020000n,
  0x3e3e301e303e1e00n,
  0x003e3e20203e1e00n,
  0x001c3e22223e1c00n,

  0x003f3f24243c1800n,
  0x00183c24243f3f00n,
  0x003e3e2020301000n,
  0x00103a2a2a2e0400n,
  0x0020fcfe22220000n,
  0x003c3e02023e3e00n,
  0x00383c06063c3800n,
  0x3c3e020c023e3c00n,
  0x0022361c1c362200n,
  0x00383d05053f3e00n,
  0x0022262e3a322200n,
  0x0000107cee820000n,
  0x000000e7e7000000n,
  0x000082ee7c100000n,
  0x00040c080c040c00n,
  0x0012362436123600n,

  0x0000220000880000n,
  0x2288228822882288n,
  0x55aa55aa55aa55aan,
  0xf000f000f000f000n,
  0x0102040810204080n,
  0x8040201008040201n,
  0x000000ffff000000n,
  0x1818181f1f181818n,
  0x181818ffff000000n,
  0x0000001f1f181818n,
  0x1818181f1f000000n,
  0x000000070f1c1818n,
  0x18181c0f07000000n,
  0x181818ffff181818n,
  0x03070e1c3870e0c0n,
  0xc0e070381c0e0703n,

  0x050a050a050a050an,
  0x55aa55aa00000000n,
  0x002a542a542a5400n,
  0xff00ff00ff00ff00n,
  0x0103070f1f3f7fffn,
  0xff7f3f1f0f070301n,
  0x1818181818181818n,
  0x000000ffff181818n,
  0x181818f8f8181818n,
  0x000000f8f8181818n,
  0x181818f8f8000000n,
  0x000000e0f0381818n,
  0x181838f0e0000000n,
  0x000000aaaa000000n,
  0x663399cc663399ccn,
  0xcc993366cc993366n,

  0x0000000055aa55aan,
  0x50a050a050a050a0n,
  0xaaaaaaaaaaaaaaaan,
  0x0f000f000f000f00n,
  0x000000000f0f0f0fn,
  0x0f0f0f0f00000000n,
  0x0303030303030303n,
  0x0707070707070707n,
  0x0f0f0f0f0f0f0f0fn,
  0x1f1f1f1f1f1f1f1fn,
  0x3f3f3f3f3f3f3f3fn,
  0x0000001818181818n,
  0x0000001f1f000000n,
  0x1800180018001800n,
  0x000001070f1f1f3fn,
  0x3f1f1f0f07010000n,

  0x55aa55aa50a050a0n,
  0x50a050a055aa55aan,
  0x00000000050a050an,
  0x050a050a00000000n,
  0x00000000f0f0f0f0n,
  0xf0f0f0f000000000n,
  0x0f0f0f0ff0f0f0f0n,
  0xffffff0000000000n,
  0xffffffff00000000n,
  0xffffffffff000000n,
  0x3e525a5a527e523en,
  0x000000f8f8000000n,
  0x1818181818000000n,
  0x00207ffdef7f2000n,
  0x000080e0f0f8f8fcn,
  0xfcf8f8f0e0800000n,

  0x55aa55aa050a050an,
  0x050a050a55aa55aan,
  0x0000000050a050a0n,
  0x50a050a000000000n,
  0x0d060b1538300000n,
  0xff894a3c08080000n,
  0x141c080808080800n,
  0x0102241858041000n,
  0x1024282a2a282410n,
  0x0042240000244200n,
  0x0000240000240000n,
  0x0000001818000000n,
  0x1440018001800228n,
  0x0462910220492610n,
  0x105428fe28541000n,
  0x8200102810008200n,

  0x00005c7e7e5c0000n,
  0x0000061faf46a000n,
  0x050a050a50a050a0n,
  0x50a050a0050a050an,
  0x1111121412214121n,
  0x1091221145448844n,
  0x00166dffff5b2c00n,
  0x003c7e7e7e7e3c00n,
  0x387c7c3c1c3c1800n,
  0x1e3f7f6f6f371f06n,
  0x031f274fcf770f07n,
  0x304844227c783000n,
  0x3048442244483000n,
  0xffffc0c0c0c0c0c0n,
  0xc0c0c0c0c0c0c0c0n,
  0xc0c0c0c0c0c0ffffn,

  0x183e6bd6ebc3763cn,
  0x0f063ef3f33e060fn,
  0x0070d82e5c30fc30n,
  0x170e1b3e3e1b0e17n,
  0x1f0e0f1eef3eef18n,
  0x30cf0e0eff6eff68n,
  0x0f1c1f1c7ffcff40n,
  0x5151444551151554n,
  0x13261c3860701e0bn,
  0x20263cf83c262000n,
  0x1112d4f8d4121100n,
  0x2010d7f8d7102000n,
  0x0810d7f8d4122100n,
  0xffff000000000000n,
  0xffffc3c3c3c3ffffn,
  0x000000000000ffffn,

  0x387cfeeeee6c2800n,
  0x387cfeeec6440000n,
  0x3e4cdefcce5c3e00n,
  0x3e5cd6f4d65c3e00n,
  0x10186c3c6e1c1810n,
  0x00f058f058f00000n,
  0x01037eff7e030100n,
  0x6060e2f7fde86060n,
  0x0086192367510e00n,
  0x000c566666560c00n,
  0x0c0a09f999690a0fn,
  0x3f7fc1ffffc17f3fn,
  0x1824241810181000n,
  0xffff030303030303n,
  0x0303030303030303n,
  0x030303030303ffffn,
]

export const DESCRIPTION =
  'Extended ASCII Plot (EAP) is user created ASCII Art and stored on chain. Everyone can mint via https://eap.wtf/ for free.'
