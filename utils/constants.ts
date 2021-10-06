export const FONT_HEIGHT = 8

export const FONT_WIDTH = 6

export const FONT_SCALE_FACTOR = 2

export const FONT_MAP_SIZE = 16

export const MASK = [
  [
    0x800000000000n,
    0x008000000000n,
    0x000080000000n,
    0x000000800000n,
    0x000000008000n,
    0x000000000080n,
  ],
  [
    0x400000000000n,
    0x004000000000n,
    0x000040000000n,
    0x000000400000n,
    0x000000004000n,
    0x000000000040n,
  ],
  [
    0x200000000000n,
    0x002000000000n,
    0x000020000000n,
    0x000000200000n,
    0x000000002000n,
    0x000000000020n,
  ],
  [
    0x100000000000n,
    0x001000000000n,
    0x000010000000n,
    0x000000100000n,
    0x000000001000n,
    0x000000000010n,
  ],
  [
    0x080000000000n,
    0x000800000000n,
    0x000008000000n,
    0x000000080000n,
    0x000000000800n,
    0x000000000008n,
  ],
  [
    0x040000000000n,
    0x000400000000n,
    0x000004000000n,
    0x000000040000n,
    0x000000000400n,
    0x000000000004n,
  ],
  [
    0x020000000000n,
    0x000200000000n,
    0x000002000000n,
    0x000000020000n,
    0x000000000200n,
    0x000000000002n,
  ],
  [
    0x010000000000n,
    0x000100000000n,
    0x000001000000n,
    0x000000010000n,
    0x000000000100n,
    0x000000000001n,
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

export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS

export const CHAIN_ID = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || '1', 10)

export const FEE_RECIPIENT = process.env.FEE_RECIPIENT

export const ASCII = BigUint64Array.from([
  0xffffffffffffn,
  0x3c5672563c00n,
  0x3c5a76523c00n,
  0x387c3e7c3800n,
  0x183c7e3c1800n,
  0x186a7e6a1800n,
  0x183a7e3a1800n,
  0x00183c3c1800n,
  0x001824241800n,
  0x000018180000n,
  0x3e2222223e00n,
  0x3e222a223e00n,
  0x3e2a242a1600n,
  0x060efc806000n,
  0x037f50a6fe00n,
  0x545454545400n,
  0x7f3e3e1c1c08n,
  0x081c1c3e3e7fn,
  0x7e524a527e00n,
  0x1e3e26263c00n,
  0x7ec3b7b7c37en,
  0x7e83ababd77en,
  0x7e93efef937en,
  0x7e8bebeb877en,
  0x10307e301000n,
  0x080c7e0c0800n,
  0x08083e1c0800n,
  0x081c3e080800n,
  0x1c2222221c00n,
  0x1c222a221c00n,
  0xe0fcfffce000n,
  0x073fff3f0700n,
  0x000000000000n,
  0x0000fa000000n,
  0x00e00000e000n,
  0x28fe28fe2800n,
  0x2454fe544800n,
  0x420c10608200n,
  0x6c928a440a00n,
  0x0000a0c00000n,
  0x007c82820000n,
  0x0082827c0000n,
  0xa870f870a800n,
  0x10107c101000n,
  0x000005060000n,
  0x101010101000n,
  0x000002000000n,
  0x020c10608000n,
  0x7c8292827c00n,
  0x0282fe020200n,
  0x42868a926200n,
  0x848292b2cc00n,
  0x0c1424449e00n,
  0xe4a2a2a29c00n,
  0x7ca2a2a21c00n,
  0xc0808698e000n,
  0x6c9292926c00n,
  0x708a8a8a7c00n,
  0x000024000000n,
  0x000526000000n,
  0x001028448200n,
  0x242424242400n,
  0x008244281000n,
  0x40808a906000n,
  0x7c82b2b27000n,
  0x3e4888483e00n,
  0xfe9292926c00n,
  0x7c8282824400n,
  0xfe8282827c00n,
  0xfe9292928200n,
  0xfe9090908000n,
  0x7c8292925c00n,
  0xfe101010fe00n,
  0x8282fe828200n,
  0x0c028282fc00n,
  0xfe101028c600n,
  0xfe0202020200n,
  0xfe402040fe00n,
  0xfe60100cfe00n,
  0x7c8282827c00n,
  0xfe9090906000n,
  0x7c8282847a00n,
  0xfe9090906e00n,
  0x649292924c00n,
  0x8080fe808000n,
  0xfc020202fc00n,
  0xe0180618e000n,
  0xfc02fc02fc00n,
  0xc6281028c600n,
  0xe0100e10e000n,
  0x868a92a2c200n,
  0xfe8282000000n,
  0x8060100c0200n,
  0x8282fe000000n,
  0x204080402000n,
  0x020202020200n,
  0x0000c0a00000n,
  0x042a2a2c1e00n,
  0xfe1422221c00n,
  0x1c2222221400n,
  0x1c222214fe00n,
  0x1c2a2a2a1800n,
  0x207ea0a0a000n,
  0x182525153e00n,
  0xfe1020201e00n,
  0x0222be020200n,
  0x02012121be00n,
  0xfe1010282600n,
  0x8080fc020200n,
  0x3e201c201e00n,
  0x3e1020201e00n,
  0x1c2222221c00n,
  0x3f1422221c00n,
  0x1c2222143f00n,
  0x3e1020201000n,
  0x122a2a2a2400n,
  0x207c22222200n,
  0x3c0202023c00n,
  0x300c020c3000n,
  0x3c023c023c00n,
  0x221408142200n,
  0x380505053e00n,
  0x22262a322200n,
  0x10ee82820000n,
  0x0000ee000000n,
  0x8282ee100000n,
  0x204020400000n,
  0x8166180c32c1n,
  0x002200008800n,
  0x228822882288n,
  0x55aa55aa55aan,
  0xf000f000f000n,
  0x020408102040n,
  0x402010080402n,
  0x0000ff000000n,
  0x10101f101010n,
  0x1010ff000000n,
  0x00001f101010n,
  0x10101f000000n,
  0x000007081010n,
  0x100807000000n,
  0x1010ff101010n,
  0x071f3f7fffffn,
  0xffff7f3f1f07n,
  0x050a050a050an,
  0x55aa55000000n,
  0x002a542a5400n,
  0xff00ff00ff00n,
  0x03070f1f3f7fn,
  0x7f3f1f0f0703n,
  0x101010101010n,
  0x0000ff101010n,
  0x1010f0101010n,
  0x0000f0101010n,
  0x1010f0000000n,
  0x0000c0201010n,
  0x1020c0000000n,
  0x000055000000n,
  0xe0f8fcfeffffn,
  0xfffffefcf8e0n,
  0x000000aa55aan,
  0x50a050a050a0n,
  0xaaaaaaaaaaaan,
  0x0f000f000f00n,
  0x0000000f0f0fn,
  0x0f0f0f000000n,
  0x030303030303n,
  0x070707070707n,
  0x0f0f0f0f0f0fn,
  0x1f1f1f1f1f1fn,
  0x3f3f3f3f3f3fn,
  0x000000101010n,
  0x00000f000000n,
  0x100010001000n,
  0x00000001070fn,
  0x0f0701000000n,
  0x55aa55a050a0n,
  0x50a050aa55aan,
  0x0000000a050an,
  0x050a05000000n,
  0x000000f0f0f0n,
  0xf0f0f0000000n,
  0x0f0f0ff0f0f0n,
  0xffff00000000n,
  0xffffff000000n,
  0xffffffff0000n,
  0x3e525a523e00n,
  0x0000f0000000n,
  0x101010000000n,
  0x1c3b763b1c00n,
  0x00000080e0f0n,
  0xf0e080000000n,
  0x55aa550a050an,
  0x050a05aa55aan,
  0x000000a050a0n,
  0x50a050000000n,
  0x1a0c162a3000n,
  0x222428100e00n,
  0x021428243800n,
  0x06030f010600n,
  0xf8783c1a0800n,
  0x18fc3e3e1c00n,
  0x667a727a6600n,
  0x665a4e5a6600n,
  0x665e4e5e6600n,
  0x78484e487800n,
  0x5428fe285400n,
  0x821028108200n,
  0x2e3f3f3f2e00n,
  0x062f1f0f0600n,
  0x0a050a50a050n,
  0xa050a0050a05n,
  0x00300003c000n,
  0x600006003000n,
  0x0c3cff7c1c00n,
  0x1e3f3f3f1e00n,
  0x000103070300n,
  0x183c7f7c3800n,
  0x1c3e3f1e1c00n,
  0x387c3e443800n,
  0x384422443800n,
  0xff8080808080n,
  0x808080808080n,
  0x8080808080ffn,
  0x182c3c183c00n,
  0x3c183c2c1800n,
  0x262f7f572600n,
  0x26577f2f2600n,
  0x182c3c2c1800n,
  0x386c786c3800n,
  0x0107070d0300n,
  0x551155445555n,
  0x263cf83c2600n,
  0x001438140000n,
  0x046b7c6b0400n,
  0x12d4f8d41200n,
  0x106b7c6b1000n,
  0xff0000000000n,
  0xff81818181ffn,
  0x0000000000ffn,
  0x1c3e7e7e3c00n,
  0x24767e3e1c00n,
  0x1c3e7e762400n,
  0x3e6c7e6c3e00n,
  0x742878287400n,
  0xf058f058f000n,
  0x3c5a765a3c00n,
  0x3c5272523c00n,
  0x1f353c351f00n,
  0x396f786f3900n,
  0x1f204040201fn,
  0x1f3f7f7f371fn,
  0x182418101800n,
  0xff0101010101n,
  0x010101010101n,
  0x0101010101ffn,
])
