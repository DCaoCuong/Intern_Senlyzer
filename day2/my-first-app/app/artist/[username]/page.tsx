export default function Page({ params }: { params: { username: string } }) {
  return <div>Artist: {params.username}</div>;
}