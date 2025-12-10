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

export async function generateStaticParams() {
  return [
    { slug: 'bai-viet-1' },
    { slug: 'bai-viet-2' },
  ]
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  
  return (
    <div>
      <h1>Blog Post: {slug}</h1>
      <p>Nội dung bài viết veeeef {slug}</p>
    </div>
  )
}