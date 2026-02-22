"use client";
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/axios';
import { Button } from '@/components/ui/button';
import { BookOpen, User, Share2, List, Calendar } from 'lucide-react';

export default function StoryDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [story, setStory] = useState<any>(null);

  useEffect(() => {
    if (id) api.get(`/stories/${id}`).then(res => setStory(res.data));
  }, [id]);

  if (!story) return <div className="h-screen flex items-center justify-center animate-pulse text-slate-400">Loading Story...</div>;

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Branded Hero Banner */}
      <div className="relative h-[450px] w-full overflow-hidden bg-slate-900 flex items-center">
        <img src={story.coverImage} className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-40 scale-110" alt="" />
        <div className="relative max-w-6xl mx-auto px-6 w-full flex flex-col md:flex-row items-center md:items-end gap-10">
          <img src={story.coverImage} className="w-52 h-72 object-cover rounded shadow-2xl border-4 border-white/10" alt={story.title} />
          <div className="text-white text-center md:text-left mb-4">
            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight leading-tight">{story.title}</h1>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-8 text-white/80 text-sm">
              <span className="flex items-center gap-1"><User size={16}/> {story.authorId.slice(0,8)}</span>
              <span className="flex items-center gap-1"><Calendar size={16}/> {new Date(story.createdAt).getFullYear()}</span>
              <span className="bg-orange-600 text-white px-3 py-1 rounded text-[10px] font-black uppercase italic">KATHASARA SERIES</span>
            </div>
            <div className="flex gap-4">
              <Button size="lg" className="rounded-full px-10 bg-orange-600 hover:bg-orange-700 font-bold"
                onClick={() => router.push(`/read/${story.chapters[0]?.id}`)}>
                <BookOpen className="mr-2 h-5 w-5" /> Start Reading
              </Button>
              <Button variant="outline" size="icon" className="rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Share2 size={18} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Summary & Table of Contents */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-16">
        <div className="md:col-span-2">
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-slate-800">Summary</h2>
            <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-line">{story.summary}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <List className="text-orange-600" /> Index ({story.chapters?.length} Parts)
            </h2>
            <div className="space-y-3">
              {story.chapters?.map((chapter: any, index: number) => (
                <div key={chapter.id} onClick={() => router.push(`/read/${chapter.id}`)}
                  className="flex items-center justify-between p-5 rounded-2xl border border-slate-100 hover:border-orange-200 hover:bg-orange-50/50 cursor-pointer group transition-all">
                  <div className="flex items-center gap-6">
                    <span className="text-slate-200 font-black text-3xl group-hover:text-orange-200 transition-colors">{(index + 1).toString().padStart(2, '0')}</span>
                    <span className="font-bold text-slate-800 text-xl group-hover:text-orange-700">{chapter.title}</span>
                  </div>
                  <span className="text-orange-600 font-bold opacity-0 group-hover:opacity-100 transition-opacity">Read →</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}