'use server'

import { cookies } from 'next/headers'
 
export async function createPost(formData: FormData) {
  const title = formData.get('title')
  const content = formData.get('content')
 
  // Update data
  // Revalidate cache
}

 
export async function exampleAction() {
  const cookieStore = await cookies()
 
  // Get cookie
  cookieStore.get('name')?.value
 
  // Set cookie
  cookieStore.set('name', 'Cuong DC')
 
  // Delete cookie
  cookieStore.delete('name')
}

export async function incrementViews() {
  const cookieStore = await cookies()
  const views = parseInt(cookieStore.get('views')?.value || '0', 10) + 1  
  cookieStore.set('views', views.toString())
  return views
}