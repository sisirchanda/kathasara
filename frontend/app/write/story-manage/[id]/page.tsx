"use client";
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/axios';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, BookOpen } from 'lucide-react';

export default function StoryManagePage() {
  const { id } = useParams();
  const router = useRouter();
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    api.get(`/stories/${id}/chapters`).then(res => setChapters(res.data));
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Story Dashboard</h1>
        <Button onClick={() => router.push(`/write/edit/${id}`)}>
          <Plus className="mr-2 h-4 w-4" /> New Chapter
        </Button>
      </div>

      <div className="grid gap-4">
        {chapters.map((chapter: any, i: number) => (
          <Card key={chapter.id} className="p-4 flex justify-between items-center">
            <div>
              <p className="text-xs text-slate-500">Chapter {i + 1}</p>
              <h3 className="font-bold">{chapter.title}</h3>
            </div>
            <Button variant="ghost"><BookOpen className="h-4 w-4" /></Button>
          </Card>
        ))}
      </div>
    </div>
  );
}