'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Music, Image as ImageIcon, Trash2, Check } from 'lucide-react';

export default function MediaLibrary({ open, onOpenChange, onSelect, type = 'image' }) {
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

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
        loadFiles();
    };

    // Filter files based on requested type (audio or image)
    // If type is 'any', show all? Default to strict.
    const filteredFiles = files.filter(f => {
        if (type === 'audio') return f.type === 'audio';
        if (type === 'image') return f.type === 'image';
        return true;
    });

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl h-[600px] flex flex-col bg-blue-100">
                <DialogHeader>
                    <DialogTitle>Media Library ({type})</DialogTitle>
                </DialogHeader>

                <Tabs defaultValue="library" className="flex-1 flex flex-col">
                    <TabsList>
                        <TabsTrigger value="library" className="data-[state=active]:bg-[var(--color-primary)] text-[var(--color-text)] mr-2">Library</TabsTrigger>
                        <TabsTrigger value="upload" className="data-[state=active]:bg-[var(--color-primary)] text-[var(--color-text)]">Upload</TabsTrigger>
                    </TabsList>

                    <TabsContent value="library" className="flex-1 overflow-y-auto p-4 border rounded-md mt-2 bg-gray-50">
                        {filteredFiles.length === 0 ? (
                            <div className="text-center py-20 text-gray-400">No data found. Upload something!</div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {filteredFiles.map((file) => (
                                    <div
                                        key={file.name}
                                        className={`
                                            relative group border rounded-lg cursor-pointer overflow-hidden bg-white hover:shadow-md transition-all
                                            ${selectedFile === file.url ? 'ring-2 ring-blue-500' : ''}
                                        `}
                                        onClick={() => setSelectedFile(file.url)}
                                    >
                                        <div className="aspect-square flex items-center justify-center bg-gray-100">
                                            {file.type === 'image' ? (
                                                <img src={file.url} className="w-full h-full object-cover" />
                                            ) : (
                                                <Music size={40} className="text-gray-400" />
                                            )}
                                        </div>
                                        <div className="p-2 text-xs truncate">{file.name}</div>

                                        <button
                                            onClick={(e) => handleDelete(e, file.name)}
                                            className="absolute top-1 right-1 p-1 bg-white rounded-full text-red-500 opacity-0 group-hover:opacity-100 shadow-sm hover:bg-red-50"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="upload" className="flex-1 flex items-center justify-center border rounded-md mt-2 border-dashed bg-gray-50">
                        <div className="text-center">
                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="mt-4 flex text-sm text-gray-600">
                                <label className="relative cursor-pointer rounded-md bg-white font-medium text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:text-blue-500">
                                    <span>Upload a file</span>
                                    <input type="file" className="sr-only" onChange={handleUpload} disabled={uploading} accept={type === 'audio' ? 'audio/*' : 'image/*'} />
                                </label>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">{uploading ? 'Uploading...' : 'PNG, JPG, MP3 up to 10MB'}</p>
                        </div>
                    </TabsContent>
                </Tabs>

                <div className="flex justify-end pt-4 gap-2">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button disabled={!selectedFile} onClick={() => { onSelect(selectedFile); onOpenChange(false); }}>
                        Insert Selected
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
