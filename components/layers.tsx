import { css } from '@emotion/css'
import { ReactNode, useRef } from 'react'
import useSize from '../hooks/use-size'

export default function Layers(props: {
  layers: ((props: { width: number; height: number }) => ReactNode)[]
}) {
  const ref = useRef<HTMLDivElement>(null)
  const pos = useSize(ref, 1000)

  return (
    <div
      ref={ref}
      className={css`
        position: relative;
        width: 100vw;
        height: 100vh;
      `}
    >
      {props.layers.map((layer, index) => (
        <div
          key={index}
          className={css`
            position: absolute;
          `}
        >
          {layer(pos)}
        </div>
      ))}
    </div>
  )
}
