import React from 'react';
import { useEditor } from '../context/EditorContext.jsx';
import { ArrowUpRight, Mail, Phone, Github, Twitter, Linkedin } from 'lucide-react';

const PortfolioCardContact = ({ card }) => {
  const { bodyFontFamily, cardColor, textColor, blur, transparency } = useEditor();
  const { email, phone, socialLinks } = card.content;

  const alphaVal = (transparency ?? 0.1) <= 1 ? (transparency ?? 0.1) * 100 : transparency;
  const alphaHex = Math.round(alphaVal * 2.55).toString(16).padStart(2, '0');

  const getIcon = (platform) => {
    switch(platform?.toLowerCase()) {
      case 'github': return <Github className="w-4 h-4" />;
      case 'twitter': return <Twitter className="w-4 h-4" />;
      case 'linkedin': return <Linkedin className="w-4 h-4" />;
      default: return <ArrowUpRight className="w-4 h-4" />;
    }
  };

  return (
    <div 
      className="w-full h-full relative overflow-hidden rounded-2xl p-6 md:p-8 flex flex-col justify-between noise-overlay" 
      style={{ 
        backgroundColor: `${cardColor || '#111111'}${alphaHex}`, 
        backdropFilter: `blur(${blur ?? 4}px)`,
        WebkitBackdropFilter: `blur(${blur ?? 4}px)`,
        fontFamily: bodyFontFamily,
        color: textColor
      }}
    >
      <div className="relative z-10 w-full min-w-0">
        <div className="uppercase tracking-[0.22em] text-[11px] font-medium opacity-70 mb-6" style={{ color: textColor }}>
          REACH ME
        </div>
        
        <div className="space-y-4 w-full min-w-0">
          {email && (
            <a href={`mailto:${email}`} className="flex items-center gap-3 group w-fit max-w-full min-w-0">
              <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors shrink-0">
                <Mail className="w-4 h-4" style={{ color: textColor }} />
              </div>
              <span className="text-sm md:text-base font-medium truncate" style={{ color: textColor }}>{email}</span>
            </a>
          )}
          {phone && (
            <a href={`tel:${phone}`} className="flex items-center gap-3 group w-fit max-w-full min-w-0">
              <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors shrink-0">
                <Phone className="w-4 h-4" style={{ color: textColor }} />
              </div>
              <span className="text-sm md:text-base font-medium opacity-80 truncate" style={{ color: textColor }}>{phone}</span>
            </a>
          )}
        </div>
      </div>

      {socialLinks && socialLinks.length > 0 && (
        <div className="relative z-10 flex gap-3 mt-8">
          {socialLinks.map((link, idx) => (
            <a key={idx} href={link.url} target="_blank" rel="noreferrer" className="p-3 rounded-full bg-white/5 hover:bg-white/15 transition-colors" style={{ color: textColor }}>
              {getIcon(link.platform)}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default PortfolioCardContact;