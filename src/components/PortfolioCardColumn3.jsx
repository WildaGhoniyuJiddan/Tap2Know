import React, { useState } from 'react';
import { ArrowUpRight, Figma, Framer, Palette, PenTool, Layers, Type, Aperture, Chrome, Camera, Brush, Box, Wand2, Pencil } from 'lucide-react';
import { useEditor } from '@/context/EditorContext.jsx';
import MediaUploadModal from './MediaUploadModal.jsx';

const row1Icons = [Figma, Framer, Palette, PenTool, Layers, Type, Aperture, Chrome];
const row2Icons = [Camera, Brush, Box, Wand2, Figma, Framer, Type, Layers];

const extendedRow1 = [...row1Icons, ...row1Icons];
const extendedRow2 = [...row2Icons, ...row2Icons];

const PortfolioCardColumn3 = () => {
  const { cardColor, textColor, bodyFontFamily, email, phone, mediaUrls, updateMediaUrl } = useEditor();
  const [activeModal, setActiveModal] = useState(null); // 'dailySoftware' | 'reachMe' | null

  return (
    <div className="flex flex-col gap-4 md:gap-5 h-full">
      {/* Daily Software Card */}
      <div className="group rounded-2xl bg-[#0a0a0a] relative overflow-hidden flex-1 min-h-[300px] flex flex-col justify-center py-8 transition-colors duration-300" style={{ fontFamily: bodyFontFamily }}>
        
        <button 
          onClick={() => setActiveModal('dailySoftware')}
          className="absolute top-4 right-4 z-50 p-2 bg-black/40 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:text-black scale-95 hover:scale-105"
        >
          <Pencil size={14} strokeWidth={2} />
        </button>

        {mediaUrls.dailySoftwareVideo && (
          <video 
            src={mediaUrls.dailySoftwareVideo} 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
        )}
        
        <div className="absolute top-6 left-6 z-10">
          <span className="uppercase tracking-[0.22em] text-[11px] font-medium text-white/70">DAILY SOFTWARE</span>
        </div>

        {/* Marquees */}
        <div className="relative z-10 w-full overflow-hidden mt-6 flex flex-col gap-3">
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />
          
          {/* Row 1 */}
          <div className="flex w-[200%] animate-marquee-left">
            <div className="flex w-1/2 justify-around items-center px-2">
              {extendedRow1.slice(0, row1Icons.length).map((Icon, idx) => (
                <div key={`r1-1-${idx}`} className="h-14 w-14 md:h-16 md:w-16 rounded-xl liquid-glass flex items-center justify-center mx-1">
                  <Icon className="h-6 w-6 text-white/80" strokeWidth={1.5} />
                </div>
              ))}
            </div>
            <div className="flex w-1/2 justify-around items-center px-2">
              {extendedRow1.slice(row1Icons.length).map((Icon, idx) => (
                <div key={`r1-2-${idx}`} className="h-14 w-14 md:h-16 md:w-16 rounded-xl liquid-glass flex items-center justify-center mx-1">
                  <Icon className="h-6 w-6 text-white/80" strokeWidth={1.5} />
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex w-[200%] animate-marquee-right">
            <div className="flex w-1/2 justify-around items-center px-2">
              {extendedRow2.slice(0, row2Icons.length).map((Icon, idx) => (
                <div key={`r2-1-${idx}`} className="h-14 w-14 md:h-16 md:w-16 rounded-xl liquid-glass flex items-center justify-center mx-1">
                  <Icon className="h-6 w-6 text-white/80" strokeWidth={1.5} />
                </div>
              ))}
            </div>
            <div className="flex w-1/2 justify-around items-center px-2">
              {extendedRow2.slice(row2Icons.length).map((Icon, idx) => (
                <div key={`r2-2-${idx}`} className="h-14 w-14 md:h-16 md:w-16 rounded-xl liquid-glass flex items-center justify-center mx-1">
                  <Icon className="h-6 w-6 text-white/80" strokeWidth={1.5} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Reach Me Card */}
      <div 
        className="group rounded-2xl p-5 md:p-6 relative overflow-hidden noise-overlay shrink-0 flex items-center justify-between transition-colors duration-300"
        style={{ backgroundColor: cardColor, fontFamily: bodyFontFamily }}
      >
        <button 
          onClick={() => setActiveModal('reachMe')}
          className="absolute top-2 right-16 z-50 p-2 bg-black/40 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:text-black scale-95 hover:scale-105"
        >
          <Pencil size={14} strokeWidth={2} />
        </button>

        {mediaUrls.reachMeImage && (
          <div className="absolute inset-0 z-0 opacity-20 Mix-blend-overlay pointer-events-none">
            <img src={mediaUrls.reachMeImage} alt="" className="w-full h-full object-cover" />
          </div>
        )}

        <div className="relative z-10">
          <div className="uppercase tracking-[0.22em] text-[11px] font-medium text-white/70 mb-3">REACH ME</div>
          <div className="text-[14px] md:text-[15px] font-medium leading-relaxed" style={{ color: textColor }}>
            <div>{email}</div>
            <div className="text-white/60">{phone}</div>
          </div>
        </div>
        
        <button 
          className="relative z-10 h-10 w-10 md:h-12 md:w-12 rounded-full liquid-glass flex items-center justify-center transition-transform hover:scale-110 active:scale-95 group/btn"
          aria-label="Contact me"
        >
          <ArrowUpRight className="h-5 w-5 text-white transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" strokeWidth={2} />
        </button>
      </div>

      <MediaUploadModal 
        isOpen={activeModal === 'dailySoftware'} 
        onClose={() => setActiveModal(null)} 
        onSave={(url) => updateMediaUrl('dailySoftwareVideo', url)} 
        mediaType="video" 
      />
      <MediaUploadModal 
        isOpen={activeModal === 'reachMe'} 
        onClose={() => setActiveModal(null)} 
        onSave={(url) => updateMediaUrl('reachMeImage', url)} 
        mediaType="image" 
      />
    </div>
  );
};

export default PortfolioCardColumn3;