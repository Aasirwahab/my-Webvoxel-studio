import { Metadata } from 'next'
import NichePageContent from '@/components/sections/solutions/NichePageContent'
import { nichePages } from '@/lib/data'

const data = nichePages['service-businesses']

export const metadata: Metadata = {
    title: 'AI Solutions for Service Businesses | WebVoxel Studio',
    description: 'Reduce admin, improve client response times, and streamline scheduling with AI systems and custom software built for service businesses.',
}

export default function ServiceBusinessesPage() {
    return <NichePageContent {...data} />
}
