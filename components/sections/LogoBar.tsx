'use client'

import { motion } from 'framer-motion'
import { techLogos } from '@/lib/data'
import RevealOnScroll from '../ui/RevealOnScroll'

export default function LogoBar() {
    // Duplicate logos for seamless infinite loop
    const logos = [...techLogos, ...techLogos]

    return (
        <section className="py-12 md:py-16 border-y border-border bg-bg-secondary overflow-hidden">
            <RevealOnScroll>
                <p className="text-sm font-medium tracking-widest text-text-muted uppercase mb-8 text-center">
                    Technologies we build with
                </p>
            </RevealOnScroll>

            <div className="relative w-full group">
                {/* Fade edges */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-bg-secondary to-transparent z-10" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-bg-secondary to-transparent z-10" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="flex"
                >
                    <motion.div
                        className="flex shrink-0 gap-6 md:gap-8"
                        animate={{ x: ['0%', '-50%'] }}
                        transition={{
                            x: {
                                duration: 30,
                                repeat: Infinity,
                                ease: 'linear',
                            },
                        }}
                        whileHover="slow"
                    >
                        {logos.map(({ name, Icon }, index) => (
                            <div
                                key={`${name}-${index}`}
                                className="group/item flex items-center gap-2.5 px-5 py-3 rounded-full border border-border bg-bg-primary cursor-default hover:border-accent/40 hover:shadow-md transition-all duration-300 shrink-0"
                            >
                                <Icon className="w-5 h-5 text-text-muted group-hover/item:text-accent transition-colors duration-300" />
                                <span className="text-sm font-medium text-text-secondary group-hover/item:text-text-primary transition-colors duration-300 whitespace-nowrap">
                                    {name}
                                </span>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
