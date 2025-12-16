import { cookies } from 'next/headers';
import { db } from '@/app/lib/db';
import { preferences } from '@/app/lib/schema';
import { eq } from 'drizzle-orm';
import { PreferencesForm } from '@/app/components/preferences-form';

export const revalidate = 60; // Revalidate mỗi 60s

export async function getPreferences() {
  const cookieStore = await cookies();
  const userId = cookieStore.get('userId')?.value;

  if (!userId) {
    return null;
  }

  const userPrefs = await db
    .select()
    .from(preferences)
    .where(eq(preferences.userId, userId));

  return userPrefs[0] || null;
}

export default async function PreferencesPage() {
  const userPrefs = await getPreferences();

  return (
    <div className="max-w-md mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">User Preferences</h1>
      
      <PreferencesForm 
        initialTheme={userPrefs?.theme || 'light'}
        initialLanguage={userPrefs?.language || 'en'}
      />

      {userPrefs && (
        <div className="mt-8 p-4 bg-gray-50 rounded">
          <h2 className="font-semibold mb-2">Current Settings:</h2>
          <p>Theme: <strong>{userPrefs.theme}</strong></p>
          <p>Language: <strong>{userPrefs.language}</strong></p>
          <p>Last Updated: <strong>{userPrefs.updatedAt ? new Date(userPrefs.updatedAt).toLocaleString() : 'Never'}</strong></p>
        </div>
      )}
    </div>
  );
}