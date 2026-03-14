'use client'

import { useRef, useCallback, type MouseEvent, type ReactNode } from 'react'

interface TiltCardProps {
    children: ReactNode
    className?: string
    tiltMax?: number        // max tilt in degrees
    scaleOnHover?: number   // scale multiplier on hover
    perspective?: number    // CSS perspective value
}

export default function TiltCard({
    children,
    className = '',
    tiltMax = 8,
    scaleOnHover = 1.02,
    perspective = 1000,
}: TiltCardProps) {
    const cardRef = useRef<HTMLDivElement>(null)
    const rafRef = useRef<number>(0)

    const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return

        // Throttle to 1 update per animation frame
        if (rafRef.current) return

        const clientX = e.clientX
        const clientY = e.clientY

        rafRef.current = requestAnimationFrame(() => {
            if (!cardRef.current) { rafRef.current = 0; return }
            const rect = cardRef.current.getBoundingClientRect()
            const x = (clientX - rect.left) / rect.width - 0.5
            const y = (clientY - rect.top) / rect.height - 0.5
            const rotateX = -y * tiltMax
            const rotateY = x * tiltMax

            // Set CSS custom properties directly — bypasses React render cycle
            cardRef.current.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scaleOnHover},${scaleOnHover},${scaleOnHover})`
            cardRef.current.style.transition = 'transform 0.1s ease-out'
            rafRef.current = 0
        })
    }, [tiltMax, scaleOnHover, perspective])

    const handleMouseLeave = useCallback(() => {
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current)
            rafRef.current = 0
        }
        if (!cardRef.current) return
        cardRef.current.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`
        cardRef.current.style.transition = 'transform 0.6s cubic-bezier(0.03,0.98,0.52,0.99)'
    }, [perspective])

    return (
        <div
            ref={cardRef}
            className={className}
            style={{
                transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`,
                transition: 'transform 0.6s cubic-bezier(0.03,0.98,0.52,0.99)',
                willChange: 'transform',
                transformStyle: 'preserve-3d',
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </div>
    )
}
