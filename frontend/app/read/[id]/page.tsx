"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import api from '@/lib/axios';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function ReaderPage() {
  const { id } = useParams();
  const [story, setStory] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStoryData = async () => {
      try {
        // We'll need a public endpoint for this
        const res = await api.get(`/stories/${id}`);
        setStory(res.data);
      } catch (err) {
        console.error("Failed to load story");
      } finally {
        setLoading(false);
      }
    };
    fetchStoryData();
  }, [id]);

  if (loading) return <div className="p-20 text-center">Opening the book...</div>;
  if (!story) return <div className="p-20 text-center">Story not found.</div>;

  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <div className="text-center mb-10">
        <img 
          src={story.coverImage} 
          alt={story.title} 
          className="w-48 h-72 object-cover mx-auto rounded-lg shadow-lg mb-6"
        />
        <h1 className="text-4xl font-bold mb-2">{story.title}</h1>
        <p className="text-slate-500 italic">By Author ID: {story.authorId}</p>
      </div>

      <div className="prose prose-slate max-w-none mb-12">
        <h2 className="text-xl font-semibold">Summary</h2>
        <p>{story.summary}</p>
      </div>

      <Separator className="my-10" />

      <div className="space-y-8">
        <h2 className="text-2xl font-bold">Chapters</h2>
        {story.chapters?.map((chapter: any, index: number) => (
          <div key={chapter.id} className="border-l-4 border-slate-200 pl-6 py-2">
            <h3 className="text-xl font-bold mb-4">Chapter {index + 1}: {chapter.title}</h3>
            {/* We use dangerouslySetInnerHTML because TipTap saves HTML strings */}
            <div 
              className="prose prose-slate max-w-none"
              dangerouslySetInnerHTML={{ __html: chapter.content }} 
            />
          </div>
        ))}
      </div>
    </div>
  );
}