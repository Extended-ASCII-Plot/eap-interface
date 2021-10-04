import { useState, useEffect, useCallback, RefObject } from 'react'
import { throttle, isEqual } from 'lodash'
import { FONT_HEIGHT, FONT_WIDTH, FONT_SCALE_FACTOR } from '../utils/constants'

export default function useSize<T extends HTMLElement>(
  ref: RefObject<T>,
  throttleMs: number = 0,
  disabled: boolean = false,
): { width: number; height: number } {
  const handleConvert = useCallback(
    ({ width, height }: { width: number; height: number }) => ({
      width: Math.floor(width / FONT_WIDTH / FONT_SCALE_FACTOR),
      height: Math.floor(height / FONT_HEIGHT / FONT_SCALE_FACTOR),
    }),
    [],
  )
  const [size, setSize] = useState(
    ref.current ? handleConvert(ref.current.getBoundingClientRect()) : { width: 0, height: 0 },
  )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleResize = useCallback(
    throttle(
      (entries: ResizeObserverEntry[]) => {
        if (entries[0]?.target === ref.current) {
          setSize((oldSize) => {
            const newSize = handleConvert(entries[0].contentRect)
            return isEqual(oldSize, newSize) ? oldSize : newSize
          })
        }
      },
      throttleMs,
      { trailing: true },
    ),
    [throttleMs],
  )
  useEffect(() => {
    const { current } = ref
    if (!current || disabled) {
      return
    }
    const observer = new ResizeObserver(handleResize)
    observer.observe(current, { box: 'border-box' })
    return () => {
      observer.unobserve(current)
    }
  }, [ref, handleResize, disabled])

  return size
}
