import React, { useRef, useState } from 'react';
import { useEditor } from '../context/EditorContext.jsx';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { GripVertical, X, Plus } from 'lucide-react';

const CareerTimelineEditor = () => {
  const { careerData, deleteCareer, updateCareer, reorderCareer, addCareer } = useEditor();

  const handleAddNew = () => {
    addCareer({
      role: '',
      company: '',
      year: '',
      description: '',
      url: '',
      source: 'manual'
    });
  };
  
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const handleDragStart = (e, index) => {
    dragItem.current = index;
    e.dataTransfer.effectAllowed = "move";
    e.target.style.opacity = '0.5';
  };

  const handleDragEnter = (e, index) => {
    dragOverItem.current = index;
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = '1';
    if (dragItem.current !== null && dragOverItem.current !== null && dragItem.current !== dragOverItem.current) {
      reorderCareer(dragItem.current, dragOverItem.current);
    }
    dragItem.current = null;
    dragOverItem.current = null;
  };

  return (
    <div className="space-y-6">
      {/* Add New Career Button */}
      <Button onClick={handleAddNew} variant="outline" className="w-full border-dashed border-white/20 bg-transparent text-white/70 hover:text-white hover:bg-white/5 h-10 text-xs">
        <Plus size={14} className="mr-2" /> Add New Career
      </Button>

      {/* Career Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" onDragOver={(e) => e.preventDefault()}>
        {careerData.map((item, index) => (
          <div 
            key={item.id} 
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragEnter={(e) => handleDragEnter(e, index)}
            onDragEnd={handleDragEnd}
            className="p-3 bg-white/5 rounded-xl border border-white/10 relative flex flex-col gap-3 group transition-colors hover:bg-white/10"
          >
            <div className="flex items-center justify-between mb-1">
              <div className="cursor-grab text-white/30 hover:text-white/70 active:cursor-grabbing">
                <GripVertical size={16} />
              </div>
              <button 
                onClick={() => deleteCareer(item.id)}
                className="p-1 bg-red-500/20 text-red-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white"
              >
                <X size={12} />
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="space-y-1">
                <Label className="text-[10px] text-white/60">Position</Label>
                <Input 
                  value={item.role} 
                  onChange={(e) => updateCareer(item.id, { role: e.target.value })} 
                  className="h-8 bg-black/40 border-white/10 text-xs text-white" 
                />
              </div>
              <div className="space-y-1">
                <Label className="text-[10px] text-white/60">Company</Label>
                <Input 
                  value={item.company} 
                  onChange={(e) => updateCareer(item.id, { company: e.target.value })} 
                  className="h-8 bg-black/40 border-white/10 text-xs text-white" 
                />
              </div>
              <div className="space-y-1">
                <Label className="text-[10px] text-white/60">Year</Label>
                <Input 
                  value={item.year} 
                  onChange={(e) => updateCareer(item.id, { year: e.target.value })} 
                  className="h-8 bg-black/40 border-white/10 text-xs text-white" 
                />
              </div>
              <div className="space-y-1">
                <Label className="text-[10px] text-white/60">Detail</Label>
                <Input 
                  value={item.description} 
                  onChange={(e) => updateCareer(item.id, { description: e.target.value })} 
                  className="h-8 bg-black/40 border-white/10 text-xs text-white" 
                />
              </div>
              <div className="space-y-1">
                <Label className="text-[10px] text-white/60">Link / URL (Optional)</Label>
                <Input 
                  value={item.url || ''} 
                  onChange={(e) => updateCareer(item.id, { url: e.target.value })} 
                  placeholder="https://"
                  className="h-8 bg-black/40 border-white/10 text-xs text-white" 
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareerTimelineEditor;