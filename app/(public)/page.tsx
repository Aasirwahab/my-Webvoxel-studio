import dynamic from 'next/dynamic'
import Hero from '@/components/sections/Hero'
import LogoBar from '@/components/sections/LogoBar'
import WhatWeSolve from '@/components/sections/WhatWeSolve'
import Services from '@/components/sections/Services'
import JsonLd, { localBusinessSchema, websiteSchema } from '@/components/seo/JsonLd'

/* Below-fold sections — lazy loaded to reduce initial bundle */
const WhoWeHelp = dynamic(() => import('@/components/sections/WhoWeHelp'))
const Outcomes = dynamic(() => import('@/components/sections/Outcomes'))
const FeaturedWork = dynamic(() => import('@/components/sections/FeaturedWork'))
const Stats = dynamic(() => import('@/components/sections/Stats'))
const Testimonials = dynamic(() => import('@/components/sections/Testimonials'))
const WhyWebVoxel = dynamic(() => import('@/components/sections/WhyWebVoxel'))
const WhatWeBuild = dynamic(() => import('@/components/sections/WhatWeBuild'))
const FAQ = dynamic(() => import('@/components/sections/FAQ'))
const CTA = dynamic(() => import('@/components/sections/CTA'))

export default function Home() {
    return (
        <>
            <JsonLd data={localBusinessSchema} />
            <JsonLd data={websiteSchema} />
            <Hero />
            <LogoBar />
            <WhatWeSolve />
            <Services />
            <WhoWeHelp />
            <Outcomes />
            <FeaturedWork />
            <Stats />
            <Testimonials />
            <WhyWebVoxel />
            <WhatWeBuild />
            <FAQ />
            <CTA />
        </>
    )
}
