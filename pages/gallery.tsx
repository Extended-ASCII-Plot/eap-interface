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

const COLUMNS = 8

const TOKEN_SIZE = 6

export default function GalleryPage() {
  const provider = useProvider()
  const contract = useContract(provider)
  const { data: totalSupply } = useSWR(contract ? ['totalSupply', contract.address] : null, () =>
    contract!.totalSupply(),
  )
  const Cell = useCallback(
    ({ columnIndex, rowIndex, style, data }: GridChildComponentProps<{ totalSupply: number }>) =>
      rowIndex * COLUMNS + columnIndex < data.totalSupply ? (
        <div style={style}>
          <Token index={data.totalSupply - (rowIndex * COLUMNS + columnIndex) - 1} />
        </div>
      ) : null,
    [],
  )

  return (
    <div
      className={css`
        margin: 0 auto;
        width: ${(COLUMNS * TOKEN_SIZE + 2) * FONT_WIDTH * FONT_SCALE_FACTOR}px;
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
          <AutoSizer
            defaultWidth={COLUMNS * TOKEN_SIZE * FONT_WIDTH * FONT_SCALE_FACTOR}
            disableWidth={true}
          >
            {({ height }) => (
              <FixedSizeGrid
                columnCount={COLUMNS}
                columnWidth={TOKEN_SIZE * FONT_WIDTH * FONT_SCALE_FACTOR}
                height={height}
                rowCount={Math.ceil(totalSupply.toNumber() / 8)}
                rowHeight={TOKEN_SIZE * FONT_HEIGHT * FONT_SCALE_FACTOR}
                width={COLUMNS * TOKEN_SIZE * FONT_WIDTH * FONT_SCALE_FACTOR}
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
