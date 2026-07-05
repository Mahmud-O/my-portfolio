import { useEffect, useState } from 'react'
import { FaBars, FaXmark, FaGithub } from 'react-icons/fa6'
import Logo from './Logo'

const navLinks = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#services', label: 'Services' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 }
    )

    const sections = document.querySelectorAll('section[id]')
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [activeSection])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center px-6 transition-all duration-500 ${
          scrolled ? 'pt-3' : 'pt-5'
        } ${mounted ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'}`}
      >
        <nav
          className={`flex items-center justify-between gap-4 sm:gap-8 px-4 sm:px-5 h-14 sm:h-16 lg:h-16 rounded-2xl transition-all duration-500 w-full max-w-3xl xl:max-w-4xl 3xl:max-w-5xl ${
            scrolled ? 'glass-strong shadow-2xl' : 'glass'
          }`}
        >
          <a href="#hero" className="shrink-0 hover:opacity-80 transition-opacity">
            <Logo size={40} />
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = activeSection === link.href.replace('#', '')
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    active ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {active && (
                    <span
                      className="absolute inset-0 rounded-lg"
style={{
            background: 'linear-gradient(135deg, rgba(200,53,58,0.2), rgba(158,42,47,0.12))',
            border: '1px solid rgba(200,53,58,0.3)',
          }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              )
            })}
          </div>

          <div className="hidden md:flex items-center gap-3 shrink-0">
            <a
              href="https://github.com/Mahmud-O"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
              aria-label="GitHub"
            >
              <FaGithub size={18} />
            </a>
            <a
              href="/Mahmoud_Osama_Full_Stack.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary py-2! px-4!  text-sm!"
            >
              Resume
            </a>
          </div>

          <button
            className="md:hidden p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FaXmark size={20} /> : <FaBars size={20} />}
          </button>
        </nav>
      </header>

      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed top-24 left-4 right-4 z-50 glass-strong rounded-2xl p-4 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const active = activeSection === link.href.replace('#', '')
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      active
                        ? 'bg-slate-500/20 text-white border border-slate-500/30'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </a>
                )
              })}
              <div className="pt-2 mt-1 border-t border-white/10 flex gap-3">
                <a
                  href="https://github.com/Mahmud-O"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 btn-secondary py-2.5! text-sm! justify-center"
                >
                  <FaGithub size={16} />
                  GitHub
                </a>
                <a
                  href="/Mahmoud_Osama_Full_Stack.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 btn-primary py-2.5! text-sm! justify-center"
                >
                  Resume
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Navbar

