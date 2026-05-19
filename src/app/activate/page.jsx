"use client";
import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { auth, signInWithEmailAndPassword, toSyntheticEmail } from '@/firebase/client';
import { ArrowRight, Loader2, ShieldCheck, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

function ActivateForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code') || '';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleActivate = async (e) => {
    e.preventDefault();
    setError('');

    if (!code) {
      setError('No activation code found. Please use the link from your NFC card.');
      return;
    }

    if (!username || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (!/^[a-z0-9_]{3,20}$/.test(username.toLowerCase())) {
      setError('Username must be 3-20 characters: lowercase letters, numbers, underscores only.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    try {
      // 1. Call server to validate code, create auth user & profile doc
      const res = await fetch('/api/auth/activate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, username: username.toLowerCase(), password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Activation failed');
      }

      // 2. Sign in on the client using the newly created credentials
      const email = toSyntheticEmail(username.toLowerCase());
      await signInWithEmailAndPassword(auth, email, password);

      toast.success('Account activated! Welcome to Tap2Know.');
      router.push('/dashboard');
    } catch (err) {
      console.error(err);
      setError(err.message || 'Activation failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!code) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center p-6 font-['Inter']">
        <div className="max-w-md w-full text-center p-8 border-2 border-zinc-800 bg-zinc-950 rounded-xl shadow-[8px_8px_0px_#222]">
          <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-2xl font-black uppercase tracking-tight mb-3 font-['Anton']">No Code Detected</h1>
          <p className="text-zinc-400 mb-6">Please tap your NFC card or use the activation link provided with your purchase.</p>
          <a href="/" className="inline-block bg-white text-black font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-sm shadow-[4px_4px_0px_#555] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
            Return Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center p-4 font-['Inter'] relative overflow-hidden">
      
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
      }} />
      <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-[#ccff00] blur-[150px] opacity-10 rounded-full" />
      <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-[#6EB5FF] blur-[150px] opacity-10 rounded-full" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00] text-xs font-bold uppercase tracking-wider mb-6">
            <ShieldCheck size={14} />
            Card Activation
          </div>
          <h1 className="font-['Anton'] text-5xl md:text-6xl tracking-tight uppercase mb-2">CLAIM YOUR CARD</h1>
          <p className="text-zinc-400">Choose your identity. This will be your permanent Tap2Know profile URL.</p>
        </div>

        <form onSubmit={handleActivate} className="space-y-5 bg-zinc-950/80 backdrop-blur-xl p-8 rounded-2xl border border-zinc-800 shadow-[8px_8px_0px_#111]">
          
          {/* Code Display */}
          <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg border border-zinc-800">
            <span className="text-xs text-zinc-500 uppercase tracking-wider">Activation Code</span>
            <span className="font-mono text-sm text-[#ccff00] font-bold tracking-widest">{code}</span>
          </div>

          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">Username</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">tap2know.id/u/</span>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                placeholder="yourname"
                maxLength={20}
                className="w-full bg-zinc-900 border border-zinc-700 text-white pl-[120px] pr-4 py-3 rounded-lg focus:outline-none focus:border-[#ccff00] focus:ring-1 focus:ring-[#ccff00] transition-colors"
                disabled={isLoading}
              />
            </div>
            <p className="text-[10px] text-zinc-600">3-20 characters. Lowercase letters, numbers, underscores only.</p>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 6 characters"
              className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#ccff00] focus:ring-1 focus:ring-[#ccff00] transition-colors"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
              className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#ccff00] focus:ring-1 focus:ring-[#ccff00] transition-colors"
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm flex items-start gap-2">
              <AlertTriangle size={16} className="shrink-0 mt-0.5" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#ccff00] text-black font-bold text-lg py-4 rounded-lg hover:bg-[#b3e600] transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-[4px_4px_0px_#ffffff] active:translate-y-1 active:translate-x-1 active:shadow-[0px_0px_0px_#ffffff]"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : 'ACTIVATE & ENTER'}
            {!isLoading && <ArrowRight size={20} />}
          </button>

          <p className="text-center text-xs text-zinc-600">
            Already have an account? <a href="/login" className="text-white hover:text-[#ccff00] transition-colors underline underline-offset-2">Login here</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default function ActivatePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="flex items-center gap-3 font-mono text-sm">
          <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          LOADING...
        </div>
      </div>
    }>
      <ActivateForm />
    </Suspense>
  );
}
