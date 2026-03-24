/**
 * Shared animation constants for consistent motion across the site.
 *
 * Usage:
 *   import { ease, containerVariants, cardVariants } from '@/lib/animations'
 */

// ─── Easing Curves ───────────────────────────────────────────────
/** Primary easing — smooth deceleration for reveals and entrances */
export const ease = {
    smooth: [0.16, 1, 0.3, 1] as const,
    /** Slightly snappier — for hover transitions and interactive feedback */
    snappy: [0.22, 1, 0.36, 1] as const,
    /** Cinematic — for page transitions and large-scale motion */
    cinematic: [0.76, 0, 0.24, 1] as const,
}

// ─── Reusable Variants ──────────────────────────────────────────

/** Standard stagger container — wraps a group of animated children */
export const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1,
        },
    },
}

/** Standard card/item entrance — fade up with subtle scale */
export const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.96 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.7,
            ease: ease.smooth,
        },
    },
}

/** Lighter variant for smaller items (tags, pills, list items) */
export const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: ease.smooth,
        },
    },
}

/** Fade up only (no scale) — for text blocks and headings */
export const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: ease.smooth,
        },
    },
}

// ─── Shared Hover Config ────────────────────────────────────────

/** Standard card hover — lift + accent border + shadow */
export const cardHover = {
    y: -6,
    borderColor: 'rgba(5, 150, 105, 0.4)',
    boxShadow: '0 20px 40px -12px rgba(0,0,0,0.12)',
}

export const cardHoverTransition = {
    duration: 0.4,
    ease: ease.snappy,
}
