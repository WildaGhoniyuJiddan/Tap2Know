import React from 'react';
import { useEditor } from '../context/EditorContext.jsx';
import { TrendingUp, Users, Award, BarChart3, Activity, Target, Zap, Star, Heart, Shield } from 'lucide-react';

const iconMap = {
  TrendingUp,
  Users,
  Award,
  BarChart3,
  Activity,
  Target,
  Zap,
  Star,
  Heart,
  Shield
};

const PortfolioCardStats = ({ card }) => {
  const { bodyFontFamily, displayFontFamily, textColor, cardColor, blur, transparency } = useEditor();
  const { number, label, icon } = card.content;
  const IconComponent = icon && iconMap[icon] ? iconMap[icon] : null;

  const alphaVal = (transparency ?? 0.1) <= 1 ? (transparency ?? 0.1) * 100 : transparency;
  const alphaHex = Math.round(alphaVal * 2.55).toString(16).padStart(2, '0');

  return (
    <div 
      className="w-full h-full relative overflow-hidden rounded-2xl p-6 md:p-8 flex flex-col justify-center items-center text-center noise-overlay" 
      style={{ 
        backgroundColor: `${cardColor || '#111111'}${alphaHex}`, 
        backdropFilter: `blur(${blur ?? 4}px)`,
        WebkitBackdropFilter: `blur(${blur ?? 4}px)`,
        fontFamily: bodyFontFamily,
        color: textColor
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      
      <div className="relative z-10">
        {IconComponent && (
          <div className="mb-4 inline-flex p-3 rounded-full bg-white/10">
            <IconComponent className="w-6 h-6" style={{ color: textColor }} />
          </div>
        )}
        <div className="text-5xl md:text-7xl font-light tracking-tight drop-shadow-lg mb-2" style={{ color: textColor, fontFamily: displayFontFamily }}>
          {number}
        </div>
        <div className="text-xs md:text-sm uppercase tracking-widest opacity-60" style={{ color: textColor }}>
          {label}
        </div>
      </div>
    </div>
  );
};

export default PortfolioCardStats;