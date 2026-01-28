'use client'

import { ReactNode } from 'react'

interface GradientBackgroundProps {
    children: ReactNode
    className?: string
}

export default function GradientBackground({ children, className = '' }: GradientBackgroundProps) {
    return (
        <div className={`min-h-screen gradient-vibrant gradient-animate ${className}`}>
            {children}
        </div>
    )
}
