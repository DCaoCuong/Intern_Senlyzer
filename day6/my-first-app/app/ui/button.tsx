'use client'

import { useActionState } from 'react'
import { createPost } from '@/app/actions'
import { LoadingSpinner } from '@/app/ui/loading-spinner'

const initialState = {
  success: false,
  message: ''
}

export default function Button() {
  const [state, formAction, pending] = useActionState(createPost, initialState)

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Tiêu đề</label>
        <input
          name="title"
          placeholder="Nhập tiêu đề..."
          className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
          required
          disabled={pending}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Nội dung</label>
        <textarea
          name="content"
          placeholder="Viết nội dung của bạn..."
          rows={4}
          className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400 p-3"
          required
          disabled={pending}
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm hover:shadow-md disabled:bg-slate-300 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
      >
        {pending ? (
          <>
            <LoadingSpinner />
            <span>Đang xử lý...</span>
          </>
        ) : (
          <>
            <span>Tạo bài viết</span>
          </>
        )}
      </button>

      {state.message && (
        <div className={`p-4 rounded-lg flex items-center gap-3 text-sm font-medium animate-in fade-in slide-in-from-top-1 ${state.success ? 'text-green-700 bg-green-50 border border-green-100' : 'text-red-700 bg-red-50 border border-red-100'}`}>
          <span className="text-xl">{state.success ? 'V' : 'X'}</span>
          {state.message}
        </div>
      )}
    </form>
  )
}