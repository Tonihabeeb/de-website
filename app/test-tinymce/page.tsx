'use client';

import { useEffect, useState } from 'react';
import RichTextEditor from '@/components/admin/RichTextEditor';

export default function TestTinyMCEPage() {
  const [content, setContent] = useState('<p>Test content</p>');
  const [envVar, setEnvVar] = useState<string>('');

  useEffect(() => {
    // Check if the environment variable is available
    const apiKey = process.env.NEXT_PUBLIC_TINYMCE_API_KEY;
    setEnvVar(apiKey || 'NOT_FOUND');
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">TinyMCE Environment Test</h1>
      
      <div className="mb-4 p-4 bg-gray-100 rounded">
        <h2 className="text-lg font-semibold mb-2">Environment Variable Status:</h2>
        <p><strong>NEXT_PUBLIC_TINYMCE_API_KEY:</strong> {envVar}</p>
        <p><strong>Status:</strong> {envVar && envVar !== 'NOT_FOUND' ? '✅ Found' : '❌ Not Found'}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">TinyMCE Editor Test:</h2>
        <RichTextEditor
          value={content}
          onChange={setContent}
          placeholder="Test the TinyMCE editor..."
          height={300}
        />
      </div>

      <div className="mt-4 p-4 bg-blue-50 rounded">
        <h3 className="font-semibold mb-2">Instructions:</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>If you see "NOT_FOUND" above, the environment variable isn't loading</li>
          <li>If the editor shows "read-only" error, the API key is invalid</li>
          <li>If the editor works normally, everything is configured correctly</li>
        </ul>
      </div>
    </div>
  );
} 