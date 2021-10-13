import { css } from '@emotion/css'
import React from 'react'
import useSWR from 'swr'
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

  return (
    <div
      className={css`
        margin: 0 auto;
        width: ${50 * FONT_WIDTH * FONT_SCALE_FACTOR}px;
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
          <Text>Extended ASCII Plot Gallery</Text>
        </span>
        <span>
          <Text>{totalSupply?.toString() || ''}</Text>
        </span>
      </div>
      <div>
        <Text> </Text>
      </div>
      <div
        className={css`
          display: flex;
          flex-wrap: wrap;
        `}
      >
        {totalSupply
          ? Array.from({ length: totalSupply.toNumber() }).map((_, index) => (
              <Token key={index} index={totalSupply.toNumber() - index - 1} />
            ))
          : null}
      </div>
    </div>
  )
}
