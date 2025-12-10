
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

export async function generateStaticParams() {
  const posts = await fetch('https://.../posts').then((res) => res.json())
 
  // Render the first 10 posts at build time
  return posts.slice(0, 10).map((post) => ({
    slug: post.slug,
  }))
}