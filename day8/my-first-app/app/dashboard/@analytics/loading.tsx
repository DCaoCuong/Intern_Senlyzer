export default function Loading() {
    return (
        <div className="h-full w-full rounded-lg bg-gray-100 dark:bg-slate-800 animate-pulse p-4">
            <div className="h-8 w-1/3 bg-gray-200 dark:bg-slate-700 rounded mb-4"></div>
            <div className="space-y-3">
                <div className="h-4 w-full bg-gray-200 dark:bg-slate-700 rounded"></div>
                <div className="h-4 w-5/6 bg-gray-200 dark:bg-slate-700 rounded"></div>
                <div className="h-4 w-4/6 bg-gray-200 dark:bg-slate-700 rounded"></div>
            </div>
        </div>
    )
}
