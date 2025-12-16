import { headers, cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { db } from '@/app/lib/db';
import { preferences } from '@/app/lib/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: Request) {
    try {
        const headersList = await headers();
        const authorization = headersList.get('authorization');

        // Demo: Kiểm tra auth
        if (!authorization) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const cookieStore = await cookies();
        const userId = cookieStore.get('userId')?.value || 'guest';

        // Lấy preferences từ db
        const userPrefs = await db
            .select()
            .from(preferences)
            .where(eq(preferences.userId, userId));

        return NextResponse.json({ preferences: userPrefs[0] || null });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch preferences' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const cookieStore = await cookies();

        let userId = cookieStore.get('userId')?.value;
        if (!userId) {
            userId = `user_${Date.now()}`;
            cookieStore.set('userId', userId, {
                maxAge: 60 * 60 * 24 * 365, // 1 năm
                secure: process.env.NODE_ENV === 'production',
                httpOnly: true,
            });
        }

        const body = await request.json();
        const { theme, language } = body;

        // check xem user đã có preferences chưa
        const existing = await db
            .select()
            .from(preferences)
            .where(eq(preferences.userId, userId));

        let result;
        if (existing.length > 0) {
            // Update
            result = await db
                .update(preferences)
                .set({ theme, language, updatedAt: new Date() })
                .where(eq(preferences.userId, userId))
                .returning();
        } else {
            // Insert new
            result = await db
                .insert(preferences)
                .values({ userId, theme, language })
                .returning();
        }

        // Ghi theme vào cookie để client có thể đọc ngay (nếu cần)
        cookieStore.set('theme', theme || 'light', {
            secure: process.env.NODE_ENV === 'production',
        });

        return NextResponse.json({
            message: 'Preferences saved',
            preferences: result[0],
        });
    } catch (error) {
        console.error('Error saving preferences:', error);
        return NextResponse.json(
            { error: 'Failed to save preferences' },
            { status: 500 }
        );
    }
}