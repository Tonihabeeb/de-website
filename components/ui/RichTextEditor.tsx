'use client';

import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Link as LinkIcon,
  Image as ImageIcon,
} from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  content,
  onChange,
  placeholder = 'Start writing...',
  className = '',
  disabled = false,
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline cursor-pointer',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto',
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    editable: !disabled,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  const addLink = () => {
    const url = window.prompt('Enter URL');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const addImage = () => {
    const url = window.prompt('Enter image URL');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const MenuBar = () => (
    <div className='border-b border-gray-200 p-2 flex flex-wrap gap-1'>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed ${
          editor.isActive('bold') ? 'bg-gray-200' : ''
        }`}
      >
        <Bold className='w-4 h-4' />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed ${
          editor.isActive('italic') ? 'bg-gray-200' : ''
        }`}
      >
        <Italic className='w-4 h-4' />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded hover:bg-gray-100 ${
          editor.isActive('bulletList') ? 'bg-gray-200' : ''
        }`}
      >
        <List className='w-4 h-4' />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded hover:bg-gray-100 ${
          editor.isActive('orderedList') ? 'bg-gray-200' : ''
        }`}
      >
        <ListOrdered className='w-4 h-4' />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`p-2 rounded hover:bg-gray-100 ${
          editor.isActive('blockquote') ? 'bg-gray-200' : ''
        }`}
      >
        <Quote className='w-4 h-4' />
      </button>

      <div className='w-px h-6 bg-gray-300 mx-1' />

      <button
        onClick={addLink}
        className={`p-2 rounded hover:bg-gray-100 ${
          editor.isActive('link') ? 'bg-gray-200' : ''
        }`}
      >
        <LinkIcon className='w-4 h-4' />
      </button>

      <button onClick={addImage} className='p-2 rounded hover:bg-gray-100'>
        <ImageIcon className='w-4 h-4' />
      </button>

      <div className='w-px h-6 bg-gray-300 mx-1' />

      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className='p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed'
      >
        <Undo className='w-4 h-4' />
      </button>

      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className='p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed'
      >
        <Redo className='w-4 h-4' />
      </button>
    </div>
  );

  return (
    <div
      className={`border border-gray-300 rounded-md overflow-hidden ${className}`}
    >
      <MenuBar />
      <EditorContent
        editor={editor}
        className={`prose max-w-none p-4 min-h-[200px] focus:outline-none ${
          disabled ? 'bg-gray-50 cursor-not-allowed' : ''
        }`}
      />
    </div>
  );
};

export default RichTextEditor;
