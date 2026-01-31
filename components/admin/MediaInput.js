'use client';
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, Music } from 'lucide-react';
import MediaLibrary from './MediaLibrary';

export default function MediaInput({ value, onChange, type = 'image', placeholder }) {
    const [libOpen, setLibOpen] = useState(false);

    return (
        <div className="flex gap-2">
            <div className="flex-1 relative">
                <Input
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="pr-10"
                />
                {value && type === 'image' && (
                    <div className="absolute top-1 right-1 w-8 h-8 rounded overflow-hidden border">
                        <img src={value} className="w-full h-full object-cover" />
                    </div>
                )}
            </div>
            <Button variant="outline" size="icon" onClick={() => setLibOpen(true)}>
                {type === 'image' ? <ImageIcon size={18} /> : <Music size={18} />}
            </Button>

            <MediaLibrary
                open={libOpen}
                onOpenChange={setLibOpen}
                type={type}
                onSelect={onChange}
            />
        </div>
    );
}
