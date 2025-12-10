import Link from 'next/link'
import { getPosts } from '$@lib/posts'
 
export default async function Post({ post }) {
  const posts = await getPosts()
 
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.slug}>
          {/* <Link href={`/blog/${post.slug}`}>{post.title}</Link> */}
          <Link prefetch={false} href="/blog">
            Blog
          </Link>
        </li>
      ))}
    </ul>
  )
}