import { notFound } from 'next/navigation';
import type { Metadata } from 'next'
import { getPost } from '@/app/lib/data'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const post = await getPost(params.slug)

  if (!post) return { title: 'Not Found' }
  return {
    title: post.title,
    openGraph: {
      title: post.title,
      description: post.description ?? undefined,
      url: `https://localhost:3000/blog/${params.slug}`,
      type: 'article',
      images: [
        {
          url: post.image || '/default-blog-image.jpg',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@Senlyzer',
      creator: `@${post.author || 'Senlyzer'}`,
      title: post.title,
      description: post.description ?? undefined,
      images: [post.image || '/default-blog-image.jpg'],
    },
    description: post.description ?? undefined,
  }
}

export default async function Page(props: Props) {
  const params = await props.params;
  const post = await getPost(params.slug)
  if (!post) return notFound()
  return <div>{post.title}</div>
}