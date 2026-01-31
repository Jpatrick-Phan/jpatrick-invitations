'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Music, Image as ImageIcon, Trash2, Check, Search, Plus, Loader2 } from 'lucide-react';

export default function MediaLibrary({ open, onOpenChange, onSelect, type = 'image' }) {
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (open) loadFiles();
    }, [open]);

    const loadFiles = () => {
        fetch('/api/media')
            .then(res => res.json())
            .then(data => setFiles(data));
    };

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        await fetch('/api/upload', {
            method: 'POST',
            body: formData
        });

        setUploading(false);
        loadFiles();
    };

    const handleDelete = async (e, filename) => {
        e.stopPropagation();
        if (!confirm('Delete this file?')) return;

        await fetch(`/api/media?filename=${filename}`, { method: 'DELETE' });
        if (selectedFile?.includes(filename)) setSelectedFile(null);
        loadFiles();
    };

    const filteredFiles = files.filter(f => {
        const matchType = (type === 'audio') ? f.type === 'audio' : (type === 'image') ? f.type === 'image' : true;
        const matchSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchType && matchSearch;
    });

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl h-[650px] flex flex-col bg-white p-0 gap-0 overflow-hidden">
                <DialogHeader className="p-6 pb-2">
                    <DialogTitle className="text-xl font-bold">Select {type === 'audio' ? 'Music' : 'Image'}</DialogTitle>
                </DialogHeader>

                {/* Search Bar */}
                <div className="px-6 py-4 flex items-center gap-3 border-b border-gray-100">
                    <Search className="text-gray-400" size={20} />
                    <Input
                        placeholder="Search your library..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border-none shadow-none focus-visible:ring-0 text-lg px-0 h-auto placeholder:text-gray-300"
                        autoFocus
                    />
                </div>

                {/* Grid */}
                <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {/* 1. UPLOAD BUTTON */}
                        <label className="h-full flex flex-col items-center justify-center border-2 border-dashed border-[var(--color-primary)]/30 rounded-xl cursor-pointer hover:bg-[var(--color-primary)]/5 hover:border-[var(--color-primary)] transition-all group bg-white">
                            <input type="file" className="hidden" onChange={handleUpload} disabled={uploading} accept={type === 'audio' ? 'audio/*' : 'image/*'} />
                            <div className="p-4 bg-[var(--color-primary)]/10 rounded-full mb-3 group-hover:scale-110 transition-transform text-[var(--color-primary)]">
                                {uploading ? <Loader2 className="animate-spin" size={24} /> : <Plus size={24} />}
                            </div>
                            <span className="text-xs font-semibold text-[var(--color-primary)]">{uploading ? 'Uploading...' : 'Upload New'}</span>
                        </label>

                        {/* 2. FILE LIST */}
                        {filteredFiles.map((file) => (
                            <div
                                key={file.name}
                                className={`
                                    relative group border rounded-xl cursor-pointer overflow-hidden bg-white shadow-sm hover:shadow-md transition-all
                                    ${selectedFile === file.url ? 'ring-2 ring-[var(--color-primary)] ring-offset-2' : ''}
                                `}
                                onClick={() => setSelectedFile(file.url)}
                            >
                                {/* Thumbnail */}
                                <div className="aspect-square bg-gray-100 relative flex items-center justify-center overflow-hidden">
                                    {file.type === 'image' ? (
                                        <img src={file.url} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                    ) : (
                                        <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center">
                                            <Music size={32} />
                                        </div>
                                    )}

                                    {/* Overlay when selected */}
                                    {selectedFile === file.url && (
                                        <div className="absolute inset-0 bg-[var(--color-primary)]/20 flex items-center justify-center backdrop-blur-[1px]">
                                            <div className="bg-[var(--color-primary)] text-white p-1.5 rounded-full shadow-lg scale-110">
                                                <Check size={18} strokeWidth={3} />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="p-3">
                                    <p className="text-xs font-medium truncate text-gray-700">{file.name}</p>
                                    <p className="text-[10px] text-gray-400 mt-0.5 uppercase tracking-wider">{file.type}</p>
                                </div>

                                <button
                                    onClick={(e) => handleDelete(e, file.name)}
                                    className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full text-red-500 opacity-0 group-hover:opacity-100 hover:bg-red-50 transition-all shadow-sm z-10 transform scale-90 group-hover:scale-100"
                                    title="Delete file"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        ))}
                    </div>

                    {filteredFiles.length === 0 && searchQuery && (
                        <div className="text-center py-20 text-gray-400">
                            No files match "{searchQuery}"
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-100 flex justify-end gap-3 bg-white">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button
                        disabled={!selectedFile}
                        onClick={() => { onSelect(selectedFile); onOpenChange(false); }}
                        className="bg-[var(--color-primary)] text-white hover:opacity-90 px-6"
                    >
                        Insert Selected
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
