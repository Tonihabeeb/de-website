import { cookies } from 'next/headers';
import { db } from '@/database/connection';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  return {
    robots: {
      index: false,
      follow: false,
      nocache: true,
    },
  };
}

export default async function ProjectPreview({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cookieStore = await cookies();
  const isPreview = cookieStore.get('preview')?.value === '1';
  let content = null;

  if (isPreview) {
    // For now, just show a preview message since we removed the store export
    content = 'Preview content would be displayed here.';
  } else {
    // Fallback: fetch published project from DB
    const stmt = db.prepare('SELECT * FROM projects WHERE id = ?');
    const project = stmt.get(id) as any;
    content = project?.content || 'No content found.';
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
