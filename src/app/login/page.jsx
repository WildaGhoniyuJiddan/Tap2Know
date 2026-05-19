"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, signInWithEmailAndPassword, toSyntheticEmail } from '@/firebase/client';
import { ArrowRight, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error('Please enter both username and password');
      return;
    }

    setIsLoading(true);
    try {
      // Convert username to synthetic email and authenticate directly via Firebase Client SDK
      const email = toSyntheticEmail(username.toLowerCase());
      await signInWithEmailAndPassword(auth, email, password);
      
      toast.success('Login successful!');
      router.push('/dashboard');
    } catch (error) {
      console.error(error);
      // Map Firebase error codes to user-friendly messages
      if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
        toast.error('Invalid username or password.');
      } else if (error.code === 'auth/wrong-password') {
        toast.error('Incorrect password.');
      } else if (error.code === 'auth/too-many-requests') {
        toast.error('Too many failed attempts. Please try again later.');
      } else {
        toast.error('Login failed. Please check your credentials.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center p-4 font-['Inter'] relative overflow-hidden">
      
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
      }} />
      <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-[#F4845F] blur-[150px] opacity-20 rounded-full" />
      <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-[#6EB5FF] blur-[150px] opacity-20 rounded-full" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <h1 className="font-['Anton'] text-6xl tracking-tight uppercase mb-2">Login</h1>
          <p className="text-zinc-400">Access your Tap2Know Editor</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6 bg-zinc-950/80 backdrop-blur-xl p-8 rounded-2xl border border-zinc-800 shadow-2xl">
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. maxreed"
              className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-colors"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-colors"
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-white text-black font-bold text-lg py-4 rounded-lg hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : 'ENTER STUDIO'}
            {!isLoading && <ArrowRight size={20} />}
          </button>

          <p className="text-center text-xs text-zinc-600">
            Have an NFC card? <a href="/activate" className="text-white hover:text-[#ccff00] transition-colors underline underline-offset-2">Activate it here</a>
          </p>
        </form>
      </div>
    </div>
  );
}
