import Hero from '@/components/sections/Hero'
import LogoBar from '@/components/sections/LogoBar'
import WhatWeSolve from '@/components/sections/WhatWeSolve'
import Services from '@/components/sections/Services'
import WhoWeHelp from '@/components/sections/WhoWeHelp'
import Outcomes from '@/components/sections/Outcomes'
import FeaturedWork from '@/components/sections/FeaturedWork'
import Stats from '@/components/sections/Stats'
import Testimonials from '@/components/sections/Testimonials'
import WhyWebVoxel from '@/components/sections/WhyWebVoxel'
import WhatWeBuild from '@/components/sections/WhatWeBuild'
import FAQ from '@/components/sections/FAQ'
import CTA from '@/components/sections/CTA'
import JsonLd, { localBusinessSchema, websiteSchema } from '@/components/seo/JsonLd'

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
