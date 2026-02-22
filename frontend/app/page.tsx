"use client";
import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { Button } from "@/components/ui/button";
import Link from 'next/link';

export default function HomePage() {
  const [categories, setCategories] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiscovery = async () => {
      try {
        const res = await api.get('/stories');
        // Group stories by Category Name
        const grouped = res.data.reduce((acc: any, story: any) => {
          const catName = story.category?.name || "Uncategorized";
          if (!acc[catName]) acc[catName] = [];
          acc[catName].push(story);
          return acc;
        }, {});
        setCategories(grouped);
      } catch (err) {
        console.error("Discovery failed");
      } finally {
        setLoading(false);
      }
    };
    fetchDiscovery();
  }, []);

  if (loading) return <div className="p-20 text-center animate-pulse text-2xl">Loading your next favorite story...</div>;

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-20 px-6 text-center">
        <h1 className="text-5xl font-extrabold mb-4">Read Stories That Matter</h1>
        <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">Discover thousands of unique stories from independent authors worldwide.</p>
        <Button size="lg" asChild className="bg-orange-500 hover:bg-orange-600">
          <Link href="/write">Start Writing</Link>
        </Button>
      </section>

      {/* Discovery Rows */}
      <main className="max-w-7xl mx-auto py-12 px-6 space-y-12">
        {Object.entries(categories).map(([categoryName, stories]) => (
          <section key={categoryName}>
            <h2 className="text-2xl font-bold mb-6 text-slate-800">{categoryName}</h2>
            
            {/* Horizontal Scroll Container */}
            <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x">
              {stories.map((story) => (
                <Link 
                  href={`/story/${story.id}`} 
                  key={story.id} 
                  className="min-w-[200px] md:min-w-[240px] snap-start group"
                >
                  <div className="aspect-[2/3] rounded-lg overflow-hidden shadow-md mb-3 transition-transform group-hover:scale-105">
                    <img 
                      src={story.coverImage || '/missing_cover.png'} 
                      className="w-full h-full object-cover" 
                      alt={story.title} 
                    />
                  </div>
                  <h3 className="font-bold text-slate-900 line-clamp-1 group-hover:text-orange-600">
                    {story.title}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {story._count.chapters} Chapters
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}