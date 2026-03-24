'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import RevealOnScroll from '../ui/RevealOnScroll'
import { solutionCategories } from '@/lib/data'

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.15,
        },
    },
}

const rowVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.98 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1] as const,
        },
    },
}

export default function Services() {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

    return (
        <section className="py-24 md:py-32 bg-bg-secondary">
            <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
                <RevealOnScroll>
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                        <h2 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.1]">
                            What we<br />build
                        </h2>
                        <p className="text-text-secondary max-w-sm text-lg">
                            AI systems, custom software, and operational tools built around how your business actually works.
                        </p>
                    </div>
                </RevealOnScroll>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-10%" }}
                    className="border-t border-border"
                >
                    {solutionCategories.map((solution, index) => {
                        const isExpanded = expandedIndex === index

                        return (
                            <motion.div key={solution.id} variants={rowVariants}>
                                <div
                                    className={`group border-b border-border transition-all duration-300 ${isExpanded ? 'bg-bg-elevated/30 rounded-xl px-4 lg:px-6 -mx-4 lg:-mx-6' : ''}`}
                                    onMouseEnter={() => setExpandedIndex(index)}
                                    onMouseLeave={() => setExpandedIndex(null)}
                                >
                                    <button
                                        onClick={() => setExpandedIndex(isExpanded ? null : index)}
                                        className="w-full relative z-10 text-left py-6 lg:py-10 flex items-center justify-between gap-4 transition-colors duration-500 cursor-pointer"
                                        aria-expanded={isExpanded}
                                    >
                                        <div className="flex items-center gap-4 lg:gap-16 min-w-0">
                                            <span className="font-display text-lg lg:text-2xl text-text-muted opacity-50 shrink-0">
                                                {String(index + 1).padStart(2, '0')}
                                            </span>
                                            <h3 className={`font-display text-2xl lg:text-4xl transition-colors duration-300 truncate ${isExpanded ? 'text-accent' : 'text-text-primary'}`}>
                                                {solution.title}
                                            </h3>
                                        </div>
                                        <div className="shrink-0 p-1 lg:p-2 cursor-pointer">
                                            <motion.div
                                                animate={{ rotate: isExpanded ? 45 : 0 }}
                                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
                                                className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border border-border flex items-center justify-center text-text-muted group-hover:border-accent group-hover:bg-accent/5 group-hover:text-accent transition-colors"
                                            >
                                                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M7 0V14M0 7H14" stroke="currentColor" strokeWidth="1.5" />
                                                </svg>
                                            </motion.div>
                                        </div>
                                    </button>

                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pb-8 lg:pb-12 pt-2 pl-0 lg:pl-26 flex flex-col lg:flex-row gap-6 lg:gap-12">
                                                    <div className="flex flex-col gap-4 lg:gap-6 flex-1">
                                                        <p className="text-base lg:text-xl text-text-secondary leading-relaxed max-w-2xl">
                                                            {solution.description}
                                                        </p>
                                                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                            {solution.capabilities.map((cap, i) => (
                                                                <motion.li
                                                                    key={i}
                                                                    initial={{ opacity: 0, x: -10 }}
                                                                    animate={{ opacity: 1, x: 0 }}
                                                                    transition={{ duration: 0.4, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] as const }}
                                                                    className="flex items-center gap-2 text-sm text-text-secondary"
                                                                >
                                                                    <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                                                                    {cap}
                                                                </motion.li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                    <div className="hidden lg:block w-[280px] shrink-0">
                                                        <motion.div
                                                            initial={{ opacity: 0, scale: 0.95 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
                                                            className="w-full h-40 rounded-lg overflow-hidden relative"
                                                        >
                                                            <Image
                                                                src={solution.image}
                                                                alt={solution.title}
                                                                fill
                                                                className="object-cover"
                                                                sizes="280px"
                                                            />
                                                        </motion.div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        )
                    })}
                </motion.div>
            </div>
        </section>
    )
}
