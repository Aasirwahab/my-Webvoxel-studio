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
    default: 'AI Solutions & Custom Software for Businesses | WebVoxel Studio',
  },
  description: 'AI-powered systems and custom software for businesses and operational teams. We help you respond faster, reduce manual work, and build smarter workflows.',
  metadataBase: new URL('https://webvoxelstudio.uk'),
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
