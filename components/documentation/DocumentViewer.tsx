import { FileText, FileImage, File } from 'lucide-react';

interface DocumentMeta {
  title: string;
  category: string;
  size: string;
  description: string;
  type: 'pdf' | 'image' | 'text';
}

const placeholderDoc: DocumentMeta = {
  title: 'KPP Technical Datasheet',
  category: 'Technical',
  size: '2.4 MB',
  description: 'Complete technical specifications and performance data',
  type: 'pdf',
};

export default function DocumentViewer({
  doc = placeholderDoc,
}: {
  doc?: DocumentMeta;
}) {
  return (
    <div className='w-full max-w-2xl mx-auto bg-white border rounded-lg shadow p-6'>
      <div className='flex items-center gap-4 mb-4'>
        {doc.type === 'pdf' && <File className='w-10 h-10 text-red-600' />}
        {doc.type === 'image' && (
          <FileImage className='w-10 h-10 text-blue-600' />
        )}
        {doc.type === 'text' && (
          <FileText className='w-10 h-10 text-green-600' />
        )}
        <div>
          <h2 className='text-xl font-bold text-primary mb-1'>{doc.title}</h2>
          <div className="flex gap-2 text-xs text-white">
            <span className='bg-gray-100 px-2 py-1 rounded'>
              {doc.category}
            </span>
            <span className='bg-gray-100 px-2 py-1 rounded'>{doc.size}</span>
          </div>
        </div>
      </div>
      <p className="text-white">{doc.description}</p>
      <div className="bg-gray-50 border rounded p-4 text-white">
        {doc.type === 'pdf' && <em>PDF preview will be shown here.</em>}
        {doc.type === 'image' && <em>Image preview will be shown here.</em>}
        {doc.type === 'text' && <em>Text file preview will be shown here.</em>}
      </div>
    </div>
  );
}
