import React from 'react';
import { adminDb } from '@/firebase/admin';
import PublicProvider from '../../../components/PublicProvider';
import LivePreviewCanvas from '../../../components/LivePreviewCanvas';

// Dynamic metadata based on the username
export async function generateMetadata({ params }) {
  const { username } = await params;
  return {
    title: `Tap2Know - ${username}`,
    description: `${username}'s digital profile on Tap2Know.`,
  };
}

// Force dynamic rendering + zero cache — always fetch fresh from Firestore
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function PublicProfilePage({ params }) {
  const { username } = await params;

  // --- Server-side Firestore fetch via Admin SDK ---
  if (!adminDb) {
    return <ErrorState type="error" />;
  }

  let profileData = null;
  let state = 'ok'; // 'ok' | 'not_found' | 'not_published' | 'error'

  try {
    const docSnap = await adminDb.collection('profiles').doc(username).get();

    if (!docSnap.exists) {
      state = 'not_found';
    } else {
      const data = docSnap.data();
      if (data?.isPublished === true || data?.settings?.isPublished === true) {
        // Serialize Firestore data (strip non-serializable fields like Timestamps)
        profileData = JSON.parse(JSON.stringify(data));
      } else {
        state = 'not_published';
      }
    }
  } catch (error) {
    console.error('Error fetching profile for', username, ':', error);
    state = 'error';
  }

  // --- Render error states directly from the server ---
  if (state !== 'ok' || !profileData) {
    return <ErrorState type={state} />;
  }

  // --- Render the published profile ---
  return (
    <div className="min-h-screen bg-black">
      <PublicProvider data={profileData}>
        <div className="max-w-screen-2xl mx-auto min-h-screen h-screen overflow-y-auto p-4 md:p-8">
          <LivePreviewCanvas />
        </div>
      </PublicProvider>
    </div>
  );
}

// --- Error/Empty State Component (Server Component, no client JS) ---
function ErrorState({ type }) {
  const isNotPublished = type === 'not_published';
  const title = isNotPublished ? 'Not Published' : 'Not Found';
  const message = isNotPublished
    ? 'This profile exists but the owner has not published it yet.'
    : "We couldn't find a Tap2Know profile with this username.";

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 text-white text-center" style={{ fontFamily: 'Inter' }}>
      <div className="max-w-md w-full p-8 border-2 border-zinc-800 bg-zinc-950 rounded-xl shadow-[8px_8px_0px_#222]">
        <h1 className="text-3xl font-black uppercase tracking-tight mb-3" style={{ fontFamily: 'Anton' }}>
          {title}
        </h1>
        <p className="text-zinc-400 mb-8">{message}</p>
        <a href="/" className="inline-block bg-white text-black font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-sm shadow-[4px_4px_0px_#555] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
          Return Home
        </a>
      </div>
    </div>
  );
}