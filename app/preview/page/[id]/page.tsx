import { cookies } from 'next/headers';
import { previewDraftStore } from '@/app/api/preview/store';
// import { db } from '@/database/connection';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return {
    robots: {
      index: false,
      follow: false,
      nocache: true,
    },
  };
}

export default async function PagePreview({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cookieStore = await cookies();
  const isPreview = cookieStore.get('preview')?.value === '1';
  let content = null;

  if (isPreview && previewDraftStore[`page:${id}`]) {
    content = previewDraftStore[`page:${id}`];
  } else {
    // Fallback: fetch published content from backend
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
    const res = await fetch(`${backendUrl}/api/pages/${id}`);
    if (res.ok) {
      const page = await res.json();
      content = page?.content || 'No content found.';
    } else {
      content = 'No content found.';
    }
  }

  return (
    <div className='max-w-3xl mx-auto p-8'>
      <div className='mb-4'>
        <span className='inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold'>
          PREVIEW MODE
        </span>
      </div>
      <div className='prose max-w-none'>
        {typeof content === 'string'
          ? content
          : JSON.stringify(content, null, 2)}
      </div>
    </div>
  );
}
