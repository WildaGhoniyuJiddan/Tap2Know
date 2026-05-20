import React from 'react';
import { useEditor } from '../context/EditorContext.jsx';

const PortfolioCardText = ({ card }) => {
  const { bodyFontFamily, displayFontFamily, cardColor, textColor, blur, transparency } = useEditor();
  const { heading, description, mediaUrl } = card.content;

  const transVal = (transparency ?? 0.1) <= 1 ? (transparency ?? 0.1) * 100 : transparency;
  const opacityHex = Math.round((100 - transVal) * 2.55).toString(16).padStart(2, '0');

  return (
    <div 
      className="w-full h-full relative overflow-hidden rounded-2xl p-6 md:p-8 flex flex-col justify-between noise-overlay" 
      style={{ 
        backgroundColor: `${cardColor || '#111111'}${opacityHex}`, 
        backdropFilter: `blur(${blur ?? 4}px)`,
        WebkitBackdropFilter: `blur(${blur ?? 4}px)`,
        fontFamily: bodyFontFamily,
        color: textColor
      }}
    >
      <div className="relative z-10">
        {heading && (
          <h3 className="text-2xl md:text-3xl font-medium mb-3 leading-tight" style={{ color: textColor, fontFamily: displayFontFamily }}>
            {heading}
          </h3>
        )}
        {description && (
          <p className="text-sm md:text-base opacity-80 leading-relaxed" style={{ color: textColor }}>
            {description}
          </p>
        )}
      </div>
      {mediaUrl && (
        <div className="relative z-10 mt-6 rounded-xl overflow-hidden h-32 md:h-48">
          <img src={mediaUrl} alt={heading || 'Text Card Image'} className="w-full h-full object-cover" />
        </div>
      )}
    </div>
  );
};

export default PortfolioCardText;