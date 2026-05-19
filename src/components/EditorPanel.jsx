import React, { useState, useCallback } from 'react';
import { useEditor } from '../context/EditorContext.jsx';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { Image as ImageIcon, Video, Plus, GripVertical, Pencil, Copy, X, LogOut, ExternalLink, Check, Link2 } from 'lucide-react';
import { auth, signOut } from '../firebase/client';
import { useRouter } from 'next/navigation';
import CareerTimelineEditor from './CareerTimelineEditor.jsx';
import MediaUploadModal from './MediaUploadModal.jsx';
import PortfolioCardForm from './PortfolioCardForm.jsx';

const EditorPanel = () => {
  const {
    displayFont, setDisplayFont,
    bodyFont, setBodyFont,
    bgColor, setBgColor,
    cardColor, setCardColor,
    textColor, setTextColor,
    blur, setBlur,
    transparency, setTransparency,
    header, setHeader,
    description, setDescription,
    careerGridLayout, setCareerGridLayout,
    portfolioCards, setPortfolioCards, addCard, deleteCard, updateCard, reorderCard, updateMediaUrl,
    saveProfile, publishProfile, isSaving, isPublishing, mediaUrls, username
  } = useEditor();

  const router = useRouter();

  const [mediaModalOpen, setMediaModalOpen] = useState(false);
  const [activeMediaKey, setActiveMediaKey] = useState(null);
  const [activeMediaType, setActiveMediaType] = useState('image');

  const [cardFormOpen, setCardFormOpen] = useState(false);
  const [editingCard, setEditingCard] = useState(null);

  const [showPublishModal, setShowPublishModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const publicUrl = username ? `${typeof window !== 'undefined' ? window.location.origin : ''}/u/${username}` : '';

  const handlePublish = async () => {
    const success = await publishProfile();
    if (success) setShowPublishModal(true);
  };

  const handleSaveChanges = async () => {
    const success = await saveProfile();
    if (success) {
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openMediaModal = (key, type) => {
    setActiveMediaKey(key);
    setActiveMediaType(type);
    setMediaModalOpen(true);
  };

  const handleMediaSave = (url) => {
    if (activeMediaKey) updateMediaUrl(activeMediaKey, url);
  };

  const handleAddCard = () => {
    setEditingCard(null);
    setCardFormOpen(true);
  };

  const handleEditCard = (card) => {
    setEditingCard(card);
    setCardFormOpen(true);
  };

  const handleSaveCard = useCallback((data) => {
    if (editingCard) {
      updateCard(data.id, data);
    } else {
      const newCard = { ...data, id: `card-${Date.now()}`, order: portfolioCards.length };
      setPortfolioCards(prev => [...prev, newCard]);
    }
  }, [editingCard, updateCard, portfolioCards.length, setPortfolioCards]);

  return (
    <div className="space-y-10 text-white/90 pb-28 pt-4 lg:pt-0" id="editor-panel-root">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-xl font-bold mb-1 tracking-tight">Editor</h2>
          <div className="flex items-center gap-2 text-sm text-white/50">
            {username ? (
              <>
                <span>Logged in as <span className="text-white/80 font-medium">@{username}</span></span>
                <a
                  href={publicUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-[#ccff00]/70 hover:text-[#ccff00] transition-colors"
                >
                  <ExternalLink size={10} />
                  Live
                </a>
              </>
            ) : (
              'Customize your TAP2KNOW profile'
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            onClick={handlePublish} 
            disabled={isPublishing}
            className="bg-[#ccff00] hover:bg-[#b3e600] text-black font-bold text-xs uppercase tracking-wider px-6 h-9 rounded-sm shadow-[4px_4px_0px_#ffffff] active:translate-y-1 active:translate-x-1 active:shadow-[0px_0px_0px_#ffffff] transition-all"
          >
            {isPublishing ? 'PUBLISHING...' : 'PUBLISH'}
          </Button>
          <button
            onClick={async () => { await signOut(auth); router.replace('/login'); }}
            className="p-2 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
            title="Sign Out"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>

      {/* Publish Success Modal */}
      {showPublishModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={() => setShowPublishModal(false)}>
          <div className="relative w-full max-w-md mx-4 bg-zinc-950 border-2 border-zinc-800 rounded-2xl p-8 shadow-[8px_8px_0px_#ccff00]" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowPublishModal(false)} className="absolute top-4 right-4 p-1 text-zinc-500 hover:text-white transition-colors">
              <X size={18} />
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#ccff00]/10 border-2 border-[#ccff00]/30 flex items-center justify-center">
                <Check size={28} className="text-[#ccff00]" />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight font-['Anton']">Published!</h3>
              <p className="text-sm text-zinc-400 mt-1">Your profile is now live at:</p>
            </div>

            <div className="flex items-center gap-2 p-3 bg-zinc-900 rounded-lg border border-zinc-800 mb-6">
              <Link2 size={14} className="text-zinc-500 shrink-0" />
              <span className="text-sm font-mono text-white truncate flex-1">{publicUrl}</span>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleCopyLink}
                className="flex-1 flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase tracking-wider py-3 rounded-lg transition-all border border-zinc-700"
              >
                {copied ? <><Check size={14} /> Copied!</> : <><Copy size={14} /> Copy Link</>}
              </button>
              <a
                href={publicUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-[#ccff00] hover:bg-[#b3e600] text-black font-bold text-xs uppercase tracking-wider py-3 rounded-lg shadow-[3px_3px_0px_#ffffff] active:translate-y-0.5 active:translate-x-0.5 active:shadow-[0px_0px_0px_#ffffff] transition-all"
              >
                <ExternalLink size={14} /> Open Live
              </a>
            </div>
          </div>
        </div>
      )}

      <section id="settings" className="space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-white/70 border-b border-white/10 pb-2">1. Typography</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Display Font</Label>
            <select value={displayFont} onChange={(e) => setDisplayFont(e.target.value)} className="flex h-10 w-full items-center justify-between rounded-md border border-white/20 bg-black/40 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-white">
              <option value="Anton" className="bg-zinc-900">Anton</option>
              <option value="'Playfair Display'" className="bg-zinc-900">Playfair Display</option>
              <option value="Poppins" className="bg-zinc-900">Poppins</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label>Body Font</Label>
            <select value={bodyFont} onChange={(e) => setBodyFont(e.target.value)} className="flex h-10 w-full items-center justify-between rounded-md border border-white/20 bg-black/40 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-white">
              <option value="Inter" className="bg-zinc-900">Inter</option>
              <option value="Roboto" className="bg-zinc-900">Roboto</option>
              <option value="Lato" className="bg-zinc-900">Lato</option>
            </select>
          </div>
        </div>
      </section>

      <section id="layout" className="space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-white/70 border-b border-white/10 pb-2">2. Color & Layout</h3>
        <div className="flex flex-wrap gap-6 mb-6">
          <div className="flex items-center gap-3">
            <Label className="m-0">Background</Label>
            <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="h-8 w-8 rounded cursor-pointer bg-transparent border-0 p-0" />
          </div>
          <div className="flex items-center gap-3">
            <Label className="m-0">Card Base</Label>
            <input type="color" value={cardColor} onChange={(e) => setCardColor(e.target.value)} className="h-8 w-8 rounded cursor-pointer bg-transparent border-0 p-0" />
          </div>
          <div className="flex items-center gap-3">
            <Label className="m-0">Text Accent</Label>
            <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="h-8 w-8 rounded cursor-pointer bg-transparent border-0 p-0" />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Career Grid Layout</Label>
          <Select value={careerGridLayout} onValueChange={setCareerGridLayout}>
            <SelectTrigger className="bg-black/40 border-white/20 text-white">
              <SelectValue placeholder="Select layout" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
              <SelectItem value="4-col">4 Columns</SelectItem>
              <SelectItem value="3-col">3 Columns</SelectItem>
              <SelectItem value="2-col">2 Columns</SelectItem>
              <SelectItem value="1-col">1 Column</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-white/70 border-b border-white/10 pb-2">3. Liquid-Glass Effect</h3>
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between"><Label>Blur Intensity</Label><span className="text-xs text-white/50">{blur}px</span></div>
            <Slider value={[blur]} min={0} max={20} step={1} onValueChange={([val]) => setBlur(val)} className="[&_[role=slider]]:bg-white" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between"><Label>Transparency</Label><span className="text-xs text-white/50">{(transparency * 100).toFixed(0)}%</span></div>
            <Slider value={[transparency]} min={0} max={0.2} step={0.01} onValueChange={([val]) => setTransparency(val)} className="[&_[role=slider]]:bg-white" />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-white/70 border-b border-white/10 pb-2">4. Main Content</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Profile Picture</Label>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-zinc-800 border border-white/20 shrink-0">
                {mediaUrls.profilePicture ? (
                  <img src={mediaUrls.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-500"><ImageIcon size={20} /></div>
                )}
              </div>
              <Button onClick={() => openMediaModal('profilePicture', 'image')} variant="outline" className="bg-transparent border-white/20 text-white/70 hover:text-white h-9 text-xs flex-1">
                Change Picture
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Header Text</Label>
            <Textarea value={header} onChange={(e) => setHeader(e.target.value)} className="bg-white/5 border-white/20 resize-none text-white" />
          </div>
          <div className="space-y-2">
            <Label>Sub-description</Label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} className="bg-white/5 border-white/20 resize-none text-white" />
          </div>
        </div>
      </section>

      <section id="career" className="space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-white/70 border-b border-white/10 pb-2">5. Career Timeline</h3>
        <CareerTimelineEditor />
      </section>

      <section id="portfolio" className="space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-white/70 border-b border-white/10 pb-2">6. Portfolio Cards Management</h3>
        <div className="space-y-3">
          {[...portfolioCards].sort((a, b) => a.order - b.order).map((card, index) => (
            <div key={card.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10 group">
              <div className="flex items-center gap-3">
                <GripVertical className="w-4 h-4 text-white/30 cursor-grab" />
                <div>
                  <div className="text-sm font-medium">{card.title}</div>
                  <div className="text-[10px] text-white/50 uppercase tracking-wider">{card.type} • {card.width}-col • {card.height}</div>
                </div>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="icon" variant="ghost" onClick={() => handleEditCard(card)} className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10"><Pencil size={14} /></Button>
                <Button size="icon" variant="ghost" onClick={() => deleteCard(card.id)} className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-500/20"><X size={14} /></Button>
              </div>
            </div>
          ))}
          <Button onClick={handleAddCard} variant="outline" className="w-full border-dashed border-white/20 bg-transparent text-white/70 hover:text-white hover:bg-white/5 h-10 text-xs">
            <Plus size={14} className="mr-2" /> Add New Card
          </Button>
        </div>
      </section>

      <MediaUploadModal isOpen={mediaModalOpen} onClose={() => setMediaModalOpen(false)} onSave={handleMediaSave} mediaType={activeMediaType} />
      <PortfolioCardForm isOpen={cardFormOpen} onClose={() => setCardFormOpen(false)} onSave={handleSaveCard} initialData={editingCard} />

      {/* Save Button Floating */}
      <div className="fixed bottom-4 left-4 lg:left-6 lg:w-[calc(35%-3rem)] xl:w-[calc(30%-3rem)] w-[calc(100%-2rem)] z-50">
        <Button
          onClick={handleSaveChanges}
          disabled={isSaving || isSaved}
          className={`w-full font-bold h-12 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] ${
            isSaved
              ? 'bg-emerald-500 hover:bg-emerald-500 text-white cursor-default'
              : 'bg-white hover:bg-zinc-200 text-black'
          }`}
        >
          {isSaving ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              SAVING...
            </span>
          ) : isSaved ? (
            <span className="flex items-center gap-2">
              <Check size={16} /> SAVED!
            </span>
          ) : (
            'SAVE CHANGES'
          )}
        </Button>
      </div>
    </div>
  );
};

export default EditorPanel;