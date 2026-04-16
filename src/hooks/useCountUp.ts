import { useState, useEffect, useRef } from 'react'

/**
 * Animates a number from 0 to `target` over `duration` ms using ease-out.
 * Only starts when `enabled` becomes true (driven by useInView).
 */
export function useCountUp(target: number, duration: number, enabled: boolean): number {
  const [value, setValue] = useState(0)
  const rafRef = useRef<number>(0)
  const startRef = useRef<number | null>(null)

  useEffect(() => {
    if (!enabled) return

    // Reset
    startRef.current = null
    setValue(0)

    // Slow start → accelerate → ease out landing. t^2 ramp then decelerate.
    const easeOut = (t: number) => t < 0.5
      ? 2 * t * t                          // accelerate first half
      : 1 - Math.pow(-2 * t + 2, 3) / 2   // cubic ease-out second half

    const tick = (timestamp: number) => {
      if (startRef.current === null) startRef.current = timestamp
      const elapsed = timestamp - startRef.current
      const progress = Math.min(elapsed / duration, 1)
      setValue(Math.round(easeOut(progress) * target))

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [enabled, target, duration])

  return value
}
