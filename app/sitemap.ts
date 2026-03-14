import { MetadataRoute } from 'next'

const BASE_URL = 'https://webvoxelstudio.uk'

export default function sitemap(): MetadataRoute.Sitemap {
    const staticRoutes = [
        '',
        '/solutions',
        '/solutions/property-teams',
        '/solutions/agencies',
        '/solutions/service-businesses',
        '/works',
        '/about',
        '/book-a-call',
    ]

    return staticRoutes.map(route => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : route === '/solutions' ? 0.9 : 0.7,
    }))
}
