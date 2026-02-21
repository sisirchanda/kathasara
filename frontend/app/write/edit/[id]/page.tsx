"use client";
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/axios';
import Editor from '@/components/Editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function ChapterEditorPage() {
  const { id } = useParams(); 
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('<p>Start writing...</p>');

  const handlePublish = async () => {
    try {
      await api.post(`/stories/${id}/chapters`, { title, content, order: 1 });
      toast.success("Chapter Published!");
      router.push(`/write/story-manage/${id}`); // Redirect to Dashboard
    } catch (err) {
      toast.error("Save failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="flex justify-between items-center mb-4">
        <Button variant="outline" onClick={() => router.back()}>Back</Button>
        <Button onClick={handlePublish}>Publish Chapter</Button>
      </div>
      <Input 
        className="text-2xl font-bold mb-4 border-none px-0 focus-visible:ring-0" 
        placeholder="Chapter Title..." 
        onChange={(e) => setTitle(e.target.value)}
      />
      <Editor content={content} onChange={setContent} />
    </div>
  );
}