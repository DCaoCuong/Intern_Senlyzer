'use client';

import { useState } from 'react';
import { updateUserPreferences } from '@/app/actions/preferences';

export function PreferencesForm({ initialTheme = 'light', initialLanguage = 'en' }) {
  const [theme, setTheme] = useState(initialTheme);
  const [language, setLanguage] = useState(initialLanguage);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const result = await updateUserPreferences(theme, language);
      
      if (result.success) {
        setMessage('Preferences saved! Page will refresh...');
        // Optional: page revalidatePath sẽ tự làm mới sau 
        setTimeout(() => window.location.reload(), 1000);
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      setMessage('Error saving preferences');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-gray-100 rounded">
      <div>
        <label className="block text-sm font-medium mb-2">Theme</label>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          disabled={loading}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="auto">Auto</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Language</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          disabled={loading}
        >
          <option value="en">Eng</option>
          <option value="vi">Việt</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Saving...' : 'Save Preferences'}
      </button>

      {message && (
        <p className={`text-sm ${message.includes('✓') ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
    </form>
  );
}