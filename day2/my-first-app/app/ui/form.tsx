'use client'

import { createPost } from '@/app/actions'
import { useState } from 'react'

export function PostForm() {
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    try {
      // Simulate form submission
      const title = formData.get('title')
      const content = formData.get('content')
      setMessage(`✓ Successfully created post: "${title}"`)
      // Reset form
      const form = document.querySelector('form') as HTMLFormElement
      form?.reset()
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      setMessage('❌ Error creating post')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form action={handleSubmit} className="space-y-4 p-6 bg-gray-50 rounded-lg border border-gray-200">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Tiêu đề: </label>
        <input 
          name="title" 
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Nhập tiêu đề bài viết" 
          required 
          disabled={isLoading}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Nội dung: </label>
        <textarea 
          name="content" 
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Nhập nội dung bài viết" 
          rows={4}
          required 
          disabled={isLoading}
        />
      </div>
      
      <button 
        type="submit"
        disabled={isLoading}
        className="w-full px-4 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? '⏳ Đang tạo...' : '✨ Tạo bài viết'}
      </button>
      
      {message && (
        <p className={`text-center py-2 rounded ${message.includes('✓') ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
          {message}
        </p>
      )}
    </form>
  )
}