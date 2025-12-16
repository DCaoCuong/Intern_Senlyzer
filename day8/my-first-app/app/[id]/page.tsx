import { LikeButton } from '@/app/ui/like-button'
import { getPost } from '@/app/lib/data'
 
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const post = await getPost(id)
 
  return <LikeButton postId={id} />
}