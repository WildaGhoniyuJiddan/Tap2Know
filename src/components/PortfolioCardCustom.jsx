import React from 'react';
import { useEditor } from '../context/EditorContext.jsx';

const PortfolioCardCustom = ({ card }) => {
  const { bodyFontFamily, cardColor, textColor, blur, transparency } = useEditor();
  const { html } = card.content;

  const transVal = (transparency ?? 0.1) <= 1 ? (transparency ?? 0.1) * 100 : transparency;
  const opacityHex = Math.round((100 - transVal) * 2.55).toString(16).padStart(2, '0');

  return (
    <div 
      className="w-full h-full relative overflow-hidden rounded-2xl p-6 md:p-8 noise-overlay" 
      style={{ 
        backgroundColor: `${cardColor || '#111111'}${opacityHex}`, 
        backdropFilter: `blur(${blur ?? 4}px)`,
        WebkitBackdropFilter: `blur(${blur ?? 4}px)`,
        fontFamily: bodyFontFamily,
        color: textColor 
      }}
      dangerouslySetInnerHTML={{ __html: html || '<div class="opacity-50 text-sm">Custom HTML Content</div>' }}
    />
  );
};

export default PortfolioCardCustom;