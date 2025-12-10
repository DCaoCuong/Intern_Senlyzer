import { notFound } from 'next/navigation';

type Post = {
  slug: string
  title?: string
  content?: string
}

export async function generateStaticParams() {
  return [
    { slug: 'bai-viet-1' },
    { slug: 'bai-viet-2' },
  ];
}

export default function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  if (!slug) return notFound();

  return (
    <div>
      <h1>Blog Post: {slug}</h1>
      <p>Nội dung bài viết về {slug}</p>
    </div>
  );
}