'use client'

import { useState } from 'react'

export default function Search() {
  const [query, setQuery] = useState('')

  return (
    <input
      type="text"
      placeholder="kiếm gì :::..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="px-4 py-2 border rounded w-full"
    />
  )
}