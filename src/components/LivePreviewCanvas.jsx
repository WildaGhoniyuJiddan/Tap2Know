"use client";
import React from 'react';
import { useEditor } from '../context/EditorContext.jsx';
import PortfolioCardColumn1 from './PortfolioCardColumn1.jsx';
import PortfolioCardManager from './PortfolioCardManager.jsx';

const LivePreviewCanvas = () => {
  const { bgColor, displayFontFamily, bodyFontFamily, header, description, blur, transparency, mediaUrls } = useEditor();

  return (
    <div 
      className="min-h-full rounded-3xl overflow-hidden transition-colors duration-300 pb-20 lg:pb-0"
      style={{ backgroundColor: bgColor }}
    >
      <div 
        className="px-4 sm:px-6 md:px-10 lg:px-14 py-8 sm:py-10 md:py-12"
        style={{
          '--glass-blur': blur,
          '--glass-transparency': transparency
        }}
      >
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-14">
          <div className="max-w-3xl flex flex-col gap-4">
            {mediaUrls?.profilePicture && (
              <img src={mediaUrls.profilePicture} alt="Profile" className="w-20 h-20 rounded-full object-cover border-2 border-white/20" />
            )}
            <h1 
              className="text-[28px] sm:text-3xl md:text-4xl lg:text-[44px] leading-[1.15] text-white font-normal tracking-tight mb-2 transition-all duration-300"
              style={{ fontFamily: displayFontFamily }}
            >
              {header}
            </h1>
            <p 
              className="text-sm md:text-[15px] leading-[1.6] text-white/60 transition-all duration-300"
              style={{ fontFamily: bodyFontFamily }}
            >
              {description}
            </p>
          </div>
          
          <button 
            className="shrink-0 liquid-glass rounded-full px-6 py-3 text-sm font-medium text-white transition-all hover:bg-white/10 active:scale-[0.98]"
            style={{ fontFamily: bodyFontFamily }}
          >
            Let's Team Up Today
          </button>
        </div>

        {/* Dynamic Portfolio Grid */}
        <PortfolioCardManager>
          <PortfolioCardColumn1 />
        </PortfolioCardManager>
      </div>
    </div>
  );
};

export default LivePreviewCanvas;