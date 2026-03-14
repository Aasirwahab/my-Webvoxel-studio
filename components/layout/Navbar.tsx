'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import TransitionLink from '@/components/ui/TransitionLink'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const scrolledRef = useRef(false)
    const rafRef = useRef<number>(0)

    const handleScroll = useCallback(() => {
        if (rafRef.current) return
        rafRef.current = requestAnimationFrame(() => {
            const isScrolled = window.scrollY > 50
            if (isScrolled !== scrolledRef.current) {
                scrolledRef.current = isScrolled
                setScrolled(isScrolled)
            }
            rafRef.current = 0
        })
    }, [])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => {
            window.removeEventListener('scroll', handleScroll)
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
        }
    }, [handleScroll])

    const navLinks = [
        { name: 'Solutions', href: '/solutions' },
        { name: 'Work', href: '/works' },
        { name: 'About', href: '/about' },
    ]

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 will-change-[background-color,padding] transition-[background-color,border-color,box-shadow,padding] duration-500 ease-out ${scrolled
                    ? 'bg-white border-b border-border shadow-[0_8px_32px_rgba(0,0,0,0.04)] py-2 text-text-primary'
                    : 'bg-transparent border-b border-transparent py-4 text-text-primary'
                    }`}
                style={{ backfaceVisibility: 'hidden' }}
            >
                <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between relative">

                    {/* Left — Nav links */}
                    <nav className="hidden lg:flex items-center gap-8 flex-1">
                        {navLinks.map((link) => (
                            <TransitionLink
                                key={link.name}
                                href={link.href}
                                className="text-sm tracking-wide text-text-secondary hover:text-text-primary transition-colors relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full" />
                            </TransitionLink>
                        ))}
                    </nav>

                    {/* Center — Logo (absolutely centered) */}
                    <Link href="/" className="absolute left-1/2 -translate-x-1/2 z-50">
                        <Image
                            src="/webvoxel-logoblack.png"
                            alt="Webvoxel Logo"
                            width={160}
                            height={40}
                            style={{ width: 'auto', height: 'auto', maxHeight: '40px' }}
                            className="object-contain transition-opacity duration-500 hover:opacity-80"
                            priority
                        />
                    </Link>

                    {/* Right — Divider + CTA */}
                    <div className="hidden lg:flex items-center gap-6 flex-1 justify-end">
                        <TransitionLink
                            href="/book-a-call"
                            className="bg-accent text-white px-6 py-2.5 rounded-full font-medium text-sm tracking-wide hover:bg-accent-hover hover:shadow-lg hover:-translate-y-0.5 transition-[background-color,box-shadow,transform] duration-300"
                        >
                            Book a Call
                        </TransitionLink>
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        className="lg:hidden z-50 p-2 -mr-2 text-text-primary"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <div className="w-6 h-5 flex flex-col justify-between items-end relative">
                            <span className={`h-[1.5px] bg-current transition-[width,transform,top] duration-300 ${mobileMenuOpen ? 'w-6 rotate-45 absolute top-2' : 'w-6'}`} />
                            <span className={`h-[1.5px] bg-current transition-[opacity,width] duration-300 ${mobileMenuOpen ? 'opacity-0' : 'w-4'}`} />
                            <span className={`h-[1.5px] bg-current transition-[width,transform,top] duration-300 ${mobileMenuOpen ? 'w-6 -rotate-45 absolute top-2' : 'w-5'}`} />
                        </div>
                    </button>
                </div>
            </header>

            {/* Mobile fullscreen menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-white/98 backdrop-blur-xl flex flex-col items-center justify-center px-6"
                    >
                        <nav className="flex flex-col items-center gap-8 text-center">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + (i * 0.08), duration: 0.4 }}
                                >
                                    <TransitionLink
                                        href={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="font-display text-4xl hover:text-accent transition-colors"
                                    >
                                        {link.name}
                                    </TransitionLink>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.4 }}
                                className="mt-6"
                            >
                                <TransitionLink
                                    href="/book-a-call"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="bg-accent text-white px-8 py-4 rounded-full font-medium text-lg"
                                >
                                    Book a Call
                                </TransitionLink>
                            </motion.div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
