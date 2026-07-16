import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import emailjs from '@emailjs/browser'
import { FaCircleCheck, FaLinkedin, FaFacebookF, FaGithub } from 'react-icons/fa6'
import { IoLogoWhatsapp } from 'react-icons/io'

gsap.registerPlugin(ScrollTrigger)

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const sectionRef = useRef<HTMLElement>(null)
  const successRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the section when its bottom hits the bottom of the viewport
      // pinSpacing: false allows the footer to scroll over it
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'bottom bottom',
        pin: true,
        pinSpacing: false,
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (status === 'success' && successRef.current) {
      gsap.fromTo(
        successRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.4)' }
      )
    }
  }, [status])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'
      )
      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      console.error('EmailJS Error:', error)
      setStatus('error')
    }
  }

  return (
    <div id="contact" className="relative z-20 w-full mt-[-100vh] bg-black">
      <section
        ref={sectionRef}
        className="w-full bg-[#050505] rounded-t-[40px] border-t border-white/5 min-h-screen flex flex-col items-center justify-center py-32 px-4 overflow-hidden relative"
      >
        {/* Big Bold Background Font */}
        <div className="absolute inset-0 flex items-center justify-center opacity-3 pointer-events-none select-none">
          <h1 className="text-[25vw] font-black text-white  whitespace-nowrap tracking-tighter leading-none">
            CONNECT
          </h1>
        </div>

        {/* Foreground Title */}
        <h2 className="text-[12vw] md:text-[8vw] font-black text-white tracking-tighter leading-none mb-16 uppercase text-center relative z-10">
          Let's Talk
        </h2>

        {/* Circular Contact Buttons (LinkedIn, Facebook, WhatsApp, GitHub) */}
        <div className="flex flex-wrap justify-center gap-5 md:gap-10 w-full max-w-4xl relative z-10 mb-20 px-4">
          {/* WhatsApp */}
          <a
            href="https://wa.me/201016074277"
            target="_blank"
            rel="noreferrer"
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-[12vw] md:h-[12vw] max-w-[180px] max-h-[180px] rounded-full border-2 md:border-[3px] border-[#dc2626]/40 flex items-center justify-center transition-all duration-500 hover:scale-[1.08] hover:border-[#dc2626] hover:bg-[#dc2626] hover:shadow-[0_0_40px_rgba(220,38,38,0.5)] group bg-transparent text-[#dc2626] hover:text-white"
            aria-label="WhatsApp Profile"
          >
            <IoLogoWhatsapp className="w-1/2 h-1/2 transition-colors duration-500" />
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/ma252002/"
            target="_blank"
            rel="noreferrer"
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-[12vw] md:h-[12vw] max-w-[180px] max-h-[180px] rounded-full border-2 md:border-[3px] border-[#dc2626]/40 flex items-center justify-center transition-all duration-500 hover:scale-[1.08] hover:border-[#dc2626] hover:bg-[#dc2626] hover:shadow-[0_0_40px_rgba(220,38,38,0.5)] group bg-transparent text-[#dc2626] hover:text-white"
            aria-label="LinkedIn Profile"
          >
            <FaLinkedin className="w-1/2 h-1/2 transition-colors duration-500" />
          </a>

          {/* Facebook */}
          <a
            href="https://www.facebook.com/mahmoud.osama.550367"
            target="_blank"
            rel="noreferrer"
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-[12vw] md:h-[12vw] max-w-[180px] max-h-[180px] rounded-full border-2 md:border-[3px] border-[#dc2626]/40 flex items-center justify-center transition-all duration-500 hover:scale-[1.08] hover:border-[#dc2626] hover:bg-[#dc2626] hover:shadow-[0_0_40px_rgba(220,38,38,0.5)] group bg-transparent text-[#dc2626] hover:text-white"
            aria-label="Facebook Profile"
          >
            <FaFacebookF className="w-1/2 h-1/2 transition-colors duration-500" />
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/Mahmud-O"
            target="_blank"
            rel="noreferrer"
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-[12vw] md:h-[12vw] max-w-[180px] max-h-[180px] rounded-full border-2 md:border-[3px] border-[#dc2626]/40 flex items-center justify-center transition-all duration-500 hover:scale-[1.08] hover:border-[#dc2626] hover:bg-[#dc2626] hover:shadow-[0_0_40px_rgba(220,38,38,0.5)] group bg-transparent text-[#dc2626] hover:text-white"
            aria-label="GitHub Profile"
          >
            <FaGithub className="w-1/2 h-1/2 transition-colors duration-500" />
          </a>
        </div>

        {/* Contact Form */}
        <div className="w-full max-w-2xl relative z-10 px-4">
          {status === 'success' ? (
            <div
              ref={successRef}
              className="flex flex-col items-center justify-center text-center p-12 rounded-2xl border border-white/5 bg-[#111111]/80 backdrop-blur-md gap-5 shadow-2xl"
              style={{ opacity: 0 }}
            >
              <span className="text-[#dc2626] drop-shadow-[0_0_15px_rgba(220,38,38,0.4)]">
                <FaCircleCheck size={52} />
              </span>
              <h3 className="text-xl font-bold text-white">Message Sent!</h3>
              <p className="text-slate-400 text-sm max-w-xs leading-relaxed">
                Thank you for reaching out. I&apos;ll get back to you as soon as possible.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-2 bg-[#dc2626] hover:bg-[#ef4444] text-white font-bold py-3 px-8 rounded-xl transition-all text-sm uppercase tracking-wider"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col gap-1.5 flex-1">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                    className="w-full bg-bg-surface/80 border border-white/10 rounded-xl px-6 py-4 text-white placeholder-white/30 focus:outline-none focus:border-[#dc2626] focus:bg-[#151515] transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    required
                    className="w-full bg-bg-surface/80 border border-white/10 rounded-xl px-6 py-4 text-white placeholder-white/30 focus:outline-none focus:border-[#dc2626] focus:bg-[#151515] transition-all"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message..."
                  required
                  rows={4}
                  className="w-full bg-bg-surface/80 border border-white/10 rounded-xl px-6 py-4 text-white placeholder-white/30 focus:outline-none focus:border-[#dc2626] focus:bg-[#151515] transition-all resize-none"
                />
              </div>

              {status === 'error' && (
                <p className="text-[#ef4444] text-xs font-mono pl-1">
                  Something went wrong. Please check your network or try again.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="bg-[#dc2626] hover:bg-[#ef4444] text-white font-bold uppercase tracking-widest py-5 rounded-xl hover:shadow-[0_0_30px_rgba(220,38,38,0.45)] transition-all flex items-center justify-center gap-3 text-sm disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    SENDING...
                  </>
                ) : (
                  'SEND MESSAGE'
                )}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}
