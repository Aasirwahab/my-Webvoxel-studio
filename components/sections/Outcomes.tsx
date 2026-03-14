'use client'

import { motion } from 'framer-motion'
import RevealOnScroll from '../ui/RevealOnScroll'
import { outcomes } from '@/lib/data'
import { Check } from 'lucide-react'

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.15,
        },
    },
}

const itemVariants = {
    hidden: { opacity: 0, x: -20, scale: 0.95 },
    show: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1] as const,
        },
    },
}

const checkVariants = {
    hidden: { scale: 0, rotate: -180 },
    show: {
        scale: 1,
        rotate: 0,
        transition: {
            type: 'spring' as const,
            stiffness: 200,
            damping: 15,
            delay: 0.1,
        },
    },
}

export default function Outcomes() {
    return (
        <section className="py-24 md:py-32 bg-bg-secondary">
            <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
                <RevealOnScroll>
                    <div className="text-center mb-16">
                        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-6">
                            What changes when your<br />
                            <motion.span
                                className="text-accent inline-block"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
                            >
                                systems work properly
                            </motion.span>
                        </h2>
                    </div>
                </RevealOnScroll>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-10%" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto"
                >
                    {outcomes.map((outcome, i) => (
                        <motion.div
                            key={i}
                            variants={itemVariants}
                            className="group flex items-start gap-3 p-4 rounded-xl hover:bg-bg-elevated/50 transition-colors duration-300 cursor-default"
                            whileHover={{ x: 6 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        >
                            <motion.div
                                variants={checkVariants}
                                className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-accent/20 transition-colors"
                            >
                                <Check className="w-3.5 h-3.5 text-accent" />
                            </motion.div>
                            <p className="text-text-primary font-medium group-hover:text-accent transition-colors duration-300">{outcome}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
