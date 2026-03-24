import type { Metadata, Viewport } from 'next'
import { inter, instrumentSerif } from '@/lib/fonts'
import ConvexClerkProvider from '@/components/providers/ConvexClerkProvider'
import './globals.css'

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: {
    template: '%s | WebVoxel Studio',
    default: 'AI Systems & Custom Software for UK Businesses | WebVoxel Studio',
  },
  description: 'We build AI receptionists, custom dashboards, and automation for UK businesses. Stop losing leads, cut admin time, and get software that fits how your team works.',
  metadataBase: new URL('https://webvoxelstudio.uk'),
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'WebVoxel Studio',
    title: 'AI Systems & Custom Software for UK Businesses | WebVoxel Studio',
    description: 'We build AI receptionists, custom dashboards, and automation for UK businesses. Stop losing leads, cut admin time, and get software that fits how your team works.',
    url: 'https://webvoxelstudio.uk',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Systems & Custom Software for UK Businesses | WebVoxel Studio',
    description: 'We build AI receptionists, custom dashboards, and automation for UK businesses. Stop losing leads, cut admin time, and get software that fits.',
  },
  alternates: {
    canonical: 'https://webvoxelstudio.uk',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable} bg-bg-primary text-text-primary antialiased`}>
      <body className="min-h-screen flex flex-col font-sans">
        <ConvexClerkProvider>
          {children}
        </ConvexClerkProvider>
      </body>
    </html>
  )
}
