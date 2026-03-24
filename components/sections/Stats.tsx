'use client'

import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { motion } from 'framer-motion'
import AnimatedCounter from '../ui/AnimatedCounter'
import RevealOnScroll from '../ui/RevealOnScroll'

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1,
        },
    },
}

const statVariants = {
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

export default function Stats() {
    const companyInfo = useQuery(api.settings.getCompanyInfo)

    if (companyInfo === undefined) {
        return <section className="py-24 border-y border-border bg-bg-primary min-h-[300px]"></section>
    }

    if (!companyInfo || !companyInfo.stats || companyInfo.stats.length === 0) {
        return null
    }

    return (
        <section className="py-24 md:py-32 border-y border-border bg-bg-primary">
            <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-10%" }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6"
                >
                    {companyInfo.stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            variants={statVariants}
                        >
                            <motion.div
                                className="group relative flex flex-col items-center text-center p-8 md:p-10 rounded-2xl border border-transparent hover:border-border bg-transparent hover:bg-bg-secondary/50 overflow-hidden cursor-default transition-colors duration-300"
                                whileHover={{
                                    y: -6,
                                    borderColor: 'rgba(5, 150, 105, 0.4)',
                                    boxShadow: '0 20px 40px -12px rgba(0,0,0,0.08)',
                                }}
                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
                            >
                                {/* Hover gradient */}
                                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                <div className="relative z-10">
                                    <div className="font-display text-6xl md:text-7xl lg:text-8xl text-text-primary mb-4 flex items-end justify-center group-hover:text-accent transition-colors duration-500">
                                        <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                                    </div>
                                    <p className="text-sm tracking-widest uppercase text-text-muted font-medium">
                                        {stat.label}
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
