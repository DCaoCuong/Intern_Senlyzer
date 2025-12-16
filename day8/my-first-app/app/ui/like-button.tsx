'use client'

import { useState } from 'react'

export function LikeButton({ postId }: { postId: string }) {
  const [likes, setLikes] = useState(0)
  const [isLiked, setIsLiked] = useState(false)

  const handleClick = () => {
    setIsLiked(!isLiked)
    setLikes(isLiked ? likes - 1 : likes + 1)
  }

  return (
    <button
      onClick={handleClick}
      className={`px-4 py-2 rounded ${
        isLiked ? 'bg-red-500 text-white' : 'bg-gray-200'
      }`}
    >
      {isLiked ? 'A' : 'B'} {likes}
    </button>
  )
}