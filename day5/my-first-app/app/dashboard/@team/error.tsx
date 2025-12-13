'use client'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <div className="card bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
            <h2 className="text-red-600 dark:text-red-400 font-semibold mb-2">⚠️ Team Error</h2>
            <p className="text-sm text-red-700 dark:text-red-300 mb-4">
                {error.message || 'Something went wrong loading team data!'}
            </p>
            <button
                onClick={() => reset()}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
                Try again
            </button>
        </div>
    )
}
