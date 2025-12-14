export const dynamic = 'force-static'

export default function Page({ params }: { params: { slug: string } }) {
  const { slug } = params
  return (
    <main>
      <h1>Changelog: {slug}</h1>
      <p>Chi tiết thay đổi cho {slug}</p>
    </main>
  )
}