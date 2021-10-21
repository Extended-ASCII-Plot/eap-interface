import { css } from '@emotion/css'
import { useMemo } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import svgToMiniDataURI from 'mini-svg-data-uri'
import useSWR from 'swr'
import { FONT_HEIGHT, FONT_WIDTH, FONT_SCALE_FACTOR } from '../utils/constants'
import { useRender } from '../contexts/render-context'
import { DotSvg } from './svg'

export default function Dot(props: {
  value?: number
  top?: number
  right?: number
  bottom?: number
  left?: number
}) {
  const render = useRender()
  const { data: backgroundImage } = useSWR(
    props.value === undefined ? null : ['dot', props.value],
    () =>
      render
        ? render.renderDot(props.value!)
        : `url("${svgToMiniDataURI(renderToStaticMarkup(<DotSvg value={props.value!} />))}")`,
    { revalidateOnFocus: false, revalidateIfStale: false },
  )
  const style = useMemo(
    () => ({
      top: props?.top === undefined ? undefined : props.top * FONT_SCALE_FACTOR * FONT_HEIGHT,
      right: props?.right === undefined ? undefined : props.right * FONT_SCALE_FACTOR * FONT_WIDTH,
      bottom:
        props?.bottom === undefined ? undefined : props.bottom * FONT_SCALE_FACTOR * FONT_HEIGHT,
      left: props?.left === undefined ? undefined : props.left * FONT_SCALE_FACTOR * FONT_WIDTH,
      position:
        props.top !== undefined ||
        props.right !== undefined ||
        props.bottom !== undefined ||
        props.left !== undefined
          ? ('absolute' as 'absolute')
          : undefined,
      backgroundImage,
    }),
    [props.bottom, props.left, props.right, props.top, backgroundImage],
  )

  return (
    <i
      style={style}
      className={css`
        display: inline-block;
        width: ${FONT_WIDTH * FONT_SCALE_FACTOR}px;
        height: ${FONT_HEIGHT * FONT_SCALE_FACTOR}px;
        background-repeat: no-repeat;
        background-position: 0 0;
      `}
    />
  )
}
