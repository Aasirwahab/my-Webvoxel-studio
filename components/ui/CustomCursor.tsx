'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const rafRef = useRef<number>(0)
    const mousePos = useRef({ x: 0, y: 0 })

    const cursorX = useSpring(0, { stiffness: 500, damping: 40, mass: 0.3 })
    const cursorY = useSpring(0, { stiffness: 500, damping: 40, mass: 0.3 })

    useEffect(() => {
        // Only show custom cursor on devices with a fine pointer (no touch)
        const hasPointer = window.matchMedia('(pointer: fine)').matches
        if (!hasPointer) return

        const updateCursor = () => {
            cursorX.set(mousePos.current.x)
            cursorY.set(mousePos.current.y)
            rafRef.current = 0
        }

        const moveCursor = (e: MouseEvent) => {
            mousePos.current.x = e.clientX
            mousePos.current.y = e.clientY
            if (!isVisible) setIsVisible(true)
            // Throttle spring updates to 1 per animation frame
            if (!rafRef.current) {
                rafRef.current = requestAnimationFrame(updateCursor)
            }
        }

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            const isInteractive = target.closest('a, button, [role="button"], input, textarea, select')
            setIsHovering(!!isInteractive)
        }

        window.addEventListener('mousemove', moveCursor, { passive: true })
        window.addEventListener('mouseover', handleMouseOver, { passive: true })

        return () => {
            window.removeEventListener('mousemove', moveCursor)
            window.removeEventListener('mouseover', handleMouseOver)
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isVisible])

    if (!isVisible) return null

    return (
        <motion.div
            className="pointer-events-none fixed top-0 left-0 z-200 hidden md:block"
            style={{ x: cursorX, y: cursorY }}
        >
            <motion.div
                animate={{
                    width: isHovering ? 48 : 8,
                    height: isHovering ? 48 : 8,
                    opacity: isHovering ? 0.15 : 0.5,
                }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="rounded-full bg-accent -translate-x-1/2 -translate-y-1/2"
            />
        </motion.div>
    )
}
