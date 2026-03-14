'use client'

import { motion } from 'framer-motion'
import RevealOnScroll from '../ui/RevealOnScroll'
import { additionalCapabilities } from '@/lib/data'

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.2,
        },
    },
}

const pillVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 10 },
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

export default function AdditionalCapabilities() {
    return (
        <section className="py-24 md:py-32">
            <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
                <RevealOnScroll>
                    <div className="max-w-3xl mx-auto text-center mb-12">
                        <h2 className="font-display text-3xl md:text-4xl leading-[1.1] mb-4">
                            Additional capabilities
                        </h2>
                        <p className="text-text-secondary text-lg leading-relaxed">
                            We also build and support a wider range of digital systems for businesses that need more than a single solution.
                        </p>
                    </div>
                </RevealOnScroll>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-10%" }}
                    className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto"
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
    )
}
