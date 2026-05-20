import React, { useState } from 'react';
import { Sparkles, Pencil } from 'lucide-react';
import { useEditor } from '@/context/EditorContext.jsx';
import MediaUploadModal from './MediaUploadModal.jsx';

const PortfolioCardColumn2 = () => {
  const { cardColor, textColor, bodyFontFamily, testimonialQuote, testimonialAttribution, stats, displayFontFamily, mediaUrls, updateMediaUrl } = useEditor();
  const [activeModal, setActiveModal] = useState(null); // 'clientVoice' | 'tenM' | null

  return (
    <div className="flex flex-col gap-4 md:gap-5 h-full">
      {/* Client Voice Card */}
      <div 
        className="group rounded-2xl p-5 md:p-6 relative overflow-hidden noise-overlay shrink-0 transition-colors duration-300"
        style={{ backgroundColor: cardColor, fontFamily: bodyFontFamily }}
      >
        <button 
          onClick={() => setActiveModal('clientVoice')}
          className="absolute top-4 right-4 z-50 p-2 bg-black/40 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:text-black scale-95 hover:scale-105"
        >
          <Pencil size={14} strokeWidth={2} />
        </button>

        {mediaUrls.clientVoiceImage && (
          <div className="absolute inset-0 z-0 opacity-20 mix-blend-overlay">
            <img src={mediaUrls.clientVoiceImage} alt="" className="w-full h-full object-cover" />
          </div>
        )}

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="uppercase tracking-[0.22em] text-[11px] font-medium text-white/70">CLIENT VOICE</span>
            <Sparkles className="h-3 w-3 stroke-[1.5px] text-white/50" />
          </div>
          
          <p className="text-[13px] sm:text-[14px] leading-[1.6] text-white/85 mb-4 font-medium" style={{ color: textColor }}>
            "{testimonialQuote}"
          </p>
          
          <p className="text-[11px] text-white/50 tracking-wide uppercase">
            {testimonialAttribution}
          </p>
        </div>
      </div>

      {/* Statistics Card */}
      <div className="group rounded-2xl bg-[#0a0a0a] relative overflow-hidden flex-1 min-h-[250px] flex flex-col justify-end p-5 md:p-6 transition-colors duration-300" style={{ fontFamily: bodyFontFamily }}>
        
        <button 
          onClick={() => setActiveModal('tenM')}
          className="absolute top-4 right-4 z-50 p-2 bg-black/40 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:text-black scale-95 hover:scale-105"
        >
          <Pencil size={14} strokeWidth={2} />
        </button>

        {mediaUrls.tenMVideo && (
          <video 
            src={mediaUrls.tenMVideo} 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover opacity-70"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
        
        <div className="relative z-10 text-center w-full">
          <div 
            className="text-5xl md:text-7xl font-light tracking-tight drop-shadow-lg mb-1" 
            style={{ color: textColor, fontFamily: displayFontFamily }}
          >
            {stats}
          </div>
          <div className="text-xs md:text-sm text-white/60 uppercase tracking-widest">
            Raised for startups
          </div>
        </div>
      </div>

      {/* Shared Modals */}
      <MediaUploadModal 
        isOpen={activeModal === 'clientVoice'} 
        onClose={() => setActiveModal(null)} 
        onSave={(url) => updateMediaUrl('clientVoiceImage', url)} 
        mediaType="image" 
      />
      <MediaUploadModal 
        isOpen={activeModal === 'tenM'} 
        onClose={() => setActiveModal(null)} 
        onSave={(url) => updateMediaUrl('tenMVideo', url)} 
        mediaType="video" 
      />
    </div>
  );
};

export default PortfolioCardColumn2;