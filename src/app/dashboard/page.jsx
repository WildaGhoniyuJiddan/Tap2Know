"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../../firebase/client';
import { onAuthStateChanged } from 'firebase/auth';
import { EditorProvider } from '../../context/EditorContext.jsx';
import EditorPanel from '../../components/EditorPanel.jsx';
import LivePreviewCanvas from '../../components/LivePreviewCanvas.jsx';
import MobilePreviewToggle from '../../components/MobilePreviewToggle.jsx';
import MobileSidebarDock from '../../components/MobileSidebarDock.jsx';

const DashboardEditorPageContent = () => {
  const [mobileMode, setMobileMode] = useState('editor'); // 'editor' | 'preview'

  const handleNavClick = (sectionId) => {
    setMobileMode('editor');
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <>

      <div className="flex flex-col lg:flex-row h-[100dvh] w-full overflow-hidden bg-black relative">

        {/* Mobile Nav Components */}
        <MobilePreviewToggle currentMode={mobileMode} onToggle={setMobileMode} />
        {mobileMode === 'editor' && <MobileSidebarDock onNavClick={handleNavClick} />}

        {/* Left Panel - Editor */}
        <div
          className={`
            w-full lg:w-[35%] xl:w-[30%] h-full overflow-y-auto bg-[#121212] border-r border-white/10 p-4 sm:p-6 custom-scrollbar
            ${mobileMode === 'editor' ? 'block' : 'hidden'} lg:block
          `}
        >
          <EditorPanel />
        </div>

        {/* Right Panel - Live Preview */}
        <div
          className={`
            flex-1 h-full overflow-y-auto bg-black p-0 sm:p-4 md:p-6 lg:p-8
            ${mobileMode === 'preview' ? 'block' : 'hidden'} lg:block
          `}
        >
          <LivePreviewCanvas />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 20px;
        }
        .pb-safe {
          padding-bottom: env(safe-area-inset-bottom);
        }
      `}} />
    </>
  );
};

const DashboardEditorPage = () => {
  const router = useRouter();
  const [authState, setAuthState] = useState('loading'); // 'loading' | 'authenticated' | 'unauthenticated'

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthState('authenticated');
      } else {
        setAuthState('unauthenticated');
      }
    });
    return () => unsubscribe();
  }, []);

  // Redirect unauthenticated users to login
  useEffect(() => {
    if (authState === 'unauthenticated') {
      router.replace('/login');
    }
  }, [authState, router]);

  // Loading state - brutalist spinner
  if (authState === 'loading') {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white gap-4">
        <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        <p className="text-xs uppercase tracking-[0.25em] text-zinc-500 font-mono">Authenticating...</p>
      </div>
    );
  }

  // Unauthenticated - show nothing while redirect fires
  if (authState === 'unauthenticated') {
    return null;
  }

  // Authenticated - render the editor
  return (
    <EditorProvider>
      <DashboardEditorPageContent />
    </EditorProvider>
  );
};

export default DashboardEditorPage;