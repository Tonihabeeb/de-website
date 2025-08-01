export default function TestEnvPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Environment Variables Test</h1>
      <div className="space-y-2">
        <p><strong>NEXT_PUBLIC_API_BASE_URL:</strong> {process.env.NEXT_PUBLIC_API_BASE_URL || 'NOT SET'}</p>
        <p><strong>NEXT_PUBLIC_TINYMCE_API_KEY:</strong> {process.env.NEXT_PUBLIC_TINYMCE_API_KEY ? 'SET' : 'NOT SET'}</p>
        <p><strong>NEXT_PUBLIC_GOOGLE_MAPS_API_KEY:</strong> {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? 'SET' : 'NOT SET'}</p>
      </div>
    </div>
  );
} 