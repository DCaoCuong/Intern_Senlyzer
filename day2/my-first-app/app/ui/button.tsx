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
    <form action={formAction} className="space-y-4 p-6 bg-gray-50 rounded-lg border border-gray-200">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Tiêu đề: </label>
        <input 
          name="title" 
          placeholder="Nhập tiêu đề" 
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          required
          disabled={pending}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Nội dung: </label>
        <textarea 
          name="content" 
          placeholder="Nhập nội dung" 
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          required
          disabled={pending}
        />
      </div>

      <button 
        type="submit" 
        disabled={pending}
        className="w-full px-4 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
      >
        {pending ? (
          <>
            <LoadingSpinner />
            <span>Đang xử lý...</span>
          </>
        ) : (
          ' Tạo >>'
        )}
      </button>

      {state.message && (
        <div className={`p-3 rounded text-center font-medium ${state.success ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
          {state.message}
        </div>
      )}
    </form>
  )
}