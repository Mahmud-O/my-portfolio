import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiArrowUp } from 'react-icons/hi2'

export default function BackToTop() {
  const [showTopBtn, setShowTopBtn] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShowTopBtn(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <AnimatePresence>
      {showTopBtn && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-red-500/10 text-red-500 
                     border border-red-500/20 backdrop-blur-md transition-colors 
                     hover:bg-red-500/20 hover:text-white shadow-[0_0_15px_rgba(239,68,68,0.2)]"
          aria-label="Scroll to top"
        >
          <HiArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

