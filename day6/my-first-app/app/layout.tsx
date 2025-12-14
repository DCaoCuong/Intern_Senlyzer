// Client comp
import './globals.css'
import Search from '@/app/ui/search'
// Server Comp
import { Logo } from '@/app/logo'
import type { Metadata } from 'next'

import { Inter } from 'next/font/google'

import ThemeProvider from './theme-provider'

// Using Google Font - no local files needed
const geist = Inter({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
})

// const myFont = localFont({
//   src: './my-font.woff2',
// })

// const roboto = localFont({
//   src: [
//     {
//       path: './Roboto-Regular.woff2',
//       weight: '400',
//       style: 'normal',
//     },
//     {
//       path: './Roboto-Italic.woff2',
//       weight: '400',
//       style: 'italic',
//     },
//     {
//       path: './Roboto-Bold.woff2',
//       weight: '700',
//       style: 'normal',
//     },
//     {
//       path: './Roboto-BoldItalic.woff2',
//       weight: '700',
//       style: 'italic',
//     },
//   ],
// })

export default function Layout({
  children,
  analytics,
  team,
  notifications,
}: {
  children: React.ReactNode
  analytics?: React.ReactNode
  team?: React.ReactNode
  notifications?: React.ReactNode
}) {
  return (
    <html lang="en" className={geist.className}>
      <body className="bg-background text-foreground antialiased min-h-full flex flex-col">
        <ThemeProvider>
          <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 dark:bg-slate-900/80 dark:border-slate-800/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16 items-center">
                <div className="flex-shrink-0 flex items-center gap-4">
                  <Logo />
                </div>
                <div className="hidden sm:block w-full max-w-md mx-8">
                  <Search />
                </div>
              </div>
            </div>
          </nav>

          <main className="flex-grow">
            {children}

            {/* Parallel Routes Slots - Only render if they exist */}
            {(analytics || team || notifications) && (
              <div className="dashboard-grid max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {analytics && <aside className="analytics-section">{analytics}</aside>}
                {team && <main className="team-section">{team}</main>}
                {notifications && <aside className="notifications-section">{notifications}</aside>}
              </div>
            )}
          </main>

          <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8 mt-12">
            <div className="max-w-7xl mx-auto px-4 text-center text-sm text-slate-500 dark:text-slate-400">
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}