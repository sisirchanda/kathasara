import Link from 'next/link';
import { Button } from './ui/button';

export default function Navbar() {
  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-black text-orange-600 tracking-tighter">
          KATHASARA
        </Link>
        <div className="flex gap-4">
          <Button variant="ghost" asChild><Link href="/">Explore</Link></Button>
          <Button variant="ghost" asChild><Link href="/write">My Stories</Link></Button>
          <Button asChild><Link href="/write/new">Write</Link></Button>
        </div>
      </div>
    </nav>
  );
}