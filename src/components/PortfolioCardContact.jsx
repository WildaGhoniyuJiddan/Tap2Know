import React from 'react';
import { useEditor } from '../context/EditorContext.jsx';
import { ArrowUpRight, Mail, Phone, Github, Twitter, Linkedin } from 'lucide-react';

const PortfolioCardContact = ({ card }) => {
  const { bodyFont, cardColor, textColor } = useEditor();
  const { email, phone, socialLinks } = card.content;

  const getIcon = (platform) => {
    switch(platform?.toLowerCase()) {
      case 'github': return <Github className="w-4 h-4" />;
      case 'twitter': return <Twitter className="w-4 h-4" />;
      case 'linkedin': return <Linkedin className="w-4 h-4" />;
      default: return <ArrowUpRight className="w-4 h-4" />;
    }
  };

  return (
    <div className="w-full h-full relative overflow-hidden rounded-2xl p-6 md:p-8 flex flex-col justify-between noise-overlay" style={{ backgroundColor: cardColor, fontFamily: bodyFont }}>
      <div className="relative z-10">
        <div className="uppercase tracking-[0.22em] text-[11px] font-medium opacity-70 mb-6" style={{ color: textColor }}>
          REACH ME
        </div>
        
        <div className="space-y-4">
          {email && (
            <a href={`mailto:${email}`} className="flex items-center gap-3 group w-fit">
              <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                <Mail className="w-4 h-4" style={{ color: textColor }} />
              </div>
              <span className="text-sm md:text-base font-medium" style={{ color: textColor }}>{email}</span>
            </a>
          )}
          {phone && (
            <a href={`tel:${phone}`} className="flex items-center gap-3 group w-fit">
              <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                <Phone className="w-4 h-4" style={{ color: textColor }} />
              </div>
              <span className="text-sm md:text-base font-medium opacity-80" style={{ color: textColor }}>{phone}</span>
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