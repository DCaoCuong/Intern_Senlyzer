import { notFound } from 'next/navigation';
import type { Metadata } from 'next'
import { getPost } from '@/app/lib/data'

type Props = {
    params: Promise<{ slug: string[] }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;

    const actualSlug = params.slug.length === 1 ? params.slug[0] : params.slug[1];
    const category = params.slug.length === 2 ? params.slug[0] : null;

    const post = await getPost(actualSlug)

    if (!post) return { title: 'Not Found' }

    return {
        title: post.title,
        openGraph: {
            title: post.title,
            description: post.description ?? undefined,
            url: `https://localhost:3000/blog/${params.slug.join('/')}`,
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

    const actualSlug = params.slug.length === 1 ? params.slug[0] : params.slug[1];
    const category = params.slug.length === 2 ? params.slug[0] : null;

    if (params.slug.length > 2) {
        return notFound();
    }

    const post = await getPost(actualSlug);

    if (!post) return notFound();

    return (
        <article className="max-w-4xl mx-auto p-6">
            {category && (
                <div className="text-sm text-gray-500 mb-2 uppercase tracking-wide">
                    Category: {category}
                </div>
            )}

            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

            {post.description && (
                <p className="text-xl text-gray-600 mb-6">{post.description}</p>
            )}

            {post.image && (
                <img
                    src={post.image}
                    alt={post.title}
                    className="w-full rounded-lg mb-6"
                />
            )}

            <div className="prose max-w-none">
                {post.content || 'Nội dung bài viết...'}
            </div>

            <div className="mt-8 p-4 bg-gray-100 rounded text-sm">
                <strong>TEST Info:</strong>
                <ul>
                    <li>Full slug array: {JSON.stringify(params.slug)}</li>
                    <li>Actual slug: {actualSlug}</li>
                    <li>Category: {category || 'None'}</li>
                    <li>Route type: {params.slug.length === 1 ? 'Simple (/blog/[slug])' : 'Nested (/blog/[category]/[slug])'}</li>
                </ul>
            </div>
        </article>
    );
}
