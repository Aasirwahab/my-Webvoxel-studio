'use client'

import { motion } from 'framer-motion'
import RevealOnScroll from '../ui/RevealOnScroll'
import { whyWebVoxel } from '@/lib/data'
import { Workflow, Bot, Layers, Target } from 'lucide-react'

const icons = [Workflow, Bot, Layers, Target]

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.1,
        },
    },
}

const cardVariants = {
    hidden: { opacity: 0, y: 40, rotateX: 8 },
    show: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: {
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1] as const,
        },
    },
}

export default function WhyWebVoxel() {
    return (
        <section className="py-24 md:py-32">
            <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
                <RevealOnScroll>
                    <div className="mb-16 max-w-2xl">
                        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-6">
                            Why WebVoxel
                        </h2>
                        <p className="text-lg text-text-secondary leading-relaxed">
                            We focus on building systems that create real operational value for your business.
                        </p>
                    </div>
                </RevealOnScroll>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-10%" }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
                    style={{ perspective: 1000 }}
                >
                    {whyWebVoxel.map((item, i) => {
                        const Icon = icons[i]
                        return (
                            <motion.div
                                key={i}
                                variants={cardVariants}
                                className="group relative p-8 md:p-10 rounded-2xl border border-border overflow-hidden cursor-default"
                                whileHover={{
                                    y: -4,
                                    borderColor: 'rgba(var(--color-accent-rgb, 168, 139, 250), 0.3)',
                                }}
                                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
                            >
                                {/* Subtle background gradient on hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.03] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                <div className="relative z-10 flex items-start gap-5">
                                    <motion.div
                                        className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0"
                                        whileHover={{ scale: 1.1, rotate: -8 }}
                                        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                                    >
                                        <Icon className="w-6 h-6 text-accent" />
                                    </motion.div>
                                    <div>
                                        <h3 className="font-display text-xl md:text-2xl mb-3 group-hover:text-accent transition-colors duration-300">{item.title}</h3>
                                        <p className="text-text-secondary leading-relaxed">{item.description}</p>
                                    </div>
                                </div>

                                {/* Index number watermark */}
                                <span className="absolute top-6 right-8 font-display text-8xl text-text-primary/[0.03] group-hover:text-accent/[0.06] transition-colors duration-500 select-none pointer-events-none">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                            </motion.div>
                        )
                    })}
                </motion.div>
            </div>
        </section>
    )
}
