import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { UploadCloud } from 'lucide-react';

const MediaUploadModal = ({ isOpen, onClose, onSave, mediaType }) => {
  const [activeTab, setActiveTab] = useState('upload');
  const [previewUrl, setPreviewUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  
  const { register, handleSubmit, watch, reset } = useForm({
    defaultValues: { urlInput: '' }
  });

  const urlInputValue = watch('urlInput');

  useEffect(() => {
    if (!isOpen) {
      reset();
      setPreviewUrl('');
      setIsDragging(false);
    }
  }, [isOpen, reset]);

  useEffect(() => {
    if (activeTab === 'url' && urlInputValue) {
      setPreviewUrl(urlInputValue);
    }
  }, [urlInputValue, activeTab]);

  const processFile = async (file) => {
    if (file) {
      setIsLoading(true);
      // Immediately preview using object URL for snappiness
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      // Upload to Cloudinary
      const formData = new FormData();
      formData.append('file', file);
      
      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        
        const data = await res.json();
        if (res.ok && data.url) {
          // Replace with Cloudinary URL
          setPreviewUrl(data.url);
        } else {
          console.error('Upload failed:', data.error);
        }
      } catch (error) {
        console.error('Upload request failed:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleFileChange = (e) => {
    processFile(e.target.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const onSubmit = () => {
    if (previewUrl) {
      onSave(previewUrl);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-zinc-950 text-zinc-100 border-zinc-800">
        <DialogHeader>
          <DialogTitle>Update {mediaType === 'video' ? 'Video' : 'Image'}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-4">
            <TabsList className="grid w-full grid-cols-2 bg-zinc-900">
              <TabsTrigger value="upload" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-zinc-100">Upload File</TabsTrigger>
              <TabsTrigger value="url" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-zinc-100">Paste URL</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload" className="space-y-4 py-4">
              <div 
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragging ? 'border-white bg-white/10' : 'border-zinc-700 hover:border-zinc-500'}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <UploadCloud className="mx-auto h-8 w-8 text-zinc-400 mb-3" />
                <p className="text-sm text-zinc-300">Drag and drop your {mediaType} here, or click to browse</p>
                <input 
                  ref={fileInputRef}
                  type="file" 
                  accept={mediaType === 'video' ? 'video/*' : 'image/*'}
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="url" className="space-y-4 py-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="mediaUrl">Media URL</Label>
                <Input 
                  id="mediaUrl" 
                  type="url" 
                  placeholder="https://..." 
                  {...register('urlInput')}
                  className="bg-zinc-900 border-zinc-800 text-zinc-100"
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-4 border border-zinc-800 rounded-lg overflow-hidden min-h-[150px] bg-zinc-900 flex items-center justify-center relative">
            {isLoading ? (
              <span className="text-zinc-500 text-sm">Loading preview...</span>
            ) : previewUrl ? (
              (() => {
                const isGif = previewUrl.toLowerCase().endsWith('.gif') || previewUrl.toLowerCase().includes('.gif');
                if (isGif) {
                  return <img src={previewUrl} alt="Preview" className="w-full h-full object-contain max-h-[300px]" />;
                }
                return mediaType === 'video' || previewUrl.endsWith('.mp4') ? (
                  <video src={previewUrl} className="w-full h-full object-contain max-h-[300px]" controls muted />
                ) : (
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-contain max-h-[300px]" />
                );
              })()
            ) : (
              <span className="text-zinc-600 text-sm">No preview available</span>
            )}
          </div>

          <DialogFooter className="mt-6 sm:justify-end gap-2">
            <Button type="button" variant="ghost" onClick={onClose} className="text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800">
              Cancel
            </Button>
            <Button type="submit" disabled={!previewUrl} className="bg-white text-black hover:bg-zinc-200">
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MediaUploadModal;