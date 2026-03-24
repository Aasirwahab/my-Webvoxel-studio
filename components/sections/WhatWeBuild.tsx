'use client'

import { useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import RevealOnScroll from '../ui/RevealOnScroll'
import { whatWeBuildSystems } from '@/lib/data'
import {
    Bot,
    TrendingUp,
    LayoutDashboard,
    CalendarCheck,
    Globe,
    BarChart3,
    ShoppingCart,
    Zap
} from 'lucide-react'

// Map string names to lucide-react icons
const iconMap: Record<string, any> = {
    Bot, TrendingUp, LayoutDashboard, CalendarCheck, Globe, BarChart3, ShoppingCart, Zap
}

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
}

const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1] as const,
        },
    },
}

function PremiumCard({ system, index }: { system: any, index: number }) {
    const Icon = iconMap[system.iconName] || Globe
    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        let { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    // Creating a bento grid feel where some items span two columns on large screens
    // Grid pattern works for 3 columns on large, and 2 cols on medium 
    const isLarge = index === 0 || index === 3 || index === 4 || index === 7;
    
    return (
        <motion.div
            variants={cardVariants}
            onMouseMove={handleMouseMove}
            className={`group relative p-8 md:p-10 rounded-[2rem] border border-border bg-bg-primary overflow-hidden flex flex-col justify-between
            ${isLarge ? 'md:col-span-2 lg:col-span-2' : 'col-span-1'}
            will-change-transform`}
            whileHover={{ y: -8, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            style={{
                boxShadow: '0 4px 20px -2px rgba(0,0,0,0.02)'
            }}
        >
            {/* Dynamic Hover Gradient that follows mouse */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            600px circle at ${mouseX}px ${mouseY}px,
                            rgba(5, 150, 105, 0.08),
                            transparent 80%
                        )
                    `,
                }}
            />
            {/* Subtle Border Glow */}
            <motion.div
                className="pointer-events-none absolute inset-0 rounded-[2rem] border transition duration-500 group-hover:border-accent/40"
            />
            
            <div className="relative z-10 flex flex-col h-full pointer-events-none">
                <motion.div 
                    className="w-14 h-14 rounded-2xl bg-bg-secondary flex items-center justify-center mb-8 group-hover:bg-accent/10 transition-colors duration-500 shadow-sm border border-border/50 group-hover:border-accent/20"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                >
                    <Icon className="w-6 h-6 text-text-secondary group-hover:text-accent transition-colors duration-500" />
                </motion.div>
                
                <div className="mt-auto">
                    <h3 className="font-display text-2xl md:text-3xl mb-3 text-text-primary group-hover:text-accent transition-colors duration-500 leading-tight">
                        {system.title}
                    </h3>
                    <p className="text-text-secondary leading-relaxed text-base md:text-lg">
                        {system.shortDesc}
                    </p>
                </div>
            </div>

            {/* Corner accent line for premium detail */}
            <motion.div
                className="absolute top-0 right-0 w-0 h-[3px] bg-accent/80 rounded-bl-sm pointer-events-none"
                initial={{ width: 0 }}
                whileHover={{ width: 80 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
            />
        </motion.div>
    )
}

export default function WhatWeBuild() {
    return (
        <section className="py-24 md:py-32 bg-bg-secondary relative overflow-hidden">
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

            <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
                <RevealOnScroll>
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <motion.span 
                            className="text-accent text-sm font-medium tracking-widest uppercase mb-4 block"
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            Capabilities
                        </motion.span>
                        <h2 className="font-display text-4xl md:text-5xl lg:text-7xl leading-[1.1] mb-6">
                            What we build
                        </h2>
                        <p className="text-text-secondary text-lg md:text-xl leading-relaxed">
                            A curated selection of the systems, workflows, and digital platforms we design and deliver for ambitious businesses.
                        </p>
                    </div>
                </RevealOnScroll>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-10%" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                >
                    {whatWeBuildSystems.map((system, i) => (
                        <PremiumCard key={i} system={system} index={i} />
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
