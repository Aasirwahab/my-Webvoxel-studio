'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import { Send, CheckCircle, Loader2, Clock, MessageSquare, Lightbulb, Shield } from 'lucide-react'

const industries = [
    'Property & Real Estate',
    'Agency (Marketing/Creative/Digital)',
    'Professional Services',
    'Healthcare',
    'Hospitality & Tourism',
    'Retail & Ecommerce',
    'Construction & Trades',
    'Education',
    'Other',
]

const teamSizes = ['Just me', '2–5', '6–20', '21–50', '50+']

const contactMethods = ['Email', 'Phone', 'WhatsApp', 'No preference']

const expectItems = [
    { icon: Clock, text: 'We reply within 24 hours' },
    { icon: MessageSquare, text: 'Short discovery call to understand your workflow' },
    { icon: Lightbulb, text: 'Recommendations on what to build and why' },
    { icon: Shield, text: 'No obligation — just practical advice' },
]

const formFieldVariants = {
    hidden: { opacity: 0, y: 15 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1] as const,
        },
    },
}

const formContainerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.06,
            delayChildren: 0.1,
        },
    },
}

const sidebarVariants = {
    hidden: { opacity: 0, x: 30 },
    show: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1] as const,
            delay: 0.3,
        },
    },
}

const sidebarItemVariants = {
    hidden: { opacity: 0, x: 15 },
    show: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1] as const,
        },
    },
}

const sidebarListVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.2,
        },
    },
}

