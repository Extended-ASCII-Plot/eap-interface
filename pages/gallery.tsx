import { css } from '@emotion/css'
import React, { useCallback } from 'react'
import useSWR from 'swr'
import Link from 'next/link'
import { FixedSizeGrid, GridChildComponentProps } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import Text from '../components/text'
import Token from '../components/token'
import useContract from '../hooks/use-contract'
import useProvider from '../hooks/use-provider'
import { FONT_HEIGHT, FONT_SCALE_FACTOR, FONT_WIDTH } from '../utils/constants'

export default function GalleryPage() {
  const provider = useProvider()
  const contract = useContract(provider)
  const { data: totalSupply } = useSWR(contract ? ['totalSupply', contract.address] : null, () =>
    contract!.totalSupply(),
  )
  const Cell = useCallback(
    ({ columnIndex, rowIndex, style, data }: GridChildComponentProps<{ totalSupply: number }>) => (
      <div style={style}>
        <Token index={data.totalSupply - (rowIndex * 8 + columnIndex) - 1} />
      </div>
    ),
    [],
  )

  return (
    <div
      className={css`
        margin: 0 auto;
        width: ${50 * FONT_WIDTH * FONT_SCALE_FACTOR}px;
        height: 100vh;
        padding: ${FONT_HEIGHT * FONT_SCALE_FACTOR}px ${FONT_WIDTH * FONT_SCALE_FACTOR}px;
      `}
    >
      <div
        className={css`
          display: flex;
          justify-content: space-between;
        `}
      >
        <span>
          <Link href="/" passHref={true}>
            <a>
              <Text>{Uint8Array.from([0x1b, 0x20])}</Text>
            </a>
          </Link>
          <Text>Extended ASCII Plot Gallery</Text>
        </span>
        <span>
          <Text>{totalSupply?.toString() || ''}</Text>
        </span>
      </div>
      <div>
        <Text> </Text>
      </div>
      {totalSupply ? (
        <div
          className={css`
            height: calc(100% - ${FONT_HEIGHT * FONT_SCALE_FACTOR * 2}px);
          `}
        >
          <AutoSizer defaultWidth={48 * FONT_WIDTH * FONT_SCALE_FACTOR} disableWidth={true}>
            {({ height }) => (
              <FixedSizeGrid
                columnCount={8}
                columnWidth={96}
                height={height}
                rowCount={Math.ceil(totalSupply.toNumber() / 8)}
                rowHeight={96}
                width={48 * FONT_WIDTH * FONT_SCALE_FACTOR}
                itemData={{ totalSupply: totalSupply.toNumber() }}
              >
                {Cell}
              </FixedSizeGrid>
            )}
          </AutoSizer>
        </div>
      ) : null}
    </div>
  )
}
