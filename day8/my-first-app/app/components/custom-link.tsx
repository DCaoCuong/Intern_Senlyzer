'use client'

import Link from 'next/link'
import { useNavigationBlocker } from '../contexts/navigation-blocker'

interface CustomLinkProps extends React.ComponentProps<typeof Link> {
    children: React.ReactNode
}

export function CustomLink({ children, ...props }: CustomLinkProps) {
    const { isBlocked } = useNavigationBlocker()

    return (
        <Link
            onNavigate={(e) => {
                if (
                    isBlocked &&
                    !window.confirm('You have unsaved changes. Leave anyway????')
                ) {
                    e.preventDefault()
                }
            }}
            {...props}
        >
            {children}
        </Link>
    )
}