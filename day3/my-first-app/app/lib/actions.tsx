'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { refresh } from 'next/cache'

export async function createPost(formData: FormData) {
  'use server'
  const title = formData.get('title')
  const content = formData.get('content')
 
  // Update data
  
  revalidatePath('/posts')
  redirect('/posts')
}
 
export async function deletePost(formData: FormData) {
  'use server'
  const id = formData.get('id')
 
  // Update data
  // Revalidate cache
}

export async function updatePost(formData: FormData) {
  // Update data
  // ...
 
  refresh()
}