import { Metadata } from 'next'
import NichePageContent from '@/components/sections/solutions/NichePageContent'
import { nichePages } from '@/lib/data'

const data = nichePages['property-teams']

export const metadata: Metadata = {
    title: 'AI Solutions for Property Teams | WebVoxel Studio',
    description: 'Purpose-built AI systems and custom software for estate agencies, property managers, and real estate teams. Faster lead response, automated follow-up, and operational dashboards.',
}

export default function PropertyTeamsPage() {
    return <NichePageContent {...data} />
}
