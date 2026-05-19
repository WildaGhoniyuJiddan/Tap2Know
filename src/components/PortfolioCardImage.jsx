import React from 'react';
import { useEditor } from '../context/EditorContext.jsx';

const PortfolioCardImage = ({ card }) => {
  const { bodyFont, textColor } = useEditor();
  const { mediaUrl, overlayText } = card.content;

  const isVideo = mediaUrl?.match(/\.(mp4|webm|ogg)$/i);

  return (
    <div className="w-full h-full relative overflow-hidden rounded-2xl bg-black group" style={{ fontFamily: bodyFont }}>
      {mediaUrl && (
        isVideo ? (
          <video src={mediaUrl} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-105" />
        ) : (
          <img src={mediaUrl} alt={overlayText || 'Portfolio Image'} className="absolute inset-0 w-full h-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-105" />
        )
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
      
      {overlayText && (
        <div className="absolute bottom-6 left-6 z-10">
          <span className="uppercase tracking-[0.22em] text-[11px] font-medium" style={{ color: textColor }}>
            {overlayText}
          </span>
        </div>
      )}
    </div>
  );
};

export default PortfolioCardImage;