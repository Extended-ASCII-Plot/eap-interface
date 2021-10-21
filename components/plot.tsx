import { css } from '@emotion/css'
import useSWR from 'swr'
import { FONT_WIDTH, FONT_HEIGHT, FONT_SCALE_FACTOR } from '../utils/constants'
import { useRender } from '../contexts/render-context'
import { renderPlot } from '../utils/svg'

const PLOT_SIZE = 4

export default function Plot(props: { value?: string; scale?: number }) {
  const width = FONT_WIDTH * FONT_SCALE_FACTOR * (props.scale || 1) * PLOT_SIZE
  const height = FONT_HEIGHT * FONT_SCALE_FACTOR * (props.scale || 1) * PLOT_SIZE
  const render = useRender()
  const { data: backgroundImage } = useSWR(
    props.value === undefined ? null : ['plot', props.value, width, height],
    () =>
      render
        ? render.renderPlot(props.value!, width, height)
        : renderPlot(props.value!, width, height),
    { revalidateOnFocus: false, revalidateIfStale: false },
  )

  return props.value ? (
    <i
      style={{ backgroundImage }}
      className={css`
        display: inline-block;
        width: ${width}px;
        height: ${height}px;
        background-repeat: no-repeat;
        background-position: 0 0;
      `}
    />
  ) : null
}
