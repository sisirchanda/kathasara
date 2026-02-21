"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

export default function SignupPage() {
  const [formData, setFormData] = useState({ email: '', password: '', username: '' });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/auth/signup', formData);
      toast.success("Account created!", { description: "Please login now." });
      router.push('/login');
    } catch (err) {
      toast.error("Signup Failed", { description: "Username or Email might be taken." });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <Card className="w-[350px]">
        <CardHeader><CardTitle className="text-center">Create Account</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input placeholder="Username" onChange={(e) => setFormData({...formData, username: e.target.value})} />
            <Input placeholder="Email" type="email" onChange={(e) => setFormData({...formData, email: e.target.value})} />
            <Input placeholder="Password" type="password" onChange={(e) => setFormData({...formData, password: e.target.value})} />
            <Button type="submit" className="w-full">Register</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}