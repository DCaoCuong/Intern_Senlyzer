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
      // const content = formData.get('content')
      setMessage(`Successfully created post: "${title}"`)
      // Reset form
      const form = document.querySelector('form') as HTMLFormElement
      form?.reset()
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      console.log(error)
      setMessage('Error creating post')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form action={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Tiêu đề</label>
        <input
          name="title"
          className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
          placeholder="Nhập tiêu đề ..."
          required
          disabled={isLoading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Nội dung</label>
        <textarea
          name="content"
          className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400 p-3"
          placeholder="Nhập nội dung bài viết..."
          rows={4}
          required
          disabled={isLoading}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-4 py-3 bg-rose-500 hover:bg-rose-600 text-white font-medium rounded-lg shadow-sm hover:shadow-md disabled:bg-slate-300 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>chờ xíu, đang tạo ...</span>
          </>
        ) : (
          <>
            <span>Tạo bài đăng</span>
          </>
        )}
      </button>

      {message && (
        <div className={`p-4 rounded-lg flex items-center gap-3 text-sm font-medium animate-in fade-in slide-in-from-top-1 ${message.includes('Success') ? 'text-green-700 bg-green-50 border border-green-100' : 'text-red-700 bg-red-50 border border-red-100'}`}>
          <span className="text-xl">{message.includes('Success') ? 'V ' : 'X '}</span>
          {message}
        </div>
      )}
    </form>
  )
}