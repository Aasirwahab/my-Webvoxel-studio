interface JsonLdProps {
    data: Record<string, unknown>
}

export default function JsonLd({ data }: JsonLdProps) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    )
}

export const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'WebVoxel Studio',
    description: 'AI-powered systems and custom software for businesses and operational teams across the UK.',
    url: 'https://webvoxelstudio.uk',
    email: 'info@webvoxelstudio.uk',
    telephone: '+447443159478',
    address: {
        '@type': 'PostalAddress',
        addressCountry: 'GB',
    },
    sameAs: [
        'https://www.linkedin.com/company/webvoxelstudio/',
    ],
    priceRange: '$$',
    areaServed: {
        '@type': 'Country',
        name: 'United Kingdom',
    },
}

export const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'WebVoxel Studio',
    url: 'https://webvoxelstudio.uk',
}

export const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'WebVoxel Studio',
    url: 'https://webvoxelstudio.uk',
    logo: 'https://webvoxelstudio.uk/logo.png',
    description: 'AI solutions, automation systems, and custom software for businesses and operational teams.',
    email: 'info@webvoxelstudio.uk',
    telephone: '+447443159478',
    sameAs: [
        'https://www.linkedin.com/company/webvoxelstudio/',
    ],
    address: {
        '@type': 'PostalAddress',
        addressCountry: 'GB',
    },
}

export function serviceSchema(name: string, description: string) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name,
        description,
        provider: {
            '@type': 'Organization',
            name: 'WebVoxel Studio',
            url: 'https://webvoxelstudio.uk',
        },
        areaServed: {
            '@type': 'Country',
            name: 'United Kingdom',
        },
    }
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    }
}
