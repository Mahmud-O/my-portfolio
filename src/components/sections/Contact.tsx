import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import emailjs from '@emailjs/browser'
import { FaCircleCheck, FaArrowRight } from 'react-icons/fa6'
import MagneticLink from '@/components/ui/MagneticLink'

gsap.registerPlugin(ScrollTrigger)

import { contactLinks } from '@/lib/constants'


export default function ContactSection() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' })
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const sectionRef = useRef<HTMLElement>(null)
    const leftRef = useRef<HTMLDivElement>(null)
    const rightRef = useRef<HTMLDivElement>(null)
    const successRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(leftRef.current, { opacity: 0, x: -50 }, {
                opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', delay: 0.1,
                scrollTrigger: { trigger: leftRef.current, start: 'top 85%' }
            })
            gsap.fromTo(rightRef.current, { opacity: 0, x: 50 }, {
                opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', delay: 0.25,
                scrollTrigger: { trigger: rightRef.current, start: 'top 85%' }
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
        <section id="contact" ref={sectionRef} className="bg-[#0a0a0a] pt-32 pb-24 relative overflow-hidden">
            {/* Background decoration */}
            <div className="pointer-events-none absolute bottom-0 right-0 w-[600px] h-[600px] opacity-10 rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(185,28,28,0.7) 0%, transparent 70%)', filter: 'blur(80px)' }}
            />
            <div className="pointer-events-none absolute top-0 left-0 w-[400px] h-[400px] opacity-10 rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(220,38,38,0.6) 0%, transparent 70%)', filter: 'blur(80px)' }}
            />

  <div className="max-w-5xl xl:max-w-6xl 3xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
      {/* Page header */}
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black text-white mb-4">
          Contact <span className="gradient-text">Me</span>
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto text-base sm:text-lg px-2 sm:px-0">
          Have a project in mind? I&apos;d love to hear about it. Send me a message and let&apos;s build something great.
        </p>
      </div>

      <div className="grid md:grid-cols-[1fr_1.5fr] gap-6 sm:gap-8 items-start">
                    {/* Left: Magnetic contact links */}
                    <div ref={leftRef} className="flex flex-col gap-5" style={{ opacity: 0 }}>
                        {contactLinks.map((link) => (
                            <MagneticLink key={link.label} {...link} />
                        ))}

                        {/* Fun note */}
                        <div className="p-5 rounded-2xl glass mt-2">
                            <p className="text-xs font-mono text-slate-500 mb-2">// response time</p>
                            <p className="text-slate-300 text-sm">
                                I typically reply within
                                <span className="gradient-text font-semibold">24 hours</span>.
                                Looking forward to your message!
                            </p>
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div ref={rightRef} style={{ opacity: 0 }}>
                        {status === 'success' ? (
                            <div
                                ref={successRef}
                                className="flex flex-col items-center justify-center text-center p-12 rounded-2xl gradient-border gap-5"
                                style={{ opacity: 0 }}
                            >
                                <span className="text-green-400">
                                    <FaCircleCheck size={52} />
                                </span>
                                <h3 className="text-xl font-bold text-white">Message Sent!</h3>
                                <p className="text-slate-400 text-sm max-w-xs">
                                    Thanks for reaching out. I&apos;ll get back to you as soon as
                                    possible.
                                </p>
                                <button
                                    onClick={() => setStatus('idle')}
                                    className="btn-secondary py-2.5! px-6! text-sm!"
                                >
                                    Send another Mail
                                </button>
                            </div>
                        ) : (
                            <form
                                onSubmit={handleSubmit}
                                className="p-8 rounded-2xl gradient-border flex flex-col gap-5"
                            >
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-mono text-slate-500 uppercase tracking-widest">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Your full name"
                                        required
                                        className="input-field"
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-mono text-slate-500 uppercase tracking-widest">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="you@example.com"
                                        required
                                        className="input-field"
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-mono text-slate-500 uppercase tracking-widest">
                                        Message
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tell me about your project..."
                                        required
                                        rows={5}
                                        className="input-field resize-none"
                                    />
                                </div>

                                {status === 'error' && (
                                    <p className="text-pink-400 text-sm">
                                        Something went wrong. Please try again or email me directly.
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="btn-primary justify-center"
                                >
                                    {status === 'loading' ? (
                                        <>
                                            <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            Send Message
                                            <FaArrowRight size={14} />
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

