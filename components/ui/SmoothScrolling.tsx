'use client'

import { ReactLenis, useLenis } from 'lenis/react'
import { ReactNode, useEffect } from 'react'
import { usePathname } from 'next/navigation'

interface SmoothScrollingProps {
    children: ReactNode
}

export default function SmoothScrolling({ children }: SmoothScrollingProps) {
    const pathname = usePathname()
    const lenis = useLenis()

    useEffect(() => {
        if (lenis) {
            lenis.scrollTo(0, { immediate: true })
        }
    }, [pathname, lenis])

    return (
        <ReactLenis root options={{
            duration: 1.2,
            smoothWheel: true,
            wheelMultiplier: 1,
            syncTouch: false,
            infinite: false,
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            autoResize: true,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        }}>
            {children}
        </ReactLenis>
    )
}