export default function BookACallContent() {
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        email: '',
        phone: '',
        website: '',
        industry: '',
        teamSize: '',
        helpWith: '',
        bottleneck: '',
        contactMethod: '',
    })
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('sending')

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            if (res.ok) {
                setStatus('success')
                setFormData({ name: '', company: '', email: '', phone: '', website: '', industry: '', teamSize: '', helpWith: '', bottleneck: '', contactMethod: '' })
            } else {
                setStatus('error')
            }
        } catch {
            setStatus('error')
        }
    }

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
                            Get in touch
                        </motion.p>
                        <motion.h1
                            className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight mb-6 max-w-4xl"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, delay: 0.1 }}
                        >
                            Book a Systems Call
                        </motion.h1>
                        <motion.p
                            className="text-xl text-text-secondary max-w-2xl leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const, delay: 0.25 }}
                        >
                            Tell us about your business and what you are looking to improve. We will get back to you within 24 hours with a plan of action.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Form + Sidebar */}
            <section className="pb-24 md:pb-32">
                <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                        {/* Form */}
                        <div className="lg:col-span-2">
                            {status === 'success' ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
                                    className="text-center py-20"
                                >
                                    <motion.div
                                        initial={{ scale: 0, rotate: -180 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                                    >
                                        <CheckCircle className="w-16 h-16 text-accent mx-auto mb-6" />
                                    </motion.div>
                                    <motion.h2
                                        className="font-display text-3xl mb-3"
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.4 }}
                                    >
                                        Thank you!
                                    </motion.h2>
                                    <motion.p
                                        className="text-text-secondary text-lg"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.5 }}
                                    >
                                        We have received your details and will be in touch within 24 hours.
                                    </motion.p>
                                </motion.div>
                            ) : (
                                <motion.form
                                    onSubmit={handleSubmit}
                                    variants={formContainerVariants}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true, margin: "-5%" }}
                                    className="space-y-6"
                                >
                                    <motion.div variants={formFieldVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm text-text-secondary mb-2">Name *</label>
                                            <input
                                                id="name" name="name" type="text" required
                                                value={formData.name} onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-lg bg-bg-secondary border border-border text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
                                                placeholder="Your full name"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="company" className="block text-sm text-text-secondary mb-2">Company</label>
                                            <input
                                                id="company" name="company" type="text"
                                                value={formData.company} onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-lg bg-bg-secondary border border-border text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
                                                placeholder="Company name"
                                            />
                                        </div>
                                    </motion.div>

                                    <motion.div variants={formFieldVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="email" className="block text-sm text-text-secondary mb-2">Email *</label>
                                            <input
                                                id="email" name="email" type="email" required
                                                value={formData.email} onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-lg bg-bg-secondary border border-border text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
                                                placeholder="you@company.com"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="phone" className="block text-sm text-text-secondary mb-2">Phone</label>
                                            <input
                                                id="phone" name="phone" type="tel"
                                                value={formData.phone} onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-lg bg-bg-secondary border border-border text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
                                                placeholder="+44 ..."
                                            />
                                        </div>
                                    </motion.div>

                                    <motion.div variants={formFieldVariants}>
                                        <label htmlFor="website" className="block text-sm text-text-secondary mb-2">Website</label>
                                        <input
                                            id="website" name="website" type="url"
                                            value={formData.website} onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg bg-bg-secondary border border-border text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
                                            placeholder="https://..."
                                        />
                                    </motion.div>

                                    <motion.div variants={formFieldVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="industry" className="block text-sm text-text-secondary mb-2">Industry</label>
                                            <select
                                                id="industry" name="industry"
                                                value={formData.industry} onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-lg bg-bg-secondary border border-border text-text-primary focus:outline-none focus:border-accent transition-colors appearance-none"
                                            >
                                                <option value="">Select industry</option>
                                                {industries.map(ind => (
                                                    <option key={ind} value={ind}>{ind}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="teamSize" className="block text-sm text-text-secondary mb-2">Team size</label>
                                            <select
                                                id="teamSize" name="teamSize"
                                                value={formData.teamSize} onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-lg bg-bg-secondary border border-border text-text-primary focus:outline-none focus:border-accent transition-colors appearance-none"
                                            >
                                                <option value="">Select team size</option>
                                                {teamSizes.map(size => (
                                                    <option key={size} value={size}>{size}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </motion.div>

                                    <motion.div variants={formFieldVariants}>
                                        <label htmlFor="helpWith" className="block text-sm text-text-secondary mb-2">What do you need help with? *</label>
                                        <textarea
                                            id="helpWith" name="helpWith" required rows={4}
                                            value={formData.helpWith} onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg bg-bg-secondary border border-border text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors resize-none"
                                            placeholder="Describe the system, process, or problem you want to solve..."
                                        />
                                    </motion.div>

                                    <motion.div variants={formFieldVariants}>
                                        <label htmlFor="bottleneck" className="block text-sm text-text-secondary mb-2">Biggest bottleneck right now?</label>
                                        <input
                                            id="bottleneck" name="bottleneck" type="text"
                                            value={formData.bottleneck} onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg bg-bg-secondary border border-border text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
                                            placeholder="e.g. missed leads, manual admin, slow response times..."
                                        />
                                    </motion.div>

                                    <motion.div variants={formFieldVariants}>
                                        <label htmlFor="contactMethod" className="block text-sm text-text-secondary mb-2">Preferred contact method</label>
                                        <select
                                            id="contactMethod" name="contactMethod"
                                            value={formData.contactMethod} onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg bg-bg-secondary border border-border text-text-primary focus:outline-none focus:border-accent transition-colors appearance-none"
                                        >
                                            <option value="">Select preference</option>
                                            {contactMethods.map(method => (
                                                <option key={method} value={method}>{method}</option>
                                            ))}
                                        </select>
                                    </motion.div>

                                    <motion.div variants={formFieldVariants}>
                                        <motion.button
                                            type="submit"
                                            disabled={status === 'sending'}
                                            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-bg-primary font-semibold text-base hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.98 }}
                                            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                                        >
                                            {status === 'sending' ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="w-5 h-5" />
                                                    Submit Enquiry
                                                </>
                                            )}
                                        </motion.button>
                                    </motion.div>

                                    {status === 'error' && (
                                        <motion.p
                                            className="text-red-400 text-sm mt-2"
                                            initial={{ opacity: 0, y: -5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                        >
                                            Something went wrong. Please try again or email us directly.
                                        </motion.p>
                                    )}
                                </motion.form>
                            )}
                        </div>

                        {/* Sidebar */}
                        <motion.div
                            className="lg:col-span-1"
                            variants={sidebarVariants}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: "-5%" }}
                        >
                            <div className="sticky top-32 space-y-8">
                                <motion.div
                                    className="group p-6 rounded-2xl border border-border bg-bg-secondary overflow-hidden relative"
                                    whileHover={{
                                        borderColor: 'rgba(var(--color-accent-rgb, 168, 139, 250), 0.3)',
                                    }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                    <h3 className="font-display text-xl mb-4 relative z-10">What to expect</h3>
                                    <motion.ul
                                        className="space-y-3 relative z-10"
                                        variants={sidebarListVariants}
                                        initial="hidden"
                                        whileInView="show"
                                        viewport={{ once: true }}
                                    >
                                        {expectItems.map((item, i) => {
                                            const Icon = item.icon
                                            return (
                                                <motion.li
                                                    key={i}
                                                    variants={sidebarItemVariants}
                                                    className="flex items-start gap-3 text-text-secondary text-sm"
                                                >
                                                    <motion.div
                                                        className="w-6 h-6 rounded-md bg-accent/10 flex items-center justify-center shrink-0 mt-0.5"
                                                        whileHover={{ scale: 1.15, rotate: -5 }}
                                                        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                                                    >
                                                        <Icon className="w-3.5 h-3.5 text-accent" />
                                                    </motion.div>
                                                    {item.text}
                                                </motion.li>
                                            )
                                        })}
                                    </motion.ul>
                                </motion.div>

                                <motion.div
                                    className="group p-6 rounded-2xl border border-border bg-bg-secondary overflow-hidden relative"
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const, delay: 0.5 }}
                                    whileHover={{
                                        borderColor: 'rgba(var(--color-accent-rgb, 168, 139, 250), 0.3)',
                                    }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                    <h3 className="font-display text-xl mb-4 relative z-10">Prefer email?</h3>
                                    <p className="text-text-secondary text-sm mb-3 relative z-10">
                                        Reach us directly at:
                                    </p>
                                    <motion.a
                                        href="mailto:info@webvoxelstudio.uk"
                                        className="text-accent hover:underline text-sm relative z-10 inline-block"
                                        whileHover={{ x: 3 }}
                                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                    >
                                        info@webvoxelstudio.uk
                                    </motion.a>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    )
}
