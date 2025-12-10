
// export async function generateStaticParams() {
//   const posts = await fetch('https://.../posts').then((res) => res.json())
 
//   return posts.map((post) => ({
//     slug: post.slug,
//   }))
// }
 
// export default async function Page({
//   params,
// }: {
//   params: Promise<{ slug: string }>
// }) {
//   const { slug } = await params
//   // ...
// }

// export async function generateStaticParams() {
//   const posts = await fetch('https://.../posts').then((res) => res.json())
 
//   return posts.map((post) => ({
//     slug: post.slug,
//   }))
// }
type Post = {
  slug: string
  title?: string
  content?: string
}


export async function generateStaticParams() {
  const posts: Post[] = await fetch('https://.../posts').then((res) => res.json())
  
  //render trước 10 poster khi có request đã
  return posts.slice(0, 10).map((post: Post) => ({
    slug: post.slug,
  }))
}