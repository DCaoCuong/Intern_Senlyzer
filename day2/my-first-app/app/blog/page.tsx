//1. Server component
//with the fetch API 
// export default async function Page() {
//   const data = await fetch('https://api.vercel.app/blog')
//   const posts = await data.json()
//   return (
//     <ul>
//       {posts.map((post) => (
//         <li key={post.id}>{post.title}</li>
//       ))}
//     </ul>
//   )
// }

//with an ORM or database 
// import { db, posts } from '@/lib/db'
 
// export default async function Page() {
//   const allPosts = await db.select().from(posts)
//   return (
//     <ul>
//       {allPosts.map((post) => (
//         <li key={post.id}>{post.title}</li>
//       ))}
//     </ul>
//   )
// }

//2. Client component
// Streaming data with the use hook
// import Post from '@/app/ui/posts'
// import { Suspense } from 'react'
// // import { getPosts } from '$@lib/posts'

// export default function Page() {
//   // Don't await the data fetching function
//   const post = getPosts()
 
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <Post posts={post} />
//     </Suspense>
//   )
// }

// Community libraries, such as SWR, React Query
// 'use client'
// import { Suspense } from 'react'
// import useSWR from 'swr'
// import Loading from './loading'
 
// const fetcher = (url) => fetch(url).then((r) => r.json())
 
// export default function BlogPage() {
//   const { data, error, isLoading } = useSWR(
//     'https://api.vercel.app/blog',
//     fetcher
//   )
 
//   if (isLoading) return <div>Loading...</div>
//   if (error) return <div>Error: {error.message}</div>
 
//   return (
//     <ul>
//       {data.map((post: { id: string; title: string }) => (
//         <li key={post.id}>{post.title}</li>
//       ))}
//     </ul>
//   )
// }

// - Streaming
import { Suspense } from 'react'
import BlogList from '@/components/BlogList'
import BlogListSkeleton from '@/components/BlogListSkeleton'
 
export default function BlogPage() {
  return (
    <div>
      {/* This content will be sent to the client immediately */}
      <header>
        <h1>Welcome to the Blog</h1>
        <p>Read the latest posts below.</p>
      </header>
      <main>
        {/* If there's any dynamic content inside this boundary, it will be streamed in */}
        <Suspense fallback={<BlogListSkeleton />}>
          <BlogList />
        </Suspense>
      </main>
    </div>
  )
}
