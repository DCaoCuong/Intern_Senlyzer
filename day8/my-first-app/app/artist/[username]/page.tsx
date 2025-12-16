import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Artist Profile',
  description: 'Xem thông tin chi tiết về nghệ sĩ',
}

export default function Page({ params }: { params: { username: string } }) {
  return <div>Artist: {params.username}</div>;
}