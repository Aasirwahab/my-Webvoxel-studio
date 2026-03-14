'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Mail, MapPin, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { Inconsolata } from 'next/font/google'
import MagneticButton from '@/components/ui/MagneticButton'
import RevealOnScroll from '@/components/ui/RevealOnScroll'

const inter = Inconsolata({ subsets: ['latin'], variable: '--font-inter' })

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function ContactContent() {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        company: '',
        budget: '',
        customBudget: '',
        details: ''
    })
    const [status, setStatus] = useState<Status>('idle')
    const [message, setMessage] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('loading')
        setMessage('')

        const finalBudget = formState.budget === 'Other / Custom Budget'
            ? formState.customBudget
            : formState.budget

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formState,
                    budget: finalBudget
                }),
            })

            const data = await res.json()

            if (res.ok) {
                setStatus('success')
                setMessage(data.message || 'Your inquiry has been sent!')
                setFormState({ name: '', email: '', company: '', budget: '', customBudget: '', details: '' })
            } else {
                setStatus('error')
                setMessage(data.error || 'Something went wrong. Please try again.')
            }
        } catch {
            setStatus('error')
            setMessage('Network error. Please check your connection and try again.')
        }
    }

    const inputClasses = `w-full bg-transparent border-b border-border/50 py-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-accent transition-colors duration-300 ${inter.variable} font-sans text-lg disabled:opacity-50 disabled:cursor-not-allowed`
    const isLoading = status === 'loading'

    return (
        <section className="relative w-full pt-32 md:pt-48 pb-24 md:pb-32 bg-bg-primary overflow-hidden min-h-screen">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[50%] h-[50%] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(5,150,105,0.05) 0%, transparent 70%)' }} />

            <div className="max-w-[1400px] mx-auto w-full px-4 md:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row justify-between gap-16 lg:gap-24">

                    {/* LEFT COLUMN: Info */}
                    <div className="w-full lg:w-5/12 flex flex-col justify-start">
                        <RevealOnScroll>
                            <h1 className="font-display text-5xl md:text-7xl lg:text-[6rem] leading-[1.05] tracking-tight mb-8">
                                Let's Build <br />
                                <span className="text-text-secondary">Something</span> <br />
                                <span className="text-accent italic font-light">Extraordinary.</span>
                            </h1>
                            <p className={`text-text-secondary text-lg md:text-xl leading-relaxed mb-16 max-w-md ${inter.variable} font-sans`}>
                                Whether you need a full-scale application ecosystem or a high-converting digital presence, we are ready to ignite your next phase of growth.
                            </p>
                        </RevealOnScroll>

                        <div className="flex flex-col gap-12 mt-auto">
                            <RevealOnScroll delay={0.2} className="flex gap-6 items-start group">
                                <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center shrink-0 group-hover:border-accent transition-colors duration-500">
                                    <Mail className="w-5 h-5 text-text-primary group-hover:text-accent transition-colors duration-500" />
                                </div>
                                <div>
                                    <h3 className={`text-sm uppercase tracking-widest text-text-secondary mb-2 ${inter.variable} font-sans`}>Direct Inquiry</h3>
                                    <a href="mailto:hello@webvoxel.studio" className="text-2xl font-display hover:text-accent transition-colors duration-300">
                                        hello@webvoxel.studio
                                    </a>
                                </div>
                            </RevealOnScroll>

                            <RevealOnScroll delay={0.3} className="flex gap-6 items-start group">
                                <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center shrink-0 group-hover:border-accent transition-colors duration-500">
                                    <MapPin className="w-5 h-5 text-text-primary group-hover:text-accent transition-colors duration-500" />
                                </div>
                                <div>
                                    <h3 className={`text-sm uppercase tracking-widest text-text-secondary mb-2 ${inter.variable} font-sans`}>Location</h3>
                                    <p className="text-2xl font-display">
                                        Globally Distributed.<br />
                                        <span className="text-text-secondary">Borderlessly Connected.</span>
                                    </p>
                                </div>
                            </RevealOnScroll>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Form */}
                    <div className="w-full lg:w-7/12">
                        <RevealOnScroll delay={0.2}>

                            {/* Success State */}
                            <AnimatePresence mode="wait">
                                {status === 'success' ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.5, ease: 'easeOut' }}
                                        className="flex flex-col items-center justify-center text-center gap-6 bg-white shadow-2xl border border-gray-100 p-12 rounded-[2rem] min-h-[500px]"
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                                        >
                                            <CheckCircle className="w-20 h-20 text-green-500" strokeWidth={1.5} />
                                        </motion.div>
                                        <h2 className="font-display text-4xl md:text-5xl tracking-tight">Inquiry Sent!</h2>
                                        <p className={`text-text-secondary text-lg max-w-sm leading-relaxed ${inter.variable} font-sans`}>
                                            Thank you! We've received your message and will get back to you within 24 hours. Check your inbox for a confirmation email.
                                        </p>
                                        <button
                                            onClick={() => setStatus('idle')}
                                            className={`mt-4 text-sm text-text-secondary underline underline-offset-4 hover:text-accent transition-colors ${inter.variable} font-sans`}
                                        >
                                            Send another inquiry
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        onSubmit={handleSubmit}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="flex flex-col gap-8 md:gap-12 bg-white shadow-2xl border border-gray-100 p-8 md:p-12 rounded-[2rem]"
                                    >
                                        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                                            <div className="w-full">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    placeholder="Your Name *"
                                                    required
                                                    disabled={isLoading}
                                                    value={formState.name}
                                                    onChange={handleChange}
                                                    className={inputClasses}
                                                />
                                            </div>
                                            <div className="w-full">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    placeholder="Email Address *"
                                                    required
                                                    disabled={isLoading}
                                                    value={formState.email}
                                                    onChange={handleChange}
                                                    className={inputClasses}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                                            <div className="w-full">
                                                <input
                                                    type="text"
                                                    name="company"
                                                    placeholder="Company Name"
                                                    disabled={isLoading}
                                                    value={formState.company}
                                                    onChange={handleChange}
                                                    className={inputClasses}
                                                />
                                            </div>
                                            <div className="w-full relative">
                                                <select
                                                    name="budget"
                                                    value={formState.budget}
                                                    onChange={handleChange}
                                                    required
                                                    disabled={isLoading}
                                                    aria-label="Estimated Budget"
                                                    className={`${inputClasses} appearance-none bg-transparent cursor-pointer ${formState.budget ? 'text-gray-900' : 'text-gray-400'}`}
                                                >
                                                    <option value="" disabled className="bg-white text-gray-500">Estimated Budget *</option>
                                                    <option value="Under $10k" className="bg-white text-gray-900">Under $10k</option>
                                                    <option value="$10k - $25k" className="bg-white text-gray-900">$10k - $25k</option>
                                                    <option value="$25k - $50k" className="bg-white text-gray-900">$25k - $50k</option>
                                                    <option value="$50k - $100k" className="bg-white text-gray-900">$50k - $100k</option>
                                                    <option value="$100k+" className="bg-white text-gray-900">$100k+</option>
                                                    <option value="Other / Custom Budget" className="bg-white text-gray-900">Other / Custom Budget</option>
                                                </select>

                                                <AnimatePresence>
                                                    {formState.budget === 'Other / Custom Budget' && (
                                                        <motion.div
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: 'auto' }}
                                                            exit={{ opacity: 0, height: 0 }}
                                                            className="overflow-hidden"
                                                        >
                                                            <input
                                                                type="text"
                                                                name="customBudget"
                                                                placeholder="Type your budget here... *"
                                                                required
                                                                disabled={isLoading}
                                                                value={formState.customBudget}
                                                                onChange={handleChange}
                                                                className={`${inputClasses} mt-4`}
                                                            />
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </div>

                                        <div className="w-full">
                                            <textarea
                                                name="details"
                                                placeholder="Tell us about your project, goals, and vision... *"
                                                required
                                                rows={4}
                                                disabled={isLoading}
                                                value={formState.details}
                                                onChange={handleChange}
                                                className={`${inputClasses} resize-none`}
                                            />
                                        </div>

                                        {/* Error message */}
                                        <AnimatePresence>
                                            {status === 'error' && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -8 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -8 }}
                                                    className="flex items-center gap-3 text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3"
                                                >
                                                    <AlertCircle className="w-5 h-5 shrink-0" />
                                                    <p className={`text-sm ${inter.variable} font-sans`}>{message}</p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        <div className="pt-4 flex flex-col-reverse md:flex-row md:justify-between items-start md:items-center gap-6 md:gap-4">
                                            <p className={`text-sm text-text-secondary w-full md:max-w-xs ${inter.variable} font-sans`}>
                                                By submitting, you agree to our privacy policy and terms of service.
                                            </p>
                                            <div className="w-full md:w-auto">
                                                <MagneticButton
                                                    className="w-full md:w-auto flex justify-center"
                                                    type="submit"
                                                    disabled={isLoading}
                                                >
                                                    <span className="flex flex-row items-center gap-2">
                                                        {isLoading ? (
                                                            <>
                                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                                Sending...
                                                            </>
                                                        ) : (
                                                            <>
                                                                Send Inquiry <ArrowRight className="w-4 h-4" />
                                                            </>
                                                        )}
                                                    </span>
                                                </MagneticButton>
                                            </div>
                                        </div>
                                    </motion.form>
                                )}
                            </AnimatePresence>

                        </RevealOnScroll>
                    </div>

                </div>
            </div>
        </section>
    )
}
