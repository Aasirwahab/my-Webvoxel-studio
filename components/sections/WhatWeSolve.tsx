'use client'

import { motion } from 'framer-motion'
import RevealOnScroll from '../ui/RevealOnScroll'
import { whatWeSolve } from '@/lib/data'
import { AlertTriangle } from 'lucide-react'

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1,
        },
    },
}

const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.96 },
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

export default function WhatWeSolve() {
    return (
        <section className="py-24 md:py-32">
            <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
                <RevealOnScroll>
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1]">
                            {whatWeSolve.heading}
                        </h2>
                        <p className="text-text-secondary max-w-sm text-lg leading-relaxed">
                            {whatWeSolve.intro}
                        </p>
                    </div>
                </RevealOnScroll>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-10%" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                >
                    {whatWeSolve.items.map((item, i) => (
                        <motion.div key={i} variants={cardVariants}>
                            <motion.div
                                className="group relative p-8 md:p-10 rounded-2xl border border-border bg-bg-secondary h-full flex flex-col overflow-hidden cursor-default"
                                whileHover={{
                                    borderColor: 'rgba(5, 150, 105, 0.4)',
                                    y: -6,
                                    boxShadow: '0 20px 40px -12px rgba(0,0,0,0.12)',
                                }}
                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
                            >
                                {/* Hover gradient */}
                                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                <div className="relative z-10 flex flex-col h-full">
                                    <motion.div
                                        className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6"
                                        whileHover={{ scale: 1.15, rotate: -5 }}
                                        transition={{ type: 'spring', stiffness: 300, damping: 12 }}
                                    >
                                        <AlertTriangle className="w-6 h-6 text-accent" />
                                    </motion.div>
                                    <h3 className="font-display text-2xl md:text-3xl mb-4 group-hover:text-accent transition-colors duration-300">
                                        {item.title}
                                    </h3>
                                    <p className="text-text-secondary leading-relaxed flex-1">
                                        {item.description}
                                    </p>
                                </div>

                                {/* Bottom accent line that slides in */}
                                <motion.div
                                    className="absolute bottom-0 left-0 h-[2px] bg-accent"
                                    initial={{ width: '0%' }}
                                    whileHover={{ width: '100%' }}
                                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
                                />
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
