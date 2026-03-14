import SolutionsContent from '@/components/sections/solutions/SolutionsContent'
import JsonLd, { serviceSchema } from '@/components/seo/JsonLd'

export const metadata = {
    title: 'Solutions | AI Systems, Automation & Custom Software | WebVoxel Studio',
    description: 'Explore WebVoxel Studio solutions including AI reception systems, custom software, dashboards, workflow automation, and operational tools for businesses.',
}

export default function SolutionsPage() {
    return (
        <>
            <JsonLd data={serviceSchema('AI Reception & Automation', 'AI assistants and front-line systems that capture enquiries, qualify leads, and handle routine communication.')} />
            <JsonLd data={serviceSchema('Custom Software Development', 'Bespoke internal tools, dashboards, portals, and business software built around your workflow.')} />
            <JsonLd data={serviceSchema('Workflow Automation', 'Systems that connect your existing tools and automate repetitive operational tasks.')} />
            <SolutionsContent />
        </>
    )
}
