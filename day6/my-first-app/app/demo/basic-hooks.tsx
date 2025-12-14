'use client'

import { usePathname, useSearchParams, useParams } from 'next/navigation'

export default function BasicHooksDemo() {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const params = useParams()
    return (
        <div className="p-4 space-y-2">
            <h2 className="text-xl font-bold">Hooks Debug Panel</h2>
            <p><strong>Pathname:</strong> {pathname}</p>
            <p><strong>Search Params:</strong> {searchParams.toString()}</p>
            <p><strong>Params:</strong> {JSON.stringify(params)}</p>
        </div>
    )
}