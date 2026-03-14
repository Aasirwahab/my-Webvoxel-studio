'use client'

import { motion } from 'framer-motion'
import RevealOnScroll from '../ui/RevealOnScroll'
import { exampleSystems } from '@/lib/data'
import { ArrowRight } from 'lucide-react'

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.06,
            delayChildren: 0.15,
        },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 25, scale: 0.96 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1] as const,
        },
    },
}

export default function ExampleSystems() {
    return (
        <section className="py-24 md:py-32 bg-bg-secondary">
            <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
                <RevealOnScroll>
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1]">
                            Example systems<br />we build
                        </h2>
                        <p className="text-text-secondary max-w-sm text-lg">
                            A selection of the types of systems we design and deliver for businesses.
                        </p>
                    </div>
                </RevealOnScroll>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-10%" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                >
                    {exampleSystems.map((system, i) => (
                        <motion.div
                            key={i}
                            variants={itemVariants}
                            className="group relative flex items-center gap-3 p-5 rounded-xl border border-border bg-bg-primary overflow-hidden cursor-default"
                            whileHover={{
                                y: -3,
                                borderColor: 'rgba(var(--color-accent-rgb, 168, 139, 250), 0.3)',
                                boxShadow: '0 8px 24px -8px rgba(0,0,0,0.1)',
                            }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
                        >
                            {/* Hover sweep effect */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent pointer-events-none"
                                initial={{ x: '-100%' }}
                                whileHover={{ x: '0%' }}
                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
                            />

                            <motion.div
                                className="relative z-10"
                                initial={{ x: 0 }}
                                whileHover={{ x: 3 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                            >
                                <ArrowRight className="w-4 h-4 text-accent shrink-0" />
                            </motion.div>
                            <span className="relative z-10 text-text-primary font-medium text-sm group-hover:text-accent transition-colors duration-300">{system}</span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
