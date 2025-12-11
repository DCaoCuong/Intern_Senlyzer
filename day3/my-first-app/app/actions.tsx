'use server'

import { cookies } from 'next/headers'

type FormState = {
  success: boolean
  message: string
}
 
export async function createPost(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    return {
      success: true,
      message: 'Tạo thành công!'
    }
  } catch (error) {
    return {
      success: false,
      message: 'Failed'
    }
  }
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

export async function likePost(postId: string) {
  console.log('Liked post:', postId)
  await new Promise(resolve => setTimeout(resolve, 500))
  return { success: true }
}