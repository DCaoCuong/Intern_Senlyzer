'use client'
 
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
 
export default function HoverPrefetchLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)

  // Khi hover vào link, prefetch trang trước
  const handleMouseEnter = () => {
    setIsHovered(true)
    router.prefetch(href) // load trước dữ liệu của trang
  }

  return (
    <Link 
      href={href}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
      className={isHovered ? 'text-blue-600' : 'text-blue-500'}
    >
      {children}
    </Link>
  )
}