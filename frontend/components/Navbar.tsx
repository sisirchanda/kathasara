"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from './ui/button';
import { Search } from 'lucide-react';

export default function Navbar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // Encode the query to handle Bengali characters safely in the URL
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        <Link href="/" className="text-2xl font-black text-orange-600 tracking-tighter shrink-0">
          KATHASARA
        </Link>

        {/* --- SEARCH BAR --- */}
        <form onSubmit={handleSearch} className="relative flex-1 max-w-md hidden md:block">
          <input
            type="text"
            placeholder="খুঁজুন (Search stories...)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-slate-100 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-orange-500 transition-all outline-none"
          />
          <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
        </form>

        <div className="flex gap-4 shrink-0">
          <Button variant="ghost" asChild><Link href="/">Explore</Link></Button>
          <Button variant="ghost" asChild><Link href="/write">My Stories</Link></Button>
          <Button asChild className="bg-orange-600 hover:bg-orange-700">
            <Link href="/write/new">Write</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}