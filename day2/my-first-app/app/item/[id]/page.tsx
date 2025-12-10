import { getItem, checkIsAvailable } from '@/app/lib/data'
 
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  // starting loading item data
  preload(id)
  // perform another asynchronous task
  const isAvailable = await checkIsAvailable()
 
  return isAvailable ? <Item id={id} /> : null
}
 
const preload = (id: string) => {
  void getItem(id)
}
 
export async function Item({ id }: { id: string }) {
  const result = await getItem(id)
  
  return (
    <div>
      <h1>Item: {id}</h1>
      {/* Render data từ result */}
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  )
}