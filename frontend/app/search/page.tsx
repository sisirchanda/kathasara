"use client";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/axios';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query) {
      api.get(`/stories/search?q=${query}`).then(res => setResults(res.data));
    }
  }, [query]);

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-8 italic">
        "{query}" এর ফলাফল (Results for "{query}")
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {results.map((story: any) => (
          <Link href={`/story/${story.id}`} key={story.id}>
            <div className="p-4 border rounded-xl hover:shadow-md transition-shadow">
              <h2 className="text-xl font-bold text-orange-600">{story.title}</h2>
              <p className="text-slate-500 text-sm">By {story.author.firstName}</p>
            </div>
          </Link>
        ))}
        {results.length === 0 && <p className="text-slate-400">No stories found.</p>}
      </div>
    </div>
  );
}