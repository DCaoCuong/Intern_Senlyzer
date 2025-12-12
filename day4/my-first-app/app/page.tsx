import Image from 'next/image'
import Button from './ui/button'
import { PostForm } from './ui/form'
import ViewCount from './view-count'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Trang Chủ',
  description: 'Khám phá các tính năng của Next.js: Server Actions, Forms, Data Fetching và nhiều hơn nữa',
  keywords: ['Next.js', 'React', 'Server Actions', 'Forms', 'Tutorial'],
  openGraph: {
    title: 'Trang Chủ - Senlyzer',
    description: 'Học Next.js với các ví dụ thực tế nàooo',
  }
}

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-slate-900 dark:to-slate-800 opacity-50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
              Learninggg <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Next.js</span> nàooooooooo
            </h1>
          </div>

          <div className="mt-10 rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 max-w-4xl">
            <Image
              src="/hackathon.jpg"
              alt="Hackathon Event"
              width={1200}
              height={675}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="group relative bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Navigation</h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link href="/blog" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50 transition-colors font-medium">
                    Blog Posts
                  </Link>
                  <Link href="/dashboard" className="inline-flex items-center px-4 py-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-300 dark:hover:bg-emerald-900/50 transition-colors font-medium">
                    Dashboard
                  </Link>
                  <Link href="/item/1" className="inline-flex items-center px-4 py-2 rounded-lg bg-violet-50 text-violet-700 hover:bg-violet-100 dark:bg-violet-900/30 dark:text-violet-300 dark:hover:bg-violet-900/50 transition-colors font-medium">
                    Item Detail
                  </Link>
                  <Link href="/artist/drake" className="inline-flex items-center px-4 py-2 rounded-lg bg-pink-50 text-pink-700 hover:bg-pink-100 dark:bg-pink-900/30 dark:text-pink-300 dark:hover:bg-pink-900/50 transition-colors font-medium">
                    Artist Profile
                  </Link>
                </div>
              </div>
            </div>

            <div className="group relative bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-500" />
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Real-time Actions</h2>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-6">
                  <div className="mb-4">
                    <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">Server Action View Counter</span>
                  </div>
                  <ViewCount initialViews={0} />
                </div>
                <p className="text-sm text-slate-500 mt-4 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Updated automatically each load
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* useActionState Form */}
            <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 sm:p-8 hover:border-indigo-200 transition-colors">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-8 w-1 bg-indigo-500 rounded-full" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Smart Form</h3>
              </div>
              <Button />
            </div>

            {/* useState Form */}
            <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 sm:p-8 hover:border-indigo-200 transition-colors">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-8 w-1 bg-rose-500 rounded-full" />
                <h3>Classic Form</h3>
              </div>
              <PostForm />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}