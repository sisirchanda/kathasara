"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAuth } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      setAuth(res.data.user, res.data.access_token);
      toast.success("Login Successful!");
      router.push('/'); 
    } catch (err) {
      toast.error("Login Failed", { description: "Invalid email or password." });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <Card className="w-[350px]">
        <CardHeader><CardTitle className="text-center">Sign In</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input placeholder="Email" type="email" required onChange={(e) => setEmail(e.target.value)} />
            <Input placeholder="Password" type="password" required onChange={(e) => setPassword(e.target.value)} />
            <Button type="submit" className="w-full">Login</Button>
          </form>
          <div className="mt-4 text-center text-sm text-slate-500">
            Don't have an account? <button onClick={() => router.push('/signup')} className="text-blue-600 underline">Sign Up</button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}