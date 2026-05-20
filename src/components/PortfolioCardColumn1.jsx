import React, { useState } from 'react';
import { Sparkles, Pencil, ArrowUpRight } from 'lucide-react';
import { useEditor } from '../context/EditorContext.jsx';
import MediaUploadModal from './MediaUploadModal.jsx';

const PortfolioCardColumn1 = () => {
  const { bodyFontFamily, textColor, careerData, careerGridLayout, mediaUrls, updateMediaUrl, isPublic } = useEditor();
  const [modalOpen, setModalOpen] = useState(false);

  const getGridClass = () => {
    switch (careerGridLayout) {
      case '4-col': return 'grid-cols-[auto_auto_1fr_auto]';
      case '3-col': return 'grid-cols-[auto_1fr_auto]';
      case '2-col': return 'grid-cols-[auto_1fr]';
      case '1-col': return 'grid-cols-1 gap-1';
      default: return 'grid-cols-[auto_auto_1fr_auto]';
    }
  };

  return (
    <>
      <div className="group rounded-2xl bg-[#0a0a0a] relative overflow-hidden h-full min-h-[400px] flex flex-col justify-end p-5 md:p-6 lg:p-8 transition-colors duration-300" style={{ fontFamily: bodyFontFamily }}>
        
        {!isPublic && (
          <button 
            onClick={() => setModalOpen(true)}
            className="absolute top-4 right-4 z-50 p-2.5 bg-black/50 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:text-black scale-95 hover:scale-105"
            aria-label="Edit background video"
          >
            <Pencil size={16} strokeWidth={2} />
          </button>
        )}

        {mediaUrls.backgroundVideo && (
          (() => {
            const isGif = mediaUrls.backgroundVideo.toLowerCase().endsWith('.gif') || mediaUrls.backgroundVideo.toLowerCase().includes('.gif');
            if (isGif) {
              return (
                <img 
                  src={mediaUrls.backgroundVideo} 
                  alt="Background" 
                  className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
              );
            }
            return (
              <video 
                src={mediaUrls.backgroundVideo} 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              />
            );
          })()
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

        <div className="relative z-10 w-full mt-auto">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="h-3 w-3 stroke-[1.5px]" style={{ color: textColor }} />
            <span className="uppercase tracking-[0.22em] text-[11px] font-medium" style={{ color: textColor }}>BACKGROUND</span>
            <Sparkles className="h-3 w-3 stroke-[1.5px]" style={{ color: textColor }} />
          </div>

          <div className="space-y-4">
            {careerData.map((item) => (
              <div key={item.id} className={`grid ${getGridClass()} items-center gap-3 md:gap-4 text-xs md:text-sm`}>
                <span className="font-medium" style={{ color: textColor }}>{item.role}</span>
                
                {careerGridLayout === '4-col' && (
                  <Sparkles className="h-3 w-3 text-white/40 justify-self-center hidden sm:block" />
                )}
                
                {(careerGridLayout === '4-col' || careerGridLayout === '3-col' || careerGridLayout === '2-col') && (
                  <div className="flex items-center gap-2 truncate">
                    <span className="text-white/60 truncate">{item.description}</span>
                    {item.url && (
                      <a href={item.url} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-white/80 hover:text-white px-2 py-0.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors shrink-0">
                        View <ArrowUpRight className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                )}
                
                {(careerGridLayout === '4-col' || careerGridLayout === '3-col') && (
                  <span className="text-white/40 text-right">{item.year}</span>
                )}

                {careerGridLayout === '1-col' && (
                  <div className="flex items-center justify-between text-white/60 w-full pl-2">
                    <div className="flex items-center gap-2 truncate">
                      <span className="truncate">{item.company} — {item.description}</span>
                      {item.url && (
                        <a href={item.url} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-white/80 hover:text-white px-2 py-0.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors shrink-0">
                          View <ArrowUpRight className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                    <span className="shrink-0 text-[10px] ml-2">{item.year}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <MediaUploadModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        onSave={(url) => updateMediaUrl('backgroundVideo', url)} 
        mediaType="video" 
      />
    </>
  );
};

export default PortfolioCardColumn1;