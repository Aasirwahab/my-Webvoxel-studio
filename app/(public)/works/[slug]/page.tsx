'use client'

import { notFound, useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { motion } from 'framer-motion'
import MagneticButton from '@/components/ui/MagneticButton'
import RevealOnScroll from '@/components/ui/RevealOnScroll'

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1] as const,
        },
    },
}

const staggerContainer = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
}

const tagVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    show: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1] as const,
        },
    },
}

export default function CaseStudyPage() {
    const params = useParams()
    const slug = params.slug as string

    const projects = useQuery(api.projects.listPublished)

    if (projects === undefined) {
        return <main className="min-h-screen bg-bg-primary pt-24 md:pt-32 pb-24"></main>
    }

    const project = projects.find((p: any) => p.slug === slug && p.isPublished)

    if (!project) {
        notFound()
    }

    return (
        <main className="min-h-screen bg-bg-primary pt-24 md:pt-32 pb-24">
            <div className="w-full max-w-[1200px] mx-auto px-6 md:px-12">

                {/* Back button */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
                    className="mb-12"
                >
                    <Link href="/works" className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors text-sm font-medium">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="rotate-180">
                            <path d="M1 7h12M13 7l-6-6M13 7l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Back to all projects
                    </Link>
                </motion.div>

                {/* Header */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="show"
                    className="flex flex-col xl:flex-row xl:items-end justify-between gap-8 mb-16"
                >
                    <div className="max-w-2xl">
                        <motion.p variants={fadeUp} className="text-sm font-semibold tracking-widest text-accent uppercase mb-4">{project.category}</motion.p>
                        <motion.h1 variants={fadeUp} className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-6 text-text-primary">
                            {project.title}
                        </motion.h1>
                        <motion.p variants={fadeUp} className="text-xl text-text-secondary leading-relaxed">
                            {project.description || "A look at what the client needed, what we built, and how it helped their business."}
                        </motion.p>
                    </div>
                    {project.url !== "#" && (
                        <motion.div variants={fadeUp} className="shrink-0 flex items-end">
                            <a href={project.url} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 text-bg-primary bg-text-primary hover:bg-accent hover:text-white px-6 py-3.5 rounded-full transition-all duration-300 font-medium">
                                Visit Live Website
                                <svg width="10" height="10" viewBox="0 0 14 14" fill="none" className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform ml-1 border-b border-transparent">
                                    <path d="M1 13L13 1M13 1H3M13 1V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>
                        </motion.div>
                    )}
                </motion.div>

                {/* Meta details */}
                <RevealOnScroll>
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-border mb-16"
                    >
                        <motion.div variants={fadeUp}>
                            <p className="text-sm text-text-muted uppercase mb-1 font-medium">Client</p>
                            <p className="text-text-primary font-medium">{project.title}</p>
                        </motion.div>
                        <motion.div variants={fadeUp}>
                            <p className="text-sm text-text-muted uppercase mb-1 font-medium">Year</p>
                            <p className="text-text-primary font-medium">{project.year}</p>
                        </motion.div>
                        <motion.div variants={fadeUp} className="col-span-2 md:col-span-2">
                            <p className="text-sm text-text-muted uppercase mb-2 font-medium">Technologies</p>
                            <motion.div
                                variants={staggerContainer}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                                className="flex flex-wrap gap-2"
                            >
                                {project.tags.map((tag: any) => (
                                    <motion.span key={tag} variants={tagVariants} className="text-xs px-3 py-1 rounded-full border border-border text-text-secondary">
                                        {tag}
                                    </motion.span>
                                ))}
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </RevealOnScroll>

                {/* Hero Image */}
                <motion.div
                    initial={{ opacity: 0, y: 60, scale: 0.97 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as const }}
                    className="w-full aspect-video rounded-2xl overflow-hidden relative mb-24 border border-border shadow-md"
                >
                    <Image
                        src={project.image}
                        alt={`Case Study: ${project.title}`}
                        fill
                        className="object-cover"
                        priority
                    />
                </motion.div>

                {/* The Story */}
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 xl:gap-24">
                    <div className="xl:col-span-4">
                        <RevealOnScroll>
                            <h2 className="font-display text-3xl text-text-primary xl:sticky xl:top-24">
                                The Challenge &<br />Our Approach
                            </h2>
                        </RevealOnScroll>
                    </div>
                    <div className="xl:col-span-8 flex flex-col gap-10 text-lg text-text-secondary leading-relaxed font-sans">
                        <RevealOnScroll>
                            <p>
                                When <strong>{project.title}</strong> came to us, their website was not doing their business justice. Customers could not find what they needed, the site felt outdated, and it was not bringing in the leads or bookings they expected. They needed something that looked professional, worked fast, and actually helped the business grow.
                            </p>
                        </RevealOnScroll>
                        <RevealOnScroll delay={0.1}>
                            <p>
                                We started by understanding how their customers use the site and where people were dropping off. Instead of just giving it a fresh coat of paint, we rebuilt it from the ground up — new structure, new tech, and a design that guides visitors toward getting in touch or making a purchase.
                            </p>
                        </RevealOnScroll>
                        <RevealOnScroll delay={0.15}>
                            <div className="bg-bg-elevated/50 p-8 rounded-xl border border-border mt-4">
                                <h3 className="font-display text-2xl text-text-primary mb-4">What We Delivered</h3>
                                <ul className="list-disc pl-5 space-y-2 text-base">
                                    <li>A complete redesign focused on turning visitors into customers.</li>
                                    <li>A modern, fast-loading site built on the latest web technology.</li>
                                    <li>A consistent design system that keeps the brand looking sharp everywhere.</li>
                                    <li>Clear, persuasive copy written around what the business actually does.</li>
                                </ul>
                            </div>
                        </RevealOnScroll>
                        <RevealOnScroll delay={0.1}>
                            <p>
                                We tested and refined the design with real feedback, making sure every page serves a purpose. The final result is a site that looks the part, loads fast, and makes it easy for customers to take the next step — whether that is booking a call, making a purchase, or getting in touch.
                            </p>
                        </RevealOnScroll>
                    </div>
                </div>

                {/* Let's Talk CTA */}
                <RevealOnScroll>
                    <div className="mt-32 pt-20 border-t border-border flex flex-col items-center text-center">
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
                            className="font-display text-4xl md:text-5xl lg:text-6xl text-text-primary mb-6"
                        >
                            Want something like this for your business?
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
                            className="text-xl text-text-secondary max-w-xl mb-10"
                        >
                            Tell us what your business needs and we will show you how we would build it.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
                        >
                            <MagneticButton href="/book-a-call" variant="primary">
                                Book a Systems Call →
                            </MagneticButton>
                        </motion.div>
                    </div>
                </RevealOnScroll>
            </div>
        </main>
    )
}
