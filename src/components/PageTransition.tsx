import { type ReactNode } from 'react'
import { motion } from 'motion/react'

interface PageTransitionProps {
  children: ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.99 }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="w-full h-full min-h-screen"
    >
      {children}
    </motion.div>
  )
}
