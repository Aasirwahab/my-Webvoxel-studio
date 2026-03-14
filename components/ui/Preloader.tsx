'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        // Prevent scrolling while loading
        const originalOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'

        // Dynamic progress counter
        let interval: NodeJS.Timeout
        const startLoading = () => {
            let current = 0
            interval = setInterval(() => {
                // Targeted progress for 1.2s duration: ~2.5% every 30ms
                const increment = Math.random() * 3 + 1 // Average increment of 2.5
                current = Math.min(current + increment, 100)

                setProgress(Math.round(current))

                if (current >= 100) {
                    clearInterval(interval)
                    setTimeout(() => {
                        window.scrollTo(0, 0)
                        setIsLoading(false)
                    }, 400) // Slight pause at 100%
                }
            }, 30)
        }

        startLoading()

        return () => {
            if (interval) clearInterval(interval)
        }
    }, [])

    return (
        <AnimatePresence
            mode="wait"
            onExitComplete={() => {
                document.body.style.overflow = ''
            }}
        >
            {isLoading && (
                <motion.div
                    key="preloader"
                    initial={{ y: 0 }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }} // Quicker exit for LCP
                    className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-bg-primary overflow-hidden px-12"
                >
                    {/* Logo and Progress Line in Center */}
                    <div className="flex flex-col items-center">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
                        >
                            <Image
                                src="/webvoxel-logoblack.png"
                                alt="Webvoxel Studio"
                                width={240}
                                height={60}
                                style={{ width: 'auto', height: 'auto' }}
                                className="object-contain"
                                priority
                            />
                        </motion.div>

                        {/* Progress Line back under logo */}
                        <div className="w-32 md:w-48 h-[1px] bg-border/20 mt-8 relative overflow-hidden">
                            <motion.div
                                animate={{ width: `${progress}%` }}
                                transition={{ ease: "easeOut", duration: 0.1 }}
                                className="absolute top-0 left-0 h-full bg-text-primary"
                            />
                        </div>
                    </div>

                    {/* Progress Percentage - Moved to bottom left corner as requested (Step 488) */}
                    <div className="absolute bottom-8 md:bottom-12 left-8 md:left-12 flex flex-col items-start text-text-primary">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <span className="text-6xl md:text-8xl font-display tracking-tighter leading-none block">
                                {progress}%
                            </span>
                        </motion.div>
                    </div>

                    {/* SVG Curve for curtain effect */}
                    <svg className="absolute top-0 w-full h-[calc(100%+300px)] fill-bg-primary pointer-events-none -z-10">
                        <motion.path
                            initial={{ d: "M0 0 L100 0 L100 100 Q50 100 0 100 L0 0" }}
                            exit={{ d: "M0 0 L100 0 L100 100 Q50 85 0 100 L0 0" }}
                            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                        />
                    </svg>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
