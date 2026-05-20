import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Button } from '../components/ui/button';
import MediaUploadModal from './MediaUploadModal.jsx';

const PortfolioCardForm = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    type: 'text',
    title: '',
    width: 1,
    height: 'auto',
    content: {}
  });
  const [mediaModalOpen, setMediaModalOpen] = useState(false);

  useEffect(() => {
    if (initialData && isOpen) {
      setFormData(initialData);
    } else if (isOpen) {
      setFormData({ type: 'text', title: 'Kartu Baru', width: 1, height: 'auto', content: {} });
    }
  }, [initialData, isOpen]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleContentChange = (field, value) => {
    setFormData(prev => ({ ...prev, content: { ...prev.content, [field]: value } }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-lg bg-zinc-950 text-zinc-100 border-zinc-800 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{initialData ? 'Edit Kartu' : 'Buat Kartu'}</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Judul Kartu</Label>
                <Input value={formData.title} onChange={(e) => handleChange('title', e.target.value)} className="bg-zinc-900 border-zinc-800" required />
              </div>
              <div className="space-y-2">
                <Label>Tipe Kartu</Label>
                <Select value={formData.type} onValueChange={(val) => handleChange('type', val)}>
                  <SelectTrigger className="bg-zinc-900 border-zinc-800">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                    <SelectItem value="image">Gambar/Video</SelectItem>
                    <SelectItem value="text">Teks</SelectItem>
                    <SelectItem value="stats">Statistik</SelectItem>
                    <SelectItem value="quote">Kutipan</SelectItem>
                    <SelectItem value="contact">Kontak</SelectItem>
                    <SelectItem value="social">Widget Sosial</SelectItem>
                    <SelectItem value="custom">HTML Kustom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Lebar Kartu</Label>
                <Select value={formData.width.toString()} onValueChange={(val) => handleChange('width', parseInt(val))}>
                  <SelectTrigger className="bg-zinc-900 border-zinc-800">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                    <SelectItem value="1">Rentang 1 Kolom</SelectItem>
                    <SelectItem value="2">Rentang 2 Kolom</SelectItem>
                    <SelectItem value="3">Rentang 3 Kolom</SelectItem>
                    <SelectItem value="4">Rentang 4 Kolom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Tinggi</Label>
                <Select value={formData.height} onValueChange={(val) => handleChange('height', val)}>
                  <SelectTrigger className="bg-zinc-900 border-zinc-800">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                    <SelectItem value="auto">Otomatis (Auto)</SelectItem>
                    <SelectItem value="tall">Tinggi (2x)</SelectItem>
                    <SelectItem value="extra-tall">Sangat Tinggi (3x)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4 border-t border-zinc-800 pt-4">
              <Label className="text-zinc-400 uppercase text-xs tracking-wider">Konfigurasi Konten</Label>
              
              {formData.type === 'image' && (
                <>
                  <div className="space-y-2">
                    <Label>URL Media</Label>
                    <div className="flex gap-2">
                      <Input value={formData.content.mediaUrl || ''} onChange={(e) => handleContentChange('mediaUrl', e.target.value)} className="bg-zinc-900 border-zinc-800" />
                      <Button type="button" variant="secondary" onClick={() => setMediaModalOpen(true)}>Unggah</Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Teks Hamparan (Overlay)</Label>
                    <Input value={formData.content.overlayText || ''} onChange={(e) => handleContentChange('overlayText', e.target.value)} className="bg-zinc-900 border-zinc-800" />
                  </div>
                </>
              )}

              {formData.type === 'text' && (
                <>
                  <div className="space-y-2">
                    <Label>Judul Teks (Heading)</Label>
                    <Input value={formData.content.heading || ''} onChange={(e) => handleContentChange('heading', e.target.value)} className="bg-zinc-900 border-zinc-800" />
                  </div>
                  <div className="space-y-2">
                    <Label>Deskripsi</Label>
                    <Textarea value={formData.content.description || ''} onChange={(e) => handleContentChange('description', e.target.value)} className="bg-zinc-900 border-zinc-800" />
                  </div>
                </>
              )}

              {formData.type === 'stats' && (
                <>
                  <div className="space-y-2">
                    <Label>Angka Besar</Label>
                    <Input value={formData.content.number || ''} onChange={(e) => handleContentChange('number', e.target.value)} className="bg-zinc-900 border-zinc-800" />
                  </div>
                  <div className="space-y-2">
                    <Label>Label</Label>
                    <Input value={formData.content.label || ''} onChange={(e) => handleContentChange('label', e.target.value)} className="bg-zinc-900 border-zinc-800" />
                  </div>
                  <div className="space-y-2">
                    <Label>Nama Ikon (Lucide)</Label>
                    <Input value={formData.content.icon || ''} onChange={(e) => handleContentChange('icon', e.target.value)} placeholder="contoh: TrendingUp" className="bg-zinc-900 border-zinc-800" />
                  </div>
                </>
              )}

              {formData.type === 'quote' && (
                <>
                  <div className="space-y-2">
                    <Label>Teks Kutipan</Label>
                    <Textarea value={formData.content.quote || ''} onChange={(e) => handleContentChange('quote', e.target.value)} className="bg-zinc-900 border-zinc-800" />
                  </div>
                  <div className="space-y-2">
                    <Label>Atribusi (Sumber)</Label>
                    <Input value={formData.content.attribution || ''} onChange={(e) => handleContentChange('attribution', e.target.value)} className="bg-zinc-900 border-zinc-800" />
                  </div>
                  <div className="space-y-2">
                    <Label>Warna Latar Belakang</Label>
                    <Input type="color" value={formData.content.bgColor || '#324444'} onChange={(e) => handleContentChange('bgColor', e.target.value)} className="h-10 w-full bg-zinc-900 border-zinc-800 p-1" />
                  </div>
                </>
              )}

              {formData.type === 'contact' && (
                <>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input value={formData.content.email || ''} onChange={(e) => handleContentChange('email', e.target.value)} className="bg-zinc-900 border-zinc-800" />
                  </div>
                  <div className="space-y-2">
                    <Label>Telepon</Label>
                    <Input value={formData.content.phone || ''} onChange={(e) => handleContentChange('phone', e.target.value)} className="bg-zinc-900 border-zinc-800" />
                  </div>
                </>
              )}

              {formData.type === 'social' && (
                <>
                  <div className="space-y-2">
                    <Label>URL Sosial</Label>
                    <Input value={formData.content.url || ''} onChange={(e) => handleContentChange('url', e.target.value)} placeholder="https://instagram.com/nama_pengguna" className="bg-zinc-900 border-zinc-800" />
                  </div>
                  <div className="space-y-2">
                    <Label>Label Tampilan (Opsional)</Label>
                    <Input value={formData.content.customLabel || ''} onChange={(e) => handleContentChange('customLabel', e.target.value)} placeholder="contoh: @nama_pengguna (kembali ke handle URL jika kosong)" className="bg-zinc-900 border-zinc-800" />
                  </div>
                  <div className="space-y-2">
                    <Label>Sub Label</Label>
                    <Input value={formData.content.subLabel || ''} onChange={(e) => handleContentChange('subLabel', e.target.value)} placeholder="contoh: Ikuti saya" className="bg-zinc-900 border-zinc-800" />
                  </div>
                </>
              )}

              {formData.type === 'custom' && (
                <div className="space-y-2">
                  <Label>HTML Kustom</Label>
                  <Textarea value={formData.content.html || ''} onChange={(e) => handleContentChange('html', e.target.value)} className="bg-zinc-900 border-zinc-800 font-mono text-xs h-32" />
                </div>
              )}
            </div>

            <DialogFooter>
              <Button type="button" variant="ghost" onClick={onClose} className="text-zinc-400 hover:text-white">Batal</Button>
              <Button type="submit" className="bg-white text-black hover:bg-zinc-200">Simpan Kartu</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <MediaUploadModal 
        isOpen={mediaModalOpen}
        onClose={() => setMediaModalOpen(false)}
        onSave={(url) => handleContentChange('mediaUrl', url)}
        mediaType="image"
      />
    </>
  );
};

export default PortfolioCardForm;