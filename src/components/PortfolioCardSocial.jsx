import React from 'react';
import { useEditor } from '../context/EditorContext.jsx';
import { Linkedin, Instagram, Twitter, Youtube, Music2, ArrowUpRight, Link as LinkIcon } from 'lucide-react';

const extractHandle = (url) => {
  if (!url) return '';
  try {
    const urlObj = new URL(url);
    let path = urlObj.pathname.replace(/\/$/, '');
    const parts = path.split('/');
    
    if (urlObj.hostname.includes('linkedin.com')) {
      return parts[parts.length - 1] ? `@${parts[parts.length - 1]}` : 'LinkedIn Profile';
    } else if (urlObj.hostname.includes('instagram.com')) {
      return parts[parts.length - 1] ? `@${parts[parts.length - 1]}` : 'Instagram Profile';
    } else if (urlObj.hostname.includes('twitter.com') || urlObj.hostname.includes('x.com')) {
      return parts[parts.length - 1] ? `@${parts[parts.length - 1]}` : 'X Profile';
    } else if (urlObj.hostname.includes('tiktok.com')) {
      return parts[parts.length - 1] ? `${parts[parts.length - 1]}` : 'TikTok Profile';
    } else if (urlObj.hostname.includes('youtube.com')) {
      const handle = parts.find(p => p.startsWith('@'));
      if (handle) return handle;
      return parts[parts.length - 1] ? `${parts[parts.length - 1]}` : 'YouTube Channel';
    } else {
      return urlObj.hostname;
    }
  } catch (e) {
    return 'Visit Link';
  }
};

const getPlatformStyle = (url) => {
  const baseStyle = { bg: '#111111', text: '#ffffff', border: '1px solid #222222' };
  if (!url) return { ...baseStyle, type: 'generic', icon: <LinkIcon size={20} />, accent: '#e5e5e5', shadow: '3px 3px 0px #333' };
  
  if (url.includes('linkedin.com')) {
    return { ...baseStyle, type: 'linkedin', icon: <Linkedin size={20} />, accent: '#0A66C2', shadow: '3px 3px 0px #0A66C2' };
  } else if (url.includes('instagram.com')) {
    return { ...baseStyle, type: 'instagram', icon: <Instagram size={20} />, accent: '#E1306C', shadow: '3px 3px 0px #E1306C' };
  } else if (url.includes('twitter.com') || url.includes('x.com')) {
    return { ...baseStyle, type: 'x', icon: <Twitter size={20} />, accent: '#ffffff', shadow: '3px 3px 0px #ffffff' };
  } else if (url.includes('tiktok.com')) {
    return { ...baseStyle, type: 'tiktok', icon: <Music2 size={20} />, accent: '#00f2fe', shadow: '3px 3px 0px #00f2fe, -3px -3px 0px #fe0979' };
  } else if (url.includes('youtube.com')) {
    return { ...baseStyle, type: 'youtube', icon: <Youtube size={20} />, accent: '#FF0000', shadow: '3px 3px 0px #FF0000' };
  }
  
  return { ...baseStyle, type: 'generic', icon: <LinkIcon size={20} />, accent: '#e5e5e5', shadow: '3px 3px 0px #333' };
};

const PortfolioCardSocial = ({ card }) => {
  const { bodyFontFamily, mediaUrls, cardColor, textColor, blur, transparency } = useEditor();
  const { url, subLabel, customLabel } = card.content;
  
  const handle = customLabel || extractHandle(url);
  const style = getPlatformStyle(url);
  
  const profilePic = mediaUrls?.profilePicture;

  const alphaVal = (transparency ?? 0.1) <= 1 ? (transparency ?? 0.1) * 100 : transparency;
  const alphaHex = Math.round(alphaVal * 2.55).toString(16).padStart(2, '0');

  return (
    <a 
      href={url || '#'} 
      target="_blank" 
      rel="noreferrer"
      className="block w-full h-full relative overflow-hidden rounded-2xl group transition-all duration-300 hover:scale-[1.02] active:scale-95" 
      style={{ 
        backgroundColor: `${cardColor || style.bg || '#111111'}${alphaHex}`, 
        backdropFilter: `blur(${blur ?? 4}px)`,
        WebkitBackdropFilter: `blur(${blur ?? 4}px)`,
        fontFamily: bodyFontFamily,
        border: style.border || 'none',
        boxShadow: style.shadow || 'none',
        color: textColor
      }}
    >
      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="h-full p-6 md:p-8 flex flex-col justify-between relative z-10">
        <div className="flex justify-between items-start">
          <div className="relative">
            {profilePic ? (
              <img src={profilePic} alt="Profile" className="w-12 h-12 rounded-full object-cover border-[1.5px] border-zinc-800" />
            ) : (
              <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center border-[1.5px] border-zinc-700">
                <span className="text-white text-lg font-bold">@</span>
              </div>
            )}
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-[2.5px] border-[#111111] animate-pulse" />
          </div>
          
          <div className="p-2.5 rounded-full border border-zinc-800 bg-zinc-900 shadow-sm transition-colors" style={{ color: style.accent }}>
            {style.icon}
          </div>
        </div>

        <div className="mt-6 w-full min-w-0">
          <h3 className="text-lg md:text-xl font-bold tracking-tight mb-1 truncate" style={{ color: style.text }}>
            {handle}
          </h3>
          <div className="flex items-center justify-between group-hover:translate-x-1 transition-transform min-w-0">
            <p className="text-xs md:text-sm font-medium truncate pr-4" style={{ color: style.accent }}>
              {subLabel || 'Visit Link'}
            </p>
            <ArrowUpRight className="w-4 h-4 transition-all shrink-0" style={{ color: style.accent }} />
          </div>
        </div>
      </div>
    </a>
  );
};

export default PortfolioCardSocial;
