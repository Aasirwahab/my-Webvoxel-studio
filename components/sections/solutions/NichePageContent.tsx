'use client'

import { motion } from 'framer-motion'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import MagneticButton from '@/components/ui/MagneticButton'
import { AlertTriangle, Check } from 'lucide-react'

interface NichePageProps {
    h1: string
    subtitle: string
    painPoints: string[]
    solutions: string[]
    cta: string
}

const gridContainerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.15,
        },
    },
}

const cardVariants = {
    hidden: { opacity: 0, y: 25, scale: 0.96 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1] as const,
        },
    },
}

const checkVariants = {
    hidden: { scale: 0, rotate: -90 },
    show: {
        scale: 1,
        rotate: 0,
        transition: {
            type: 'spring' as const,
            stiffness: 250,
            damping: 15,
            delay: 0.1,
        },
    },
}

const iconPulse = {
    hidden: { scale: 0, opacity: 0 },
    show: {
        scale: 1,
        opacity: 1,
        transition: {
            type: 'spring' as const,
            stiffness: 200,
            damping: 12,
            delay: 0.05,
        },
    },
}

export default function NichePageContent({ h1, subtitle, painPoints, solutions, cta }: NichePageProps) {
    return (
        <div className="bg-bg-primary text-text-primary">
            {/* Hero */}
            <section className="pt-16 pb-24 md:pt-24 md:pb-32">
                <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.h1
                            className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight mb-6 max-w-4xl"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, delay: 0.1 }}
                        >
                            {h1}
                        </motion.h1>
                        <motion.p
                            className="text-xl text-text-secondary max-w-2xl leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const, delay: 0.25 }}
                        >
                            {subtitle}
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Pain Points */}
            <section className="py-20 md:py-28 bg-bg-secondary">
                <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
                    <RevealOnScroll>
                        <h2 className="font-display text-3xl md:text-4xl leading-[1.1] mb-12">
                            Common challenges we solve
                        </h2>
                    </RevealOnScroll>
                    <motion.div
                        variants={gridContainerVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-10%" }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                        {painPoints.map((point, i) => (
                            <motion.div
                                key={i}
                                variants={cardVariants}
                                className="group flex items-start gap-3 p-5 rounded-xl border border-border bg-bg-primary overflow-hidden relative cursor-default"
                                whileHover={{
                                    y: -3,
                                    borderColor: 'rgba(251, 191, 36, 0.3)',
                                    boxShadow: '0 6px 20px -6px rgba(0,0,0,0.08)',
                                }}
                                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                <motion.div variants={iconPulse} className="relative z-10 shrink-0 mt-0.5">
                                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                                </motion.div>
                                <p className="relative z-10 text-text-primary group-hover:text-text-primary/90 transition-colors">{point}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Solutions */}
            <section className="py-20 md:py-28">
                <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
                    <RevealOnScroll>
                        <h2 className="font-display text-3xl md:text-4xl leading-[1.1] mb-12">
                            What we build for you
                        </h2>
                    </RevealOnScroll>
                    <motion.div
                        variants={gridContainerVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-10%" }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                        {solutions.map((solution, i) => (
                            <motion.div
                                key={i}
                                variants={cardVariants}
                                className="group flex items-start gap-3 p-5 rounded-xl border border-border overflow-hidden relative cursor-default"
                                whileHover={{
                                    y: -3,
                                    borderColor: 'rgba(var(--color-accent-rgb, 168, 139, 250), 0.3)',
                                    boxShadow: '0 6px 20px -6px rgba(0,0,0,0.08)',
                                }}
                                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-accent/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                <motion.div
                                    variants={checkVariants}
                                    className="relative z-10 w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-accent/20 transition-colors"
                                >
                                    <Check className="w-3.5 h-3.5 text-accent" />
                                </motion.div>
                                <p className="relative z-10 text-text-primary group-hover:text-accent transition-colors duration-300">{solution}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 md:py-28 bg-bg-secondary">
                <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 text-center">
                    <RevealOnScroll>
                        <motion.h2
                            className="font-display text-4xl md:text-5xl leading-[1.1] mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
                        >
                            Ready to improve your operations?
                        </motion.h2>
                        <motion.p
                            className="text-lg text-text-secondary mb-10 max-w-xl mx-auto"
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const, delay: 0.15 }}
                        >
                            Book a short discovery call and we will show you how we would approach it.
                        </motion.p>
                        <MagneticButton href="/book-a-call" variant="primary">
                            {cta}
                        </MagneticButton>
                    </RevealOnScroll>
                </div>
            </section>
        </div>
    )
}
