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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-gray-900">Learn NextJS nàoooo</h1>
          <p className="text-gray-600 mt-2">Data Fetching & Mutations Practice</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Navigation */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">** Navigation</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/blog" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Blog Posts
            </Link>
            <Link href="/dashboard" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              Dashboard
            </Link>
            <Link href="/item/1" className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
              Item Detail
            </Link>
            <Link href="/artist/drake" className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition">
              Artist Profile
            </Link>
          </div>
        </section>

        {/* View Counter */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">* View Counter (useTransition + Server Action)</h2>
          <ViewCount initialViews={0}/>
          <p className="text-sm text-gray-500 mt-2">Counter increments automatically on page load using Server Actions</p>
        </section>

        {/* Forms */}
        <div className="grid md:grid-cols-2 gap-6">
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">* Create Post (useActionState)</h2>
            <p className="text-sm text-gray-600 mb-4">This form uses useActionState hook for better UX</p>
            <Button />
          </section>

          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">* Create Post (useState)</h2>
            <p className="text-sm text-gray-600 mb-4">This form uses simple useState for state management</p>
            <PostForm />
          </section>
        </div>
      </main>
    </div>
  )
}