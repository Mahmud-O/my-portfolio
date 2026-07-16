import { useEffect } from 'react'
import { motion } from 'framer-motion'

interface PreloaderProps {
  onComplete: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'

    // Wait for the water fill animation (1.6s) + a small pause
    const timer = setTimeout(() => {
      onComplete()
    }, 2200)

    return () => {
      clearTimeout(timer)
      document.body.style.overflow = ''
    }
  }, [onComplete])

  return (
    <motion.div
      key="preloader"
      initial={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 w-full h-screen bg-[#0d0d0d] z-99999 flex flex-col items-center justify-center font-sans select-none overflow-hidden"
    >
      {/* Cyberpunk grid background pattern */}
      <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none" />

      {/* Logo Container */}
      <motion.div
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter"
      >
        {/* Background text (empty state) */}
        <div className="text-red-950/20">
          Mahmoud Osama<span className="text-red-950/20">.</span>
        </div>

        {/* Foreground text (water fill state) */}
        <motion.div
          className="absolute top-0 left-0 text-white overflow-hidden whitespace-nowrap"
          initial={{ clipPath: 'inset(100% 0 0 0)' }}
          animate={{ clipPath: 'inset(0% 0 0 0)' }}
          transition={{ duration: 1.6, ease: "easeInOut", delay: 0.2 }}
        >
          Mahmoud Osama<span className="text-[#dc2626]">.</span>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
