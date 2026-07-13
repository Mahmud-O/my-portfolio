import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface PreloaderProps {
  onComplete: () => void
}

const LOG_MESSAGES = [
  { time: 0.00, text: "[0.00s] INITIALIZING INTERACTIVE SYSTEM... OK" },
  { time: 0.45, text: "[0.45s] LOADING ASSETS & ANIMATIONS... OK" },
  { time: 1.10, text: "[1.10s] RENDERING INTERACTIVE CANVASES... OK" },
  { time: 1.75, text: "[1.75s] SECURING COMPUTE GATEWAY... OK" },
  { time: 2.20, text: "[2.20s] DECRYPTING CORE INTERFACES... OK" },
  { time: 2.40, text: "[2.40s] SYSTEM BOOT SUCCESSFUL." }
]

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    const duration = 2200 // 2.2 seconds simulated load
    const startTime = performance.now()
    let frameId: number

    const tick = (now: number) => {
      const elapsed = now - startTime
      const currentProgress = Math.min((elapsed / duration) * 100, 100)

      setProgress(currentProgress)

      if (currentProgress < 100) {
        frameId = requestAnimationFrame(tick)
      }
    }

    frameId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frameId)
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        onComplete()
      }, 400) // Delay to let user see boot success
      return () => clearTimeout(timer)
    }
  }, [progress, onComplete])

  const simulatedTime = (progress / 100) * 2.4

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className="fixed inset-0 bg-black z-99999 flex flex-col items-center justify-center font-mono select-none overflow-hidden"
    >
      {/* Scanline CRT simulation overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(239,68,68,0.04),rgba(34,197,94,0.02),rgba(59,130,246,0.04))] bg-[size:100%_4px,6px_100%] opacity-50 z-10" />

      {/* Cyberpunk grid background pattern */}
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />

      <div className="relative z-20 flex flex-col items-center max-w-md w-full px-6">
        {/* Pulsing Status Header */}
        <div className="text-red-500/80 text-[10px] sm:text-xs tracking-[0.3em] font-mono mb-4 uppercase animate-pulse">
          SYS // BOOT_SEQUENCE
        </div>

        {/* Digital progress readout */}
        <div className="text-red-500 font-bold text-4xl sm:text-5xl md:text-6xl font-mono tracking-widest mb-8 filter drop-shadow-[0_0_12px_rgba(239,68,68,0.75)]">
          [ {Math.floor(progress).toString().padStart(3, '0')}% ]
        </div>

        {/* Horizontal load line */}
        <div className="w-64 sm:w-80 h-0.5 bg-red-950/30 relative overflow-hidden mb-8 rounded-full border border-red-500/10">
          <div
            className="absolute left-0 top-0 h-full bg-red-500 shadow-[0_0_8px_#ef4444]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress Terminal Log */}
        <div className="w-72 sm:w-96 h-32 flex flex-col justify-start text-[10px] sm:text-xs text-left font-mono space-y-1.5 overflow-hidden">
          {LOG_MESSAGES.map((msg, index) => {
            const isActive = msg.time <= simulatedTime
            const isSuccess = msg.text.includes("BOOT SUCCESSFUL")

            if (!isActive) return null

            return (
              <div
                key={index}
                className={`font-mono transition-all duration-300 ${
                  isSuccess
                    ? 'text-green-400 font-semibold drop-shadow-[0_0_6px_rgba(74,222,128,0.5)]'
                    : 'text-red-500/80'
                }`}
              >
                {msg.text}
              </div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
