import AboutContent from '@/components/sections/about/AboutContent'
import LogoBar from '@/components/sections/LogoBar'
import JsonLd, { organizationSchema } from '@/components/seo/JsonLd'

export const metadata = {
    title: 'About WebVoxel Studio | AI Solutions & Custom Software',
    description: 'Learn how WebVoxel Studio helps businesses improve operations through AI systems, custom software, and workflow automation.',
}

export default function AboutPage() {
    return (
        <>
            <JsonLd data={organizationSchema} />
            <AboutContent />
            <LogoBar />
        </>
    )
}
