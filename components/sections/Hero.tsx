'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import MagneticButton from '../ui/MagneticButton'
import { inter } from '@/lib/fonts'
import HeroGlobe from '../ui/HeroGlobe'
import { useIsMobile } from '@/lib/useIsMobile'

/* ── Word-by-word reveal ────────────────────────────────── */
function AnimatedHeading() {
    const lines = [
        { text: "We build the systems", accent: false },
        { text: "your business is", accent: false },
        { text: "missing", accent: true },
    ]

    const lineVars = {
        hidden: { y: '100%', opacity: 0 },
        show: (i: number) => ({
            y: '0%',
            opacity: 1,
            transition: {
                duration: 0.8,
                delay: 1.3 + i * 0.15,
                ease: [0.16, 1, 0.3, 1] as const,
            },
        }),
    }

    return (
        <h1 className="font-display text-4xl md:text-5xl lg:text-[4.25rem] leading-[1.05] tracking-tight mb-3 lg:mb-4 overflow-hidden">
            {lines.map((line, i) => (
                <span key={i} className="block overflow-hidden pb-1">
                    <motion.span
                        className={`block ${line.accent ? 'text-accent' : ''}`}
                        variants={lineVars}
                        initial="hidden"
                        animate="show"
                        custom={i}
                    >
                        {line.text}
                    </motion.span>
                </span>
            ))}
        </h1>
    )
}

/* ── Hero Section ───────────────────────────────────────── */
export default function Hero() {
    const isMobile = useIsMobile()

    const itemVars = {
        hidden: { opacity: 0, y: 30 },
        show: (delay: number) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, delay: 1.3 + delay, ease: [0.16, 1, 0.3, 1] as const },
        }),
    }

    return (
        <section className="relative pt-8 lg:pt-16 pb-12 overflow-hidden">
            {/* Background atmosphere */}
            <div className="absolute top-0 right-0 w-[60%] h-[70%] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(5,150,105,0.03) 0%, transparent 70%)' }} />
            <div className="absolute bottom-0 left-0 w-[40%] h-[50%] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(5,150,105,0.02) 0%, transparent 70%)' }} />

            <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative z-10">

                {/* Left — Content */}
                <div className="lg:col-span-7 mt-0">
                    <motion.p
                        className={`text-sm tracking-widest uppercase text-text-muted mb-2 ${inter.variable} font-sans`}
                        variants={itemVars}
                        initial="hidden"
                        animate="show"
                        custom={0.1}
                    >
                        AI Systems & Custom Software — UK
                    </motion.p>

                    <AnimatedHeading />

                    <motion.p
                        className={`text-base text-text-secondary max-w-xl leading-relaxed mb-4 md:mb-5 ${inter.variable} font-sans`}
                        variants={itemVars}
                        initial="hidden"
                        animate="show"
                        custom={0.4}
                    >
                        Leads going cold. Admin piling up. Follow-ups forgotten. We build
                        AI receptionists, custom dashboards, and automation that fix the
                        problems your team deals with every day — so they can focus on
                        the work that actually grows your business.
                    </motion.p>

                    <motion.div
                        className="flex flex-wrap items-center gap-4 mb-5 lg:mb-6"
                        variants={itemVars}
                        initial="hidden"
                        animate="show"
                        custom={0.6}
                    >
                        <MagneticButton href="/book-a-call" variant="primary">
                            Book a Systems Call
                        </MagneticButton>
                        <MagneticButton href="/solutions" variant="ghost">
                            Explore Solutions →
                        </MagneticButton>
                    </motion.div>

                    {/* Trust Signals */}
                    <motion.div
                        className="flex items-center gap-4 pt-4 border-t border-border/60 max-w-lg"
                        variants={itemVars}
                        initial="hidden"
                        animate="show"
                        custom={0.8}
                    >
                        <div className="flex -space-x-2">
                            {[
                                'https://randomuser.me/api/portraits/men/32.jpg',
                                'https://randomuser.me/api/portraits/women/44.jpg',
                                'https://randomuser.me/api/portraits/men/75.jpg',
                            ].map((src, i) => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-bg-primary overflow-hidden relative bg-bg-elevated flex items-center justify-center">
                                    <Image src={src} alt="Client" fill sizes="48px" className="object-cover" priority={i === 0} />
                                </div>
                            ))}
                        </div>
                        <p className="text-sm text-text-muted leading-snug">
                            Trusted by 25+ businesses across the UK to handle leads, cut admin, and build software that fits.
                        </p>
                    </motion.div>
                </div>

                {/* Right — 3D Globe */}
                {!isMobile && (
                    <motion.div
                        className="hidden lg:flex lg:col-span-5 relative items-center justify-center min-h-[500px]"
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <HeroGlobe />
                    </motion.div>
                )}

            </div>
        </section>
    )
}
