import React from 'react';
import { useEditor } from '../context/EditorContext.jsx';
import { Quote } from 'lucide-react';

const PortfolioCardQuote = ({ card }) => {
  const { bodyFont, textColor } = useEditor();
  const { quote, attribution, bgColor } = card.content;

  return (
    <div className="w-full h-full relative overflow-hidden rounded-2xl p-6 md:p-8 flex flex-col justify-center noise-overlay" style={{ backgroundColor: bgColor || '#324444', fontFamily: bodyFont }}>
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