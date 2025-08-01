'use client';

import { useEffect, useState } from 'react';
import RichTextEditor from '@/components/admin/RichTextEditor';

export default function DebugTinyMCEEPage() {
  const [content, setContent] = useState('<h1>Test Content</h1><p>This is a test.</p>');
  const [envVars, setEnvVars] = useState<any>({});

  useEffect(() => {
    setEnvVars({
      NEXT_PUBLIC_TINYMCE_API_KEY: process.env.NEXT_PUBLIC_TINYMCE_API_KEY,
      NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
      NODE_ENV: process.env.NODE_ENV,
    });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">TinyMCE Debug Page</h1>
      
      <div className="mb-6 p-4 bg-gray-100 rounded">
        <h2 className="text-lg font-semibold mb-2">Environment Variables:</h2>
        <pre className="text-sm">{JSON.stringify(envVars, null, 2)}</pre>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">TinyMCE Editor:</h2>
        <RichTextEditor
          value={content}
          onChange={setContent}
          placeholder="Test the editor..."
        />
      </div>

      <div className="mb-6 p-4 bg-blue-100 rounded">
        <h2 className="text-lg font-semibold mb-2">Current Content:</h2>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
} 