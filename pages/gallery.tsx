import { css } from '@emotion/css'
import { useCallback } from 'react'
import useSWR from 'swr'
import Link from 'next/link'
import { FixedSizeGrid, GridChildComponentProps } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import Text from '../components/text'
import Token from '../components/token'
import { FONT_HEIGHT, FONT_SCALE_FACTOR, FONT_WIDTH } from '../utils/constants'
import { useContract } from '../contexts/contract-context'

const COLUMNS = 6

const TOKEN_SIZE = 6

export default function GalleryPage() {
  const contract = useContract()
  const { data: totalSupply } = useSWR(['totalSupply', contract.address], () =>
    contract.totalSupply(),
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
  const renderGrid = useCallback(
    ({ height }) =>
      totalSupply ? (
        <FixedSizeGrid
          columnCount={COLUMNS}
          columnWidth={TOKEN_SIZE * FONT_WIDTH * FONT_SCALE_FACTOR}
          height={height}
          rowCount={Math.ceil(totalSupply.toNumber() / COLUMNS)}
          rowHeight={TOKEN_SIZE * FONT_HEIGHT * FONT_SCALE_FACTOR}
          width={COLUMNS * TOKEN_SIZE * FONT_WIDTH * FONT_SCALE_FACTOR}
          itemData={{ totalSupply: totalSupply.toNumber() }}
        >
          {Cell}
        </FixedSizeGrid>
      ) : null,
    [totalSupply, Cell],
  )

  return (
    <div
      className={css`
        margin: 0 auto;
        width: ${(COLUMNS * TOKEN_SIZE + 2) * FONT_WIDTH * FONT_SCALE_FACTOR}px;
        height: calc(100vh - env(safe-area-inset-top, 0) - env(safe-area-inset-bottom, 0));
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
          <Text>Gallery</Text>
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
            {renderGrid}
          </AutoSizer>
        </div>
      ) : null}
    </div>
  )
}
