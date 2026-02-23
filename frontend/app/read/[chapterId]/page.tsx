"use client";
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/axios';
import { Button } from '@/components/ui/button';
import { 
  ChevronLeft, 
  ChevronRight, 
  Menu, 
  ArrowLeft, 
  Type, 
  Heart, 
  MessageSquare, 
  Share2, 
  Send 
} from 'lucide-react';
import Link from 'next/link';

export default function KathasaraReader() {
  const { chapterId } = useParams();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [fontSize, setFontSize] = useState(20);
  
  // Day 11 State
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (chapterId) {
      // Fetch Chapter Data
      api.get(`/chapters/${chapterId}`).then(res => {
        setData(res.data);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Fetch Comments for the Story
        if (res.data?.storyId) {
          fetchComments(res.data.storyId);
        }
      });
    }
  }, [chapterId]);

  const fetchComments = async (storyId: string) => {
    try {
      const res = await api.get(`/stories/${storyId}/comments`);
      setComments(res.data);
    } catch (err) {
      console.error("Failed to fetch comments");
    }
  };

  const handleLike = async () => {
    try {
      const res = await api.post(`/stories/${data?.storyId}/like`);
      setLiked(res.data.liked);
    } catch (err) {
      // For Guests: Toggle locally so the heart turns red, even if backend fails
      setLiked(!liked);
    }
  };

  const handlePostComment = async () => {
    if (!newComment.trim()) return;
    try {
      const res = await api.post(`/stories/${data?.storyId}/comments`, { content: newComment });
      // res.data will include user: null for guests, handled below in the map
      setComments([res.data, ...comments]);
      setNewComment("");
    } catch (err) {
      alert("Error posting comment.");
    }
  };

  if (!data) return <div className="h-screen flex items-center justify-center bg-[#FCFAF7] text-slate-400 font-serif italic">Opening Kathasara...</div>;

  return (
    <div className="min-h-screen bg-[#FCFAF7] pb-20">
      {/* 1. Sticky Branded Header */}
      <nav className="sticky top-0 bg-white/95 backdrop-blur-sm border-b z-40 h-14 flex items-center">
        <div className="max-w-3xl mx-auto px-6 w-full flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => router.push(`/story/${data?.storyId}`)}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <span className="truncate max-w-[150px] hidden sm:inline">{data?.storyTitle}</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setFontSize(prev => prev >= 24 ? 18 : prev + 2)}>
              <Type className="h-4 w-4" />
            </Button>
            <Link href={`/story/${data?.storyId}`}>
              <Button variant="ghost" size="sm" className="text-orange-600 font-bold">
                <Menu className="h-4 w-4 mr-2" /> INDEX
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. Immersive Reading Area */}
      <main className="max-w-2xl mx-auto py-20 px-6 bg-white shadow-2xl shadow-slate-200/50 my-10 rounded-sm border border-slate-100 min-h-screen">
        <header className="mb-16 border-b border-slate-100 pb-10">
          <p className="text-orange-600 font-black text-xs tracking-[0.3em] uppercase mb-4 text-center">Part {data?.order || "—"}</p>
          <h1 className="text-4xl md:text-5xl font-serif font-black text-slate-900 leading-tight italic text-center">
            {data?.title}
          </h1>
        </header>
        
        <article 
          className="prose prose-slate lg:prose-xl prose-serif max-w-none text-slate-800 leading-[2.3rem] selection:bg-orange-100 mb-20"
          style={{ fontSize: `${fontSize}px` }}
          dangerouslySetInnerHTML={{ __html: data?.content }} 
        />

        {/* Interaction Bar (Floating Styled) */}
        <div className="flex justify-center gap-8 py-8 border-y border-slate-100 my-12">
          <button onClick={handleLike} className={`flex items-center gap-2 group ${liked ? 'text-red-500' : 'text-slate-400 hover:text-red-500'}`}>
            <Heart fill={liked ? "currentColor" : "none"} className="w-6 h-6 transition-transform group-active:scale-125" />
            <span className="text-xs font-bold uppercase">Like</span>
          </button>
          <button 
            onClick={() => document.getElementById('comment-box')?.focus()}
            className="flex items-center gap-2 text-slate-400 hover:text-orange-600"
          >
            <MessageSquare className="w-6 h-6" />
            <span className="text-xs font-bold uppercase">Comment</span>
          </button>
          <button className="flex items-center gap-2 text-slate-400 hover:text-blue-500">
            <Share2 className="w-6 h-6" />
            <span className="text-xs font-bold uppercase">Share</span>
          </button>
        </div>

        {/* 3. Bottom Transition Card */}
        <div className="mt-12 pt-12">
          {data?.nextId ? (
            <div 
              onClick={() => router.push(`/read/${data.nextId}`)}
              className="group cursor-pointer bg-slate-50 border border-slate-200 rounded-2xl p-10 flex flex-col items-center text-center hover:border-orange-300 hover:bg-orange-50 transition-all shadow-sm"
            >
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-3">Keep Reading</p>
              <h3 className="text-2xl font-serif font-bold text-slate-800 mb-8">Continue to the next part</h3>
              <Button className="rounded-full bg-orange-600 hover:bg-orange-700 px-12 h-12 text-lg font-bold shadow-lg shadow-orange-200">
                Read Next <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-slate-400 font-serif italic">You've reached the end of this story.</p>
              <Button variant="link" onClick={() => router.push('/')} className="mt-4 text-orange-600 font-bold">Discover more on Kathasara</Button>
            </div>
          )}
        </div>

        {/* 4. Day 11: Comment Section */}
        <section className="mt-20 pt-10 border-t border-slate-100">
          <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
            <MessageSquare className="text-orange-600" /> Reader Thoughts ({comments?.length || 0})
          </h3>

          <div className="mb-12 relative">
            <textarea 
              id="comment-box"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="What did you think of this part?"
              className="w-full p-4 bg-slate-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-orange-100 min-h-[100px] text-slate-700"
            />
            <Button 
              onClick={handlePostComment}
              disabled={!newComment.trim()}
              className="absolute bottom-3 right-3 rounded-full bg-orange-600 h-10 w-10 p-0"
            >
              <Send className="w-4 h-4 text-white" />
            </Button>
          </div>

          <div className="space-y-8">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-4 group">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center font-bold text-orange-600 uppercase">
                  {/* SAFE AVATAR: Check for user existence */}
                  {comment?.user?.firstName ? comment.user.firstName[0] : 'Guest'}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-bold text-slate-900">
                      {/* SAFE NAME: Fallback to Guest if user is null */}
                      {comment?.user 
                        ? `${comment.user.firstName} ${comment.user.lastName || ''}` 
                        : 'Guest'}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">
                      {comment?.createdAt ? new Date(comment.createdAt).toLocaleDateString() : ''}
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {comment.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="max-w-2xl mx-auto pb-20 flex justify-between text-[10px] font-bold text-slate-300 tracking-[0.2em] uppercase">
        <span>Kathasara Reader</span>
        <span>Paper Mode</span>
      </footer>
    </div>
  );
}