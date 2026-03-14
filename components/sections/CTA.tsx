'use client'

import RevealOnScroll from '../ui/RevealOnScroll'
import MagneticButton from '../ui/MagneticButton'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'

export default function CTA() {
    const companyInfo = useQuery(api.settings.getCompanyInfo)

    return (
        <section className="relative py-32 md:py-40 overflow-hidden">
            {/* Subtle atmosphere */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] bg-accent/3 blur-[150px] rounded-full pointer-events-none" />

            <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center text-center">
                <RevealOnScroll>
                    <h2 className="font-display text-5xl md:text-7xl lg:text-[6.5rem] leading-[1.05] tracking-tight mb-8 max-w-5xl">
                        Need a system that fits how your business actually works?
                    </h2>
                </RevealOnScroll>

                <RevealOnScroll delay={0.1}>
                    <p className="text-xl md:text-2xl text-text-secondary max-w-xl mb-14">
                        We help businesses turn slow, manual, fragmented workflows into faster, more reliable systems.
                    </p>
                </RevealOnScroll>

                <RevealOnScroll delay={0.2} className="flex flex-col items-center gap-8">
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <MagneticButton href="/book-a-call" variant="primary">
                            Book a Systems Call
                        </MagneticButton>
                        <MagneticButton href="/solutions" variant="ghost">
                            Explore Solutions →
                        </MagneticButton>
                    </div>

                    {companyInfo && (companyInfo.email || companyInfo.phone) && (
                        <div className="flex items-center gap-6 text-text-muted text-sm">
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
                        </div>
                    )}
                </RevealOnScroll>
            </div>
        </section>
    )
}
