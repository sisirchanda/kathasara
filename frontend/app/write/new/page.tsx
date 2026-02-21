"use client";
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import api from '@/lib/axios';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useRouter } from 'next/navigation';
import { Card } from "@/components/ui/card";

export default function NewStoryPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    try {
      let imageUrl = "";
      
      // 1. Upload Image to Supabase if file selected
      if (file) {
        const fileExt = file.name.split('.').pop();
		const filePath = `cover_image/${Math.random()}.${fileExt}`;
        //const fileName = `${Math.random()}.${fileExt}`;
        const { data, error } = await supabase.storage
          .from('covers')
          .upload(filePath, file);

        if (error) {
			console.error("Supabase Upload Error:", error);
			throw error;
		}
		
        const { data: { publicUrl } } = supabase.storage.from('covers').getPublicUrl(filePath);
        imageUrl = publicUrl;
      }

      // 2. Send Metadata to NestJS
      const res = await api.post('/stories', {
        title: formData.get('title'),
        summary: formData.get('summary'),
        coverImage: imageUrl,
        categoryId: 1, // Defaulting to 1 for now
      });

      toast.success("Story created!");
      //router.push(`/write/edit/${res.data.id}`); // Redirect to chapter editor
	  router.push(`/write/edit/${res.data.id}`);
    } catch (err) {
      toast.error("Failed to create story");
    } finally {
      setLoading(false);
	  setFile(null);
	  (e.target as HTMLFormElement).reset();
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <Card>
        <form onSubmit={handleCreate} className="p-6 space-y-6">
          <h1 className="text-2xl font-bold">New Story Details</h1>
          <Input name="title" placeholder="Enter Story Title" required />
          <Textarea name="summary" placeholder="Write a short summary..." required />
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Cover Image</label>
            <Input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating..." : "Create Story & Start Writing"}
          </Button>
        </form>
      </Card>
    </div>
  );
}