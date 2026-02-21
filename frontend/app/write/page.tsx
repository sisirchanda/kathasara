"use client";
import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Settings, BookOpen } from "lucide-react";
import Link from 'next/link';
import { toast } from 'sonner';

export default function MyStoriesPage() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await api.get('/stories/my-stories');
        setStories(res.data);
      } catch (err) {
        toast.error("Could not load your stories");
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, []);

  if (loading) return <div className="p-10 text-center">Loading your library...</div>;

  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">My Stories</h1>
          <p className="text-slate-500 mt-2">Manage your drafts and published works.</p>
        </div>
        <Button asChild>
          <Link href="/write/new">
            <Plus className="mr-2 h-4 w-4" /> Create New Story
          </Link>
        </Button>
      </div>

      {stories.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed rounded-xl">
          <BookOpen className="mx-auto h-12 w-12 text-slate-300 mb-4" />
          <h3 className="text-lg font-medium">No stories yet</h3>
          <p className="text-slate-500 mb-6">Every great author starts with a single word.</p>
          <Button variant="outline" asChild>
            <Link href="/write/new">Start Writing</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story: any) => (
            <Card key={story.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-video w-full bg-slate-100 overflow-hidden">
                {story.coverImage ? (
                  <img src={story.coverImage} alt={story.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-400">No Cover</div>
                )}
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-1">{story.title}</CardTitle>
                <p className="text-xs text-slate-500 uppercase tracking-wider">
                  {story._count.chapters} Chapters
                </p>
              </CardHeader>
              <CardContent className="flex gap-2">
                <Button variant="default" className="flex-1" asChild>
                  <Link href={`/write/story-manage/${story.id}`}>
                    <Settings className="mr-2 h-4 w-4" /> Manage
                  </Link>
                </Button>
                <Button variant="outline" className="flex-1" asChild>
                  <Link href={`/read/${story.id}`}>
                    <BookOpen className="mr-2 h-4 w-4" /> View
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}