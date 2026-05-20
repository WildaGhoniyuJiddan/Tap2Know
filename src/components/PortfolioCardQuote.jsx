import React from 'react';
import { useEditor } from '../context/EditorContext.jsx';
import { Quote } from 'lucide-react';

const PortfolioCardQuote = ({ card }) => {
  const { bodyFontFamily, textColor, cardColor, blur, transparency } = useEditor();
  const { quote, attribution, bgColor } = card.content;

  const baseColor = bgColor || cardColor || '#324444';
  const transVal = (transparency ?? 0.1) <= 1 ? (transparency ?? 0.1) * 100 : transparency;
  const opacityHex = Math.round((100 - transVal) * 2.55).toString(16).padStart(2, '0');

  return (
    <div 
      className="w-full h-full relative overflow-hidden rounded-2xl p-6 md:p-8 flex flex-col justify-center noise-overlay" 
      style={{ 
        backgroundColor: `${baseColor}${opacityHex}`, 
        backdropFilter: `blur(${blur ?? 4}px)`,
        WebkitBackdropFilter: `blur(${blur ?? 4}px)`,
        fontFamily: bodyFontFamily,
        color: textColor
      }}
    >
      <div className="relative z-10">
        <Quote className="w-8 h-8 mb-4 opacity-20" style={{ color: textColor }} />
        <p className="text-lg md:text-xl italic leading-relaxed mb-6 font-medium" style={{ color: textColor }}>
          "{quote}"
        </p>
        <p className="text-xs md:text-sm uppercase tracking-wider opacity-70 font-semibold" style={{ color: textColor }}>
          — {attribution}
        </p>
      </div>
    </div>
  );
};

export default PortfolioCardQuote;