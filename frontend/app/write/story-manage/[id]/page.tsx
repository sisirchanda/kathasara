"use client";
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/axios';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, BookOpen, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function StoryManagePage() {
  const { id } = useParams();
  const router = useRouter();
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    // FIXED: Updated the API path to match the new ChapterController structure
    api.get(`/chapters/story/${id}`)
      .then(res => setChapters(res.data))
      .catch(err => console.error("Failed to load chapters:", err));
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      {/* Back Button to Dashboard */}
      <Button variant="ghost" onClick={() => router.push('/write')} className="mb-6">
        <ChevronLeft className="mr-2 h-4 w-4" /> Back to My Stories
      </Button>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Story Dashboard</h1>
        {/* FIXED: This route should lead to your Chapter Editor */}
        <Button onClick={() => router.push(`/write/edit/${id}`)}>
          <Plus className="mr-2 h-4 w-4" /> New Chapter
        </Button>
      </div>

      <div className="grid gap-4">
        {chapters.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed rounded-xl">
            <p className="text-slate-500">No chapters yet. Start writing your masterpiece!</p>
          </div>
        ) : (
          chapters.map((chapter: any, i: number) => (
            <Card key={chapter.id} className="p-4 flex justify-between items-center hover:shadow-md transition-shadow">
              <div>
                <p className="text-[10px] font-bold text-orange-600 uppercase tracking-widest">Part {i + 1}</p>
                <h3 className="font-bold text-lg">{chapter.title}</h3>
              </div>
              <div className="flex gap-2">
                {/* Preview Button: Points to the new Pratilipi-style Reader */}
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/read/${chapter.id}`}>
                    <BookOpen className="h-4 w-4 mr-2" /> Preview
                  </Link>
                </Button>
                {/* Optional: Add an Edit Chapter button here later */}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}