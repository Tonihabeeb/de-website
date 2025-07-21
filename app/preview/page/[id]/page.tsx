import { cookies } from 'next/headers';
import { previewDraftStore } from '@/app/api/preview/route';
import { db } from '@/database/connection';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { id: string } }) {
  return {
    robots: {
      index: false,
      follow: false,
      nocache: true,
    },
  };
}

export default async function PagePreview({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const cookieStore = await cookies();
  const isPreview = cookieStore.get('preview')?.value === '1';
  let content = null;

  if (isPreview && previewDraftStore[`page:${id}`]) {
    content = previewDraftStore[`page:${id}`];
  } else {
    // Fallback: fetch published content from DB
    const stmt = db.prepare('SELECT * FROM pages WHERE id = ?');
    const page = stmt.get(id) as any;
    content = page?.content || 'No content found.';
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
