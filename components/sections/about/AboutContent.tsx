'use client'

import { motion } from 'framer-motion'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import MagneticButton from '@/components/ui/MagneticButton'
import { aboutPage } from '@/lib/data'
import { Search, PenTool, Code, TrendingUp } from 'lucide-react'

const stepIcons = [Search, PenTool, Code, TrendingUp]

const stepsContainerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
        },
    },
}

const stepCardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
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

const lineVariants = {
    hidden: { scaleX: 0 },
    show: {
        scaleX: 1,
        transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1] as const,
            delay: 0.3,
        },
    },
}

const splitSectionVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1] as const,
        },
    },
}

const splitTextVariants = {
    hidden: { opacity: 0, y: 20, x: 20 },
    show: {
        opacity: 1,
        y: 0,
        x: 0,
        transition: {
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1] as const,
            delay: 0.15,
        },
    },
}

export default function AboutContent() {
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
                            About WebVoxel Studio
                        </motion.p>
                        <motion.h1
                            className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight mb-6 max-w-4xl"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, delay: 0.1 }}
                        >
                            {aboutPage.h1}
                        </motion.h1>
                        <motion.p
                            className="text-xl text-text-secondary max-w-2xl leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const, delay: 0.25 }}
                        >
                            {aboutPage.subtitle}
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Who We Are */}
            <section className="py-20 md:py-28 bg-bg-secondary">
                <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                        <motion.div
                            variants={splitSectionVariants}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: "-10%" }}
                        >
                            <h2 className="font-display text-4xl md:text-5xl leading-[1.1]">Who we are</h2>
                            <motion.div
                                className="h-1 w-16 bg-accent rounded-full mt-6 origin-left"
                                variants={lineVariants}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                            />
                        </motion.div>
                        <motion.div
                            variants={splitTextVariants}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: "-10%" }}
                        >
                            <p className="text-lg text-text-secondary leading-relaxed">
                                {aboutPage.sections.whoWeAre}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* What We Believe */}
            <section className="py-20 md:py-28">
                <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                        <motion.div
                            variants={splitSectionVariants}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: "-10%" }}
                        >
                            <h2 className="font-display text-4xl md:text-5xl leading-[1.1]">What we believe</h2>
                            <motion.div
                                className="h-1 w-16 bg-accent rounded-full mt-6 origin-left"
                                variants={lineVariants}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                            />
                        </motion.div>
                        <motion.div
                            variants={splitTextVariants}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: "-10%" }}
                        >
                            <p className="text-lg text-text-secondary leading-relaxed">
                                {aboutPage.sections.whatWeBelieve}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* What We Build */}
            <section className="py-20 md:py-28 bg-bg-secondary">
                <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                        <motion.div
                            variants={splitSectionVariants}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: "-10%" }}
                        >
                            <h2 className="font-display text-4xl md:text-5xl leading-[1.1]">What we build</h2>
                            <motion.div
                                className="h-1 w-16 bg-accent rounded-full mt-6 origin-left"
                                variants={lineVariants}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                            />
                        </motion.div>
                        <motion.div
                            variants={splitTextVariants}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: "-10%" }}
                        >
                            <p className="text-lg text-text-secondary leading-relaxed">
                                {aboutPage.sections.whatWeBuild}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* How We Work */}
            <section className="py-20 md:py-28">
                <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
                    <RevealOnScroll>
                        <h2 className="font-display text-4xl md:text-5xl leading-[1.1] mb-16">How we work</h2>
                    </RevealOnScroll>
                    <motion.div
                        variants={stepsContainerVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-10%" }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                        style={{ perspective: 1000 }}
                    >
                        {aboutPage.sections.howWeWork.map((item, i) => {
                            const Icon = stepIcons[i]
                            return (
                                <motion.div
                                    key={i}
                                    variants={stepCardVariants}
                                    className="group relative p-8 rounded-2xl border border-border overflow-hidden cursor-default"
                                    whileHover={{
                                        y: -4,
                                        borderColor: 'rgba(var(--color-accent-rgb, 168, 139, 250), 0.3)',
                                    }}
                                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
                                >
                                    {/* Hover gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.03] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                    {/* Watermark step number */}
                                    <span className="absolute top-4 right-6 font-display text-7xl text-text-primary/[0.03] group-hover:text-accent/[0.06] transition-colors duration-500 select-none pointer-events-none">
                                        {String(i + 1).padStart(2, '0')}
                                    </span>

                                    <div className="relative z-10">
                                        <motion.div
                                            className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5"
                                            whileHover={{ scale: 1.1, rotate: -8 }}
                                            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                                        >
                                            <Icon className="w-6 h-6 text-accent" />
                                        </motion.div>
                                        <span className="text-sm text-accent font-medium mb-2 block">Step {i + 1}</span>
                                        <h3 className="font-display text-2xl mb-3 group-hover:text-accent transition-colors duration-300">{item.step}</h3>
                                        <p className="text-text-secondary leading-relaxed">{item.description}</p>
                                    </div>

                                    {/* Bottom accent line */}
                                    <motion.div
                                        className="absolute bottom-0 left-0 h-0.5 bg-accent"
                                        initial={{ width: '0%' }}
                                        whileHover={{ width: '100%' }}
                                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
                                    />
                                </motion.div>
                            )
                        })}
                    </motion.div>
                </div>
            </section>

            {/* Why Clients Work With Us */}
            <section className="py-20 md:py-28 bg-bg-secondary">
                <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                        <motion.div
                            variants={splitSectionVariants}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: "-10%" }}
                        >
                            <h2 className="font-display text-4xl md:text-5xl leading-[1.1]">Why clients<br />work with us</h2>
                            <motion.div
                                className="h-1 w-16 bg-accent rounded-full mt-6 origin-left"
                                variants={lineVariants}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                            />
                        </motion.div>
                        <motion.div
                            variants={splitTextVariants}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: "-10%" }}
                        >
                            <p className="text-lg text-text-secondary leading-relaxed mb-8">
                                {aboutPage.sections.whyClientsWorkWithUs}
                            </p>
                            <MagneticButton href="/book-a-call" variant="primary">
                                Book a Systems Call
                            </MagneticButton>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    )
}
