import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

interface TextRotateProps {
  texts: string[]
  interval?: number
  className?: string
}

export default function TextRotate({ texts, interval = 2200, className = '' }: TextRotateProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(i => (i + 1) % texts.length)
    }, interval)
    return () => clearInterval(timer)
  }, [texts, interval])

  return (
    <span
      className={className}
      style={{
        display: 'inline-block',
        position: 'relative',
        overflow: 'hidden',
        verticalAlign: 'bottom',
        minWidth: '3ch',
      }}
    >
      {/* invisible spacer keeps width of longest word */}
      <span style={{ visibility: 'hidden', display: 'inline-block' }}>
        {texts.reduce((a, b) => (a.length > b.length ? a : b))}
      </span>

      <AnimatePresence mode="wait">
        <motion.span
          key={texts[index]}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-110%', opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 360, mass: 0.8 }}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            textAlign: 'center',
            display: 'inline-block',
          }}
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
