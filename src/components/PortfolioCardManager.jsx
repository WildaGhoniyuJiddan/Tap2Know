import React, { useRef, useState } from 'react';
import { useEditor } from '../context/EditorContext.jsx';
import PortfolioCardImage from './PortfolioCardImage.jsx';
import PortfolioCardText from './PortfolioCardText.jsx';
import PortfolioCardStats from './PortfolioCardStats.jsx';
import PortfolioCardQuote from './PortfolioCardQuote.jsx';
import PortfolioCardContact from './PortfolioCardContact.jsx';
import PortfolioCardSocial from './PortfolioCardSocial.jsx';
import PortfolioCardCustom from './PortfolioCardCustom.jsx';
import PortfolioCardForm from './PortfolioCardForm.jsx';
import { Pencil, GripVertical, X, Plus } from 'lucide-react';

const CardRenderer = ({ card }) => {
  switch (card.type) {
    case 'image': return <PortfolioCardImage card={card} />;
    case 'text': return <PortfolioCardText card={card} />;
    case 'stats': return <PortfolioCardStats card={card} />;
    case 'quote': return <PortfolioCardQuote card={card} />;
    case 'contact': return <PortfolioCardContact card={card} />;
    case 'social': return <PortfolioCardSocial card={card} />;
    case 'custom': return <PortfolioCardCustom card={card} />;
    default: return <div className="p-4 bg-zinc-900 rounded-xl">Unknown Card Type</div>;
  }
};

const getColSpanClass = (width) => {
  switch (width) {
    case 1: return 'md:col-span-1';
    case 2: return 'md:col-span-2';
    case 3: return 'md:col-span-3';
    case 4: return 'md:col-span-4';
    default: return 'md:col-span-1';
  }
};

const PortfolioCardManager = ({ children }) => {
  const { portfolioCards, reorderCard, deleteCard, updateCard, isPublic } = useEditor();
  const [editingCard, setEditingCard] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  
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
      reorderCard(dragItem.current, dragOverItem.current);
    }
    dragItem.current = null;
    dragOverItem.current = null;
  };

  const handleEdit = (card) => {
    setEditingCard(card);
    setIsFormOpen(true);
  };

  const handleSave = (data) => {
    updateCard(data.id, data);
  };

  const sortedCards = [...portfolioCards].sort((a, b) => a.order - b.order);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 auto-rows-[minmax(150px,auto)]" onDragOver={(e) => e.preventDefault()}>
        {/* Fixed Background Card (Column 1) */}
        <div className="col-span-1 md:col-span-2 lg:col-span-1 row-span-2 h-full">
          {children}
        </div>

        {/* Dynamic Cards */}
        {sortedCards.map((card, index) => (
          <div 
            key={card.id} 
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragEnter={(e) => handleDragEnter(e, index)}
            onDragEnd={handleDragEnd}
            className={`
              group relative h-full transition-all duration-300
              col-span-1 ${getColSpanClass(card.width)} 
              ${card.height === 'extra-tall' ? 'row-span-3' : card.height === 'tall' ? 'row-span-2' : 'row-span-1'}
            `}
          >
            {/* Edit Overlays */}
            {!isPublic && (
              <div className="absolute top-4 right-4 z-50 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="cursor-grab p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-black active:cursor-grabbing">
                  <GripVertical size={14} />
                </div>
                <button onClick={() => handleEdit(card)} className="p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-black">
                  <Pencil size={14} />
                </button>
                <button onClick={() => deleteCard(card.id)} className="p-2 bg-red-500/80 backdrop-blur-md rounded-full text-white hover:bg-red-600">
                  <X size={14} />
                </button>
              </div>
            )}

            <CardRenderer card={card} />
          </div>
        ))}
      </div>

      <PortfolioCardForm 
        isOpen={isFormOpen} 
        onClose={() => { setIsFormOpen(false); setEditingCard(null); }} 
        onSave={handleSave} 
        initialData={editingCard} 
      />
    </>
  );
};

export default PortfolioCardManager;