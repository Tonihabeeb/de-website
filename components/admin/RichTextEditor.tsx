'use client';

import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
  height?: number;
  className?: string;
  disabled?: boolean;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = 'Enter your content here...',
  height = 400,
  className = '',
  disabled = false
}: RichTextEditorProps) {
  const editorRef = useRef<any>(null);

  const handleEditorChange = (content: string) => {
    onChange(content);
  };

  const handleEditorInit = (evt: any, editor: any) => {
    editorRef.current = editor;
  };

  return (
    <div className={className}>
      <Editor
        onInit={handleEditorInit}
        value={value}
        onEditorChange={handleEditorChange}
        init={{
          height: height,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | table | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          placeholder: placeholder,
          branding: false,
          elementpath: false,
          resize: false,
          statusbar: false,
          paste_data_images: true,
          images_upload_url: '/api/admin/upload/image',
          images_upload_handler: (blobInfo: any, progress: any) => {
            return new Promise((resolve, reject) => {
              const formData = new FormData();
              formData.append('file', blobInfo.blob(), blobInfo.filename());
              
              fetch('/api/admin/upload/image', {
                method: 'POST',
                body: formData,
              })
              .then(response => response.json())
              .then(result => {
                if (result.success) {
                  resolve(result.url);
                } else {
                  reject('Upload failed');
                }
              })
              .catch(error => {
                reject('Upload failed: ' + error);
              });
            });
          },
          setup: (editor: any) => {
            editor.on('keydown', (e: any) => {
              // Handle keyboard shortcuts
              if (e.ctrlKey && e.keyCode === 83) {
                e.preventDefault();
                // Trigger save
                const saveEvent = new CustomEvent('editor-save');
                window.dispatchEvent(saveEvent);
              }
            });
          }
        }}
        disabled={disabled}
      />
      
      {/* Editor Help */}
      <div className="mt-2 text-xs text-gray-500">
        <p>Use Ctrl+S to save, Ctrl+B for bold, Ctrl+I for italic</p>
        <p>Drag and drop images or use the image button to upload</p>
      </div>
    </div>
  );
} 