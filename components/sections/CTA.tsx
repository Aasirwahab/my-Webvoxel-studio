'use client'

import { motion } from 'framer-motion'
import MagneticButton from '../ui/MagneticButton'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'

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
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1] as const,
        },
    },
}

export default function CTA() {
    const companyInfo = useQuery(api.settings.getCompanyInfo)

    return (
        <section className="relative py-32 md:py-40 overflow-hidden">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none" />

            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-10%" }}
                className="w-full max-w-[1400px] mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center text-center"
            >
                <motion.h2
                    variants={fadeUp}
                    className="font-display text-5xl md:text-7xl lg:text-[6.5rem] leading-[1.05] tracking-tight mb-8 max-w-5xl"
                >
                    Ready to stop losing leads and wasting time on admin?
                </motion.h2>

                <motion.p
                    variants={fadeUp}
                    className="text-xl md:text-2xl text-text-secondary max-w-xl mb-14"
                >
                    Tell us what is slowing your team down. We will show you exactly how we would fix it.
                </motion.p>

                <motion.div variants={fadeUp} className="flex flex-col items-center gap-8">
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <MagneticButton href="/book-a-call" variant="primary">
                            Book a Systems Call
                        </MagneticButton>
                        <MagneticButton href="/solutions" variant="ghost">
                            Explore Solutions →
                        </MagneticButton>
                    </div>

                    {companyInfo && (companyInfo.email || companyInfo.phone) && (
                        <motion.div
                            variants={fadeUp}
                            className="flex items-center gap-6 text-text-muted text-sm"
                        >
                            {companyInfo.email && (
                                <a href={`mailto:${companyInfo.email}`} className="hover:text-text-primary transition-colors">
                                    {companyInfo.email}
                                </a>
                            )}
                            {companyInfo.email && companyInfo.phone && (
                                <span className="w-1 h-1 rounded-full bg-border" />
                            )}
                            {companyInfo.phone && (
                                <a href={`tel:${companyInfo.phone.replace(/\s+/g, '')}`} className="hover:text-text-primary transition-colors">
                                    {companyInfo.phone}
                                </a>
                            )}
                        </motion.div>
                    )}
                </motion.div>
            </motion.div>
        </section>
    )
}
