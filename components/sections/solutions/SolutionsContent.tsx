'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import MagneticButton from '@/components/ui/MagneticButton'
import { solutionsPageData, additionalCapabilities } from '@/lib/data'
import { ChevronDown } from 'lucide-react'

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.15,
        },
    },
}

const accordionVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.97 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1] as const,
        },
    },
}

const capContainerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.03,
            delayChildren: 0.1,
        },
    },
}

const capItemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 8 },
    show: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: 0.35,
            ease: [0.22, 1, 0.36, 1] as const,
        },
    },
}

const pillContainerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.04,
            delayChildren: 0.1,
        },
    },
}

const pillVariants = {
    hidden: { opacity: 0, scale: 0.85, y: 10 },
    show: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1] as const,
        },
    },
}

export default function SolutionsContent() {
    const [expandedId, setExpandedId] = useState<string | null>(solutionsPageData[0].id)

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
                        <motion.p
                            className="text-sm tracking-widest uppercase text-text-muted mb-4"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
                        >
                            Solutions
                        </motion.p>
                        <motion.h1
                            className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight mb-6 max-w-4xl"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, delay: 0.1 }}
                        >
                            Solutions built around business operations
                        </motion.h1>
                        <motion.p
                            className="text-xl text-text-secondary max-w-2xl leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const, delay: 0.25 }}
                        >
                            From AI-powered front-line systems to custom internal software, we build solutions that help businesses respond faster, reduce manual work, and operate more efficiently.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Solutions Grid */}
            <section className="py-20 md:py-28 bg-bg-secondary">
                <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-10%" }}
                        className="space-y-4"
                    >
                        {solutionsPageData.map((solution, index) => {
                            const isExpanded = expandedId === solution.id
                            return (
                                <motion.div
                                    key={solution.id}
                                    variants={accordionVariants}
                                    className={`group rounded-2xl border transition-all duration-300 overflow-hidden ${isExpanded ? 'border-accent/30 bg-bg-primary shadow-lg' : 'border-border bg-bg-primary hover:border-accent/20'}`}
                                    whileHover={!isExpanded ? { y: -2, boxShadow: '0 4px 16px -4px rgba(0,0,0,0.08)' } : {}}
                                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
                                >
                                    <button
                                        onClick={() => setExpandedId(isExpanded ? null : solution.id)}
                                        className="w-full text-left p-6 md:p-8 flex items-center justify-between gap-4 cursor-pointer"
                                        aria-expanded={isExpanded}
                                    >
                                        <div>
                                            <motion.span
                                                className="text-sm text-accent font-medium mb-1 block"
                                                initial={{ opacity: 0 }}
                                                whileInView={{ opacity: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: index * 0.05 }}
                                            >
                                                {String(index + 1).padStart(2, '0')}
                                            </motion.span>
                                            <h3 className="font-display text-2xl md:text-3xl group-hover:text-accent transition-colors duration-300">{solution.title}</h3>
                                        </div>
                                        <motion.div
                                            animate={{ rotate: isExpanded ? 180 : 0 }}
                                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
                                            className="shrink-0"
                                        >
                                            <ChevronDown className="w-6 h-6 text-text-muted group-hover:text-accent transition-colors" />
                                        </motion.div>
                                    </button>

                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
                                                className="overflow-hidden"
                                            >
                                                <div className="px-6 md:px-8 pb-8">
                                                    <motion.p
                                                        className="text-lg text-text-secondary leading-relaxed mb-6 max-w-2xl"
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ duration: 0.4, delay: 0.15 }}
                                                    >
                                                        {solution.description}
                                                    </motion.p>
                                                    <motion.ul
                                                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
                                                        variants={capContainerVariants}
                                                        initial="hidden"
                                                        animate="show"
                                                    >
                                                        {solution.capabilities.map((cap, i) => (
                                                            <motion.li
                                                                key={i}
                                                                variants={capItemVariants}
                                                                className="flex items-center gap-2 text-text-primary group/item hover:text-accent transition-colors duration-300 cursor-default"
                                                            >
                                                                <motion.span
                                                                    className="w-1.5 h-1.5 rounded-full bg-accent shrink-0"
                                                                    initial={{ scale: 0 }}
                                                                    animate={{ scale: 1 }}
                                                                    transition={{ type: 'spring', stiffness: 300, damping: 15, delay: i * 0.03 + 0.2 }}
                                                                />
                                                                {cap}
                                                            </motion.li>
                                                        ))}
                                                    </motion.ul>
                                                </div>

                                                {/* Bottom accent line */}
                                                <motion.div
                                                    className="h-0.5 bg-accent/20"
                                                    initial={{ scaleX: 0 }}
                                                    animate={{ scaleX: 1 }}
                                                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, delay: 0.2 }}
                                                    style={{ originX: 0 }}
                                                />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            )
                        })}
                    </motion.div>
                </div>
            </section>

            {/* Additional Capabilities */}
            <section className="py-20 md:py-28">
                <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
                    <RevealOnScroll>
                        <div className="max-w-2xl mb-12">
                            <h2 className="font-display text-3xl md:text-4xl leading-[1.1] mb-4">Additional capabilities</h2>
                            <p className="text-text-secondary text-lg">
                                For businesses that need broader digital delivery, we also support:
                            </p>
                        </div>
                    </RevealOnScroll>
                    <motion.div
                        variants={pillContainerVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-10%" }}
                        className="flex flex-wrap gap-3"
                    >
                        {additionalCapabilities.map((cap, i) => (
                            <motion.span
                                key={i}
                                variants={pillVariants}
                                className="px-5 py-2.5 rounded-full border border-border text-sm text-text-secondary cursor-default"
                                whileHover={{
                                    scale: 1.08,
                                    borderColor: 'rgba(var(--color-accent-rgb, 168, 139, 250), 0.5)',
                                    color: 'var(--color-accent)',
                                    y: -2,
                                }}
                                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                            >
                                {cap}
                            </motion.span>
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
                            Need a system built around your workflow?
                        </motion.h2>
                        <motion.p
                            className="text-lg text-text-secondary mb-10 max-w-xl mx-auto"
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const, delay: 0.15 }}
                        >
                            We help businesses turn slow, manual, fragmented workflows into faster, more reliable systems.
                        </motion.p>
                        <MagneticButton href="/book-a-call" variant="primary">
                            Book a Systems Call
                        </MagneticButton>
                    </RevealOnScroll>
                </div>
            </section>
        </div>
    )
}
