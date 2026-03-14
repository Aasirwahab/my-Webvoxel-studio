import { Metadata } from 'next'
import NichePageContent from '@/components/sections/solutions/NichePageContent'
import { nichePages } from '@/lib/data'

const data = nichePages['agencies']

export const metadata: Metadata = {
    title: 'AI Solutions for Agencies | WebVoxel Studio',
    description: 'AI-powered lead handling, workflow automation, and custom internal tools for agencies that want to scale operations without adding headcount.',
}

export default function AgenciesPage() {
    return <NichePageContent {...data} />
}
