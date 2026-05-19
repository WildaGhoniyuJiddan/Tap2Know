import React from 'react';
import { LayoutDashboard, Image as ImageIcon, Briefcase, Settings2 } from 'lucide-react';

const MobileSidebarDock = ({ onNavClick }) => {
  const navItems = [
    { id: 'layout', icon: LayoutDashboard, label: 'Layout' },
    { id: 'media', icon: ImageIcon, label: 'Media' },
    { id: 'career', icon: Briefcase, label: 'Career' },
    { id: 'settings', icon: Settings2, label: 'Settings' },
  ];

  return (
    <div className="fixed bottom-0 inset-x-0 z-[60] bg-black/95 backdrop-blur-md border-t border-white/10 lg:hidden pb-safe">
      <div className="flex items-center justify-around p-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onNavClick(item.id)}
              className="flex flex-col items-center gap-1.5 p-2 text-white/50 hover:text-white transition-colors active:scale-95"
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium tracking-wide">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileSidebarDock;