import Link from 'next/link'
// Client comp
import Search from '@/app/ui/search'
// Server Comp
import Logo from './logo'

import ThemeProvider from './theme-provider'
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <nav>
          <Logo />
          <Search />
           <ThemeProvider>{children}</ThemeProvider>
        </nav>
        {children}
      </body>
    </html>
  )
}