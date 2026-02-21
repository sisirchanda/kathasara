"use client";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Button } from "@/components/ui/button";
import { Bold, Italic, Heading2 } from "lucide-react";
import { useEffect, useState } from 'react';

export default function Editor({ content, onChange }: { content: string, onChange: (val: string) => void }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    immediatelyRender: false, 
    onUpdate: ({ editor }) => { onChange(editor.getHTML()); },
    editorProps: {
      attributes: {
        class: 'prose prose-slate max-w-none focus:outline-none border p-6 min-h-[500px] rounded-b-md bg-white shadow-sm',
      },
    },
  });

  if (!mounted || !editor) return <div className="min-h-[500px] border rounded-md bg-slate-50 animate-pulse" />;

  return (
    <div className="w-full">
      <div className="flex gap-2 p-2 bg-slate-50 border border-b-0 rounded-t-md">
        <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleBold().run()}>
          <Bold className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleItalic().run()}>
          <Italic className="h-4 w-4" />
        </Button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}