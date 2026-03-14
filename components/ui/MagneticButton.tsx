'use client'

import { useRef, useState, useCallback, ReactNode, MouseEvent } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface MagneticButtonProps {
    children: ReactNode;
    href?: string;
    className?: string;
    variant?: 'primary' | 'outline' | 'ghost';
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
}

export default function MagneticButton({
    children,
    href,
    className = '',
    variant = 'primary',
    onClick,
    type = 'button',
    disabled = false,
}: MagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null)
    const rafRef = useRef<number>(0)
    const [position, setPosition] = useState({ x: 0, y: 0 })

    const handleMouse = useCallback((e: MouseEvent<HTMLDivElement>) => {
        if (disabled) return
        if (rafRef.current) return

        const clientX = e.clientX
        const clientY = e.clientY

        rafRef.current = requestAnimationFrame(() => {
            if (!ref.current) { rafRef.current = 0; return }
            const { height, width, left, top } = ref.current.getBoundingClientRect()
            const middleX = clientX - (left + width / 2)
            const middleY = clientY - (top + height / 2)
            setPosition({ x: middleX * 0.2, y: middleY * 0.2 })
            rafRef.current = 0
        })
    }, [disabled])

    const reset = useCallback(() => {
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current)
            rafRef.current = 0
        }
        setPosition({ x: 0, y: 0 })
    }, [])

    const baseStyles = "relative inline-flex items-center justify-center px-8 py-4 overflow-hidden rounded-full font-medium transition-colors duration-300 pointer-events-none"

    const variants = {
        primary: "bg-accent text-white hover:bg-accent-hover",
        outline: "border border-border-light text-text-primary hover:bg-bg-elevated",
        ghost: "text-text-primary hover:text-accent"
    }

    const inner = (
        <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x: position.x, y: position.y }}
            whileTap={disabled ? {} : { scale: 0.95 }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={`relative inline-block ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'} ${className}`}
        >
            <div className={`${baseStyles} ${variants[variant]} ${className ? className : ''}`}>
                {children}
            </div>
            <div className="absolute -inset-4 z-[-1]" />
        </motion.div>
    )

    if (href) {
        return <Link href={href}>{inner}</Link>
    }

    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className="inline-block bg-transparent border-0 p-0 m-0"
        >
            {inner}
        </button>
    )
}
