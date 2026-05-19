import React from 'react';
import { useEditor } from '../context/EditorContext.jsx';

const PortfolioCardCustom = ({ card }) => {
  const { bodyFont, cardColor, textColor } = useEditor();
  const { html } = card.content;

  return (
    <div 
      className="w-full h-full relative overflow-hidden rounded-2xl p-6 md:p-8 noise-overlay" 
      style={{ backgroundColor: cardColor, fontFamily: bodyFont, color: textColor }}
      dangerouslySetInnerHTML={{ __html: html || '<div class="opacity-50 text-sm">Custom HTML Content</div>' }}
    />
  );
};

export default PortfolioCardCustom;