import Link from 'next/link'
// Client comp
import Search from '@/app/ui/search'
// Server Comp
import { Logo } from '@/app/logo'

import ThemeProvider from './theme-provider'
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Next.js Learning Hub</title>
        <meta name="description" content="Learning Next.js Data Fetching & Mutations" />
      </head>
      <body className="bg-gray-50">
        <ThemeProvider>
          <nav className="sticky top-0 z-50 bg-white shadow-md">
            <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
              <div className="flex items-center gap-6">
                <Logo />
              </div>
              <div className="w-64">
                <Search />
              </div>
            </div>
          </nav>
          <main>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}