import React from 'react';
import { Eye, Edit } from 'lucide-react';

const MobilePreviewToggle = ({ currentMode, onToggle }) => {
  return (
    <div className="fixed top-4 right-4 z-[60] lg:hidden">
      <button
        onClick={() => onToggle(currentMode === 'editor' ? 'preview' : 'editor')}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-white text-black shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
        aria-label="Toggle mobile view"
      >
        {currentMode === 'editor' ? (
          <Eye className="w-5 h-5" />
        ) : (
          <Edit className="w-5 h-5" />
        )}
      </button>
    </div>
  );
};

export default MobilePreviewToggle;