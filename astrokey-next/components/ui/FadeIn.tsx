'use client'

import { useRef, useEffect, useState, type ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'

interface FadeInProps {
  children: ReactNode
  delay?: number
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
}

export default function FadeIn({ children, delay = 0, className, direction = 'up' }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (isInView) setHasAnimated(true)
  }, [isInView])

  const directionMap = {
    up: { y: 30 },
    down: { y: -30 },
    left: { x: 30 },
    right: { x: -30 },
    none: {},
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...directionMap[direction] }}
      animate={hasAnimated ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}
