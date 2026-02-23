"use client";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import api from '@/lib/axios';

// 1. Move the search logic into a separate component
function SearchResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query) {
      api.get(`/stories/search?q=${query}`).then(res => setResults(res.data));
    }
  }, [query]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {results.map((story: any) => (
        <Link href={`/story/${story.id}`} key={story.id}>
          <div className="border p-4 rounded-lg hover:shadow-md transition-shadow">
            <h3 className="font-bold text-lg text-orange-600">{story.title}</h3>
            <p className="text-slate-500 text-sm">By {story.author?.firstName}</p>
          </div>
        </Link>
      ))}
      {results.length === 0 && <p className="text-slate-400">No stories found for "{query}".</p>}
    </div>
  );
}

// 2. The main Page component wraps the content in Suspense
export default function SearchPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-xl mb-6 font-bold">Search Results</h2>
      <Suspense fallback={<p>Loading search results...</p>}>
        <SearchResultsContent />
      </Suspense>
    </div>
  );
}