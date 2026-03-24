'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import RevealOnScroll from '../ui/RevealOnScroll'
import { ChevronDown } from 'lucide-react'

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.98 },
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

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0)
    const faqs = useQuery(api.faqs.list) || []

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <section className="py-24 md:py-40 bg-bg-secondary relative overflow-hidden" id="faq">
            {/* Subtle background pattern — matches other bg-secondary sections */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

            <div className="w-full max-w-[900px] mx-auto px-6 md:px-12 relative z-10">
                <RevealOnScroll>
                    <div className="text-center mb-16 md:mb-24 space-y-4">
                        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-text-primary leading-tight">
                            Got questions?
                        </h2>
                        <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto">
                            Everything you need to know about our process, pricing, and how we work.
                        </p>
                    </div>
                </RevealOnScroll>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-10%" }}
                    className="space-y-4"
                >
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index
                        return (
                            <motion.div key={index} variants={itemVariants}>
                                <div
                                    className={`group transition-all duration-500 rounded-2xl ${isOpen
                                        ? 'bg-bg-elevated/40 border border-accent/20'
                                        : 'bg-transparent border border-border/40 hover:border-accent/30'
                                        }`}
                                >
                                    <button
                                        onClick={() => toggleFAQ(index)}
                                        className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none cursor-pointer"
                                        aria-expanded={isOpen}
                                    >
                                        <h3 className={`text-lg md:text-xl font-display transition-colors duration-300 ${isOpen ? 'text-accent' : 'text-text-primary group-hover:text-accent/80'
                                            }`}>
                                            {faq.question}
                                        </h3>
                                        <div className={`shrink-0 ml-4 transition-transform duration-500 ${isOpen ? 'rotate-180 text-accent' : 'text-text-muted'}`}>
                                            <ChevronDown size={24} strokeWidth={1.5} />
                                        </div>
                                    </button>

                                    <AnimatePresence initial={false}>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                                className="overflow-hidden"
                                            >
                                                <div className="px-6 md:px-8 pb-8 text-text-secondary/90 leading-relaxed md:text-lg font-light border-t border-border/20 pt-6">
                                                    {faq.answer}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        )
                    })}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
                    className="mt-16 text-center"
                >
                    <p className="text-text-muted text-sm">
                        Still have questions? <a href="/book-a-call" className="text-accent border-b border-accent/20 hover:border-accent transition-colors font-medium">Book a call and we&apos;ll get back to you.</a>
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
