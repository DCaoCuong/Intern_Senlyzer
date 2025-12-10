import Modal from './ui/modal'
// import Cart from './ui/cart'
import { Carousel } from './carousel'

// export default function Page() {
//   // return (
//   //   <Modal>
//   //     <Cart />
//   //   </Modal>
//   // )
//   return (
//     <div>
//       <p>View the picture</p>
//       <Carousel />
//     </div>
//   )
// }

import Button from './ui/button'
import { PostForm } from './ui/form'
import ViewCount from './view-count'
import Link from 'next/link'

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Learn NextJS nàooo</h1>
          <p className="text-gray-600">Data Fetching & Mutations Practice</p>
        </div>

        {/* Navigation Links */}
        <div className="mb-12 p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">** Navigation</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/blog" className="p-3 bg-blue-50 hover:bg-blue-100 rounded text-center font-medium text-blue-600 transition">
              Blog Posts
            </Link>
            <Link href="/dashboard" className="p-3 bg-green-50 hover:bg-green-100 rounded text-center font-medium text-green-600 transition">
              Dashboard
            </Link>
            <Link href="/item/1" className="p-3 bg-purple-50 hover:bg-purple-100 rounded text-center font-medium text-purple-600 transition">
              Item Detail
            </Link>
            <Link href="/artist/john" className="p-3 bg-pink-50 hover:bg-pink-100 rounded text-center font-medium text-pink-600 transition">
              Artist Profile
            </Link>
          </div>
        </div>

        {/* View Count Section */}
        <div className="mb-12 p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">* View Counter (useTransition + Server Action)</h2>
          <ViewCount initialViews={0} />
          <p className="text-sm text-gray-500 mt-2">Counter increments automatically on page load using Server Actions</p>
        </div>

        {/* Form Section - useActionState */}
        <div className="mb-12 p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">* Create Post (useActionState)</h2>
          <p className="text-sm text-gray-600 mb-4">This form uses useActionState hook for better UX</p>
          <Button />
        </div>

        {/* Form Section - useState */}
        <div className="mb-12 p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">* Create Post (useState)</h2>
          <p className="text-sm text-gray-600 mb-4">This form uses simple useState for state management</p>
          <PostForm />
        </div>
      </div>
    </main>
  )
}