'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { inter } from '@/lib/fonts'

const staggerContainer = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1,
        },
    },
}

const fadeUp = {
    hidden: { opacity: 0, y: 50, scale: 0.98 },
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

export default function About() {
    return (
        <section className="py-28 md:py-36">
            <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-10%" }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-start"
                >
                    <div className="lg:col-span-12 flex flex-col max-w-5xl">
                        <motion.h2
                            variants={fadeUp}
                            className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-8"
                        >
                            The team behind your systems
                        </motion.h2>

                        <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                            <p className={`text-lg text-text-secondary leading-relaxed ${inter.variable} font-sans`}>
                                We are a UK-based team that builds AI tools, custom software, and automation for businesses that have outgrown spreadsheets and generic SaaS. If your team is spending half the day on admin instead of real work, we can fix that.
                            </p>
                            <p className={`text-lg text-text-secondary leading-relaxed ${inter.variable} font-sans`}>
                                Every project starts with understanding how your business actually runs. We do not hand you a template — we build something that fits your team, your process, and the way your customers expect to be treated.
                            </p>
                        </motion.div>

                        <motion.div variants={fadeUp} className="flex items-center gap-6">
                            <Link
                                href="/studio"
                                className="inline-flex items-center gap-2 text-text-primary hover:text-accent font-medium group transition-colors"
                            >
                                More about us
                                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                            </Link>
                            <span className="w-12 h-px bg-border" />
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
