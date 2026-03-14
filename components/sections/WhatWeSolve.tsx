'use client'

import { motion } from 'framer-motion'
import RevealOnScroll from '../ui/RevealOnScroll'
import { whatWeSolve } from '@/lib/data'
import { AlertTriangle } from 'lucide-react'

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
}

const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1] as const,
        },
    },
}

export default function WhatWeSolve() {
    return (
        <section className="py-24 md:py-32">
            <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
                <RevealOnScroll>
                    <div className="mb-16 max-w-3xl">
                        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-6">
                            {whatWeSolve.heading}
                        </h2>
                        <p className="text-lg text-text-secondary leading-relaxed">
                            {whatWeSolve.intro}
                        </p>
                    </div>
                </RevealOnScroll>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-10%" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {whatWeSolve.items.map((item, i) => (
                        <motion.div
                            key={i}
                            variants={cardVariants}
                            className="group relative p-6 md:p-8 rounded-2xl border border-border bg-bg-secondary overflow-hidden cursor-default"
                        >
                            {/* Hover gradient overlay */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 pointer-events-none"
                                whileHover={{ opacity: 1 }}
                                transition={{ duration: 0.4 }}
                            />

                            {/* Animated border glow on hover */}
                            <motion.div
                                className="absolute inset-0 rounded-2xl pointer-events-none"
                                style={{ border: '1px solid transparent' }}
                                whileHover={{ borderColor: 'rgba(var(--color-accent-rgb, 168, 139, 250), 0.3)' }}
                                transition={{ duration: 0.3 }}
                            />

                            <div className="relative z-10">
                                <motion.div
                                    className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4"
                                    whileHover={{ scale: 1.1, rotate: -5 }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                                >
                                    <AlertTriangle className="w-5 h-5 text-accent" />
                                </motion.div>
                                <h3 className="font-display text-xl mb-3 group-hover:text-accent transition-colors duration-300">{item.title}</h3>
                                <p className="text-text-secondary text-sm leading-relaxed">{item.description}</p>
                            </div>

                            {/* Corner accent line */}
                            <motion.div
                                className="absolute top-0 right-0 w-0 h-[2px] bg-accent"
                                initial={{ width: 0 }}
                                whileHover={{ width: 60 }}
                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
