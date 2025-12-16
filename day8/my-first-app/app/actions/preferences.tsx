'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { db } from '@/app/lib/db';
import { preferences } from '@/app/lib/schema';
import { eq } from 'drizzle-orm';

export async function updateUserPreferences(
    theme: string,
    language: string
) {
    try {
        const cookieStore = await cookies();

        // Lấy userId từ cook
        let userId = cookieStore.get('userId')?.value;
        if (!userId) {
            userId = `user_${Date.now()}`;
            (await cookies()).set('userId', userId, {
                maxAge: 60 * 60 * 24 * 365,
                secure: process.env.NODE_ENV === 'production',
                httpOnly: true,
            });
        }


        // Kiểm tra xem user đã có preferences chưa
        const existing = await db
            .select()
            .from(preferences)
            .where(eq(preferences.userId, userId));

        let result;
        if (existing.length > 0) {
            result = await db
                .update(preferences)
                .set({ theme, language, updatedAt: new Date() })
                .where(eq(preferences.userId, userId))
                .returning();
        } else {
            result = await db
                .insert(preferences)
                .values({ userId, theme, language })
                .returning();
        }

        // Ghi theme vào cookie
        cookieStore.set('theme', theme, {
            secure: process.env.NODE_ENV === 'production',
        });

        revalidatePath('/preferences');      // Revalidate /preferences page
        revalidateTag('user-preferences', 'default');   // Revalidate cho cac data dùng tag ni

        return {
            success: true,
            message: 'Preferences updated successfully',
            preferences: result[0],
        };
    } catch (error) {
        console.error('Error updating preferences:', error);
        return {
            success: false,
            message: 'Failed to update preferences',
        };
    }
}