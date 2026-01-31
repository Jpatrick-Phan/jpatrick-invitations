'use client';
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ColorPicker from './ColorPicker';
import MediaInput from './MediaInput';

export default function SectionEditor({ section, data, onChange }) {
    if (!data && section !== 'config') return <div className="p-10 text-center text-gray-400">Select a section to edit</div>;
    // For config, data might be undefined initially if old json, so we handle safely

    const handleChange = (field, value) => {
        onChange(section, field, value);
    };

    const handleArrayChange = (index, field, value) => {
        const newItems = [...(data.items || [])];
        newItems[index] = { ...newItems[index], [field]: value };
        onChange(section, 'items', newItems);
    };

    const addItem = (template) => {
        const newItems = [...(data.items || []), template];
        onChange(section, 'items', newItems);
    };

    const removeItem = (index) => {
        const newItems = [...(data.items || [])];
        newItems.splice(index, 1);
        onChange(section, 'items', newItems);
    };

    // --- RENDERERS ---

    if (section === 'source') {
        return <SourceEditor data={data} onChange={onChange} />;
    }

    if (section === 'config') {
        return (
            <div className="space-y-6 animate-fadeIn">
                <div className="space-y-2">
                    <Label>Theme Template</Label>
                    <Select value={data?.theme || 'wedding'} onValueChange={(v) => handleChange('theme', v)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Theme" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="wedding">Wedding</SelectItem>
                            <SelectItem value="graduation">Graduation</SelectItem>
                            <SelectItem value="birthday">Birthday</SelectItem>
                            <SelectItem value="party">Party</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label>Visibility</Label>
                    <Select value={data?.visibility || 'public'} onValueChange={(v) => handleChange('visibility', v)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Visibility" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="public">Public (Listed)</SelectItem>
                            <SelectItem value="private">Private (Hidden & Password)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {data?.visibility === 'private' && (
                    <div className="space-y-2 animate-fadeIn pl-4 border-l-2 border-primary/20">
                        <Label>Access Password</Label>
                        <Input
                            value={data?.password || ''}
                            onChange={(e) => handleChange('password', e.target.value)}
                            placeholder="Set a password..."
                        />
                        <p className="text-xs text-gray-500">Guests will need this URL parameter: <code>?auth=your-password</code></p>
                    </div>
                )}

                <div className="space-y-2">
                    <ColorPicker
                        label="Primary Color"
                        value={data?.primaryColor || '#000000'}
                        onChange={(v) => handleChange('primaryColor', v)}
                    />
                </div>
                <div className="space-y-2">
                    <Label>Font Family</Label>
                    <Input value={data?.font || 'Inter'} onChange={(e) => handleChange('font', e.target.value)} placeholder="e.g. Inter, Playfair Display" />
                </div>
                <div className="space-y-2">
                    <Label>Background Music</Label>
                    <MediaInput
                        type="audio"
                        value={data?.music || ''}
                        onChange={(v) => handleChange('music', v)}
                    />
                </div>
            </div>
        );
    }

    if (section === 'hero') {
        return (
            <div className="space-y-6 animate-fadeIn">
                <div className="space-y-2">
                    <Label>Event Title</Label>
                    <Input value={data.title || ''} onChange={(e) => handleChange('title', e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label>Names (e.g. You & Me)</Label>
                    <Input value={data.names || ''} onChange={(e) => handleChange('names', e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label>Date Display Text</Label>
                    <Input value={data.date || ''} onChange={(e) => handleChange('date', e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label>Background Image URL</Label>
                    <MediaInput
                        type="image"
                        value={data.image || ''}
                        onChange={(v) => handleChange('image', v)}
                    />
                </div>
            </div>
        );
    }

    if (section === 'eventDetails') {
        return (
            <div className="space-y-6 animate-fadeIn">
                <div className="space-y-2">
                    <Label>Time</Label>
                    <Input value={data.time || ''} onChange={(e) => handleChange('time', e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label>Location Name</Label>
                    <Input value={data.location || ''} onChange={(e) => handleChange('location', e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label>Google Maps Link</Label>
                    <Input value={data.mapUrl || ''} onChange={(e) => handleChange('mapUrl', e.target.value)} />
                </div>
            </div>
        );
    }

    if (section === 'story') {
        return (
            <div className="space-y-6 animate-fadeIn">
                <div className="flex justify-between items-center mb-4">
                    <Label className="text-lg">Timeline Events</Label>
                    <Button size="sm" onClick={() => addItem({ id: Date.now(), year: '2026', title: 'New Event', description: '' })}>
                        <Plus size={16} className="mr-2" /> Add Event
                    </Button>
                </div>

                <div className="space-y-4">
                    {(data.items || []).map((item, idx) => (
                        <div key={idx} className="border p-4 rounded-lg bg-gray-50 relative group">
                            <button
                                onClick={() => removeItem(idx)}
                                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Trash2 size={18} />
                            </button>

                            <div className="grid grid-cols-4 gap-4 mb-2">
                                <div className="col-span-1">
                                    <Label className="text-xs">Year</Label>
                                    <Input value={item.year} onChange={(e) => handleArrayChange(idx, 'year', e.target.value)} />
                                </div>
                                <div className="col-span-3">
                                    <Label className="text-xs">Title</Label>
                                    <Input value={item.title} onChange={(e) => handleArrayChange(idx, 'title', e.target.value)} />
                                </div>
                            </div>
                            <div>
                                <Label className="text-xs">Description</Label>
                                <Input value={item.description} onChange={(e) => handleArrayChange(idx, 'description', e.target.value)} />
                            </div>
                        </div>
                    ))}
                    {(data.items || []).length === 0 && <div className="text-center text-gray-400 italic">No events yet.</div>}
                </div>
            </div>
        );
    }

    if (section === 'gallery') {
        return (
            <div className="space-y-6 animate-fadeIn">
                <div className="flex justify-between items-center mb-4">
                    <Label className="text-lg">Photos</Label>
                    <Button size="sm" onClick={() => addItem({ url: '/images/placeholder.jpg', caption: '' })}>
                        <Plus size={16} className="mr-2" /> Add Photo
                    </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {(data.items || []).map((item, idx) => (
                        <div key={idx} className="border p-4 rounded-lg bg-gray-50 relative group">
                            <button
                                onClick={() => removeItem(idx)}
                                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 bg-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Trash2 size={16} />
                            </button>

                            <div className="aspect-video bg-gray-200 mb-2 rounded overflow-hidden relative">
                                {/* Preview if it's a valid url */}
                                {item.url && <img src={item.url} alt="preview" className="w-full h-full object-cover" />}
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs">Image URL</Label>
                                <MediaInput
                                    value={item.url}
                                    onChange={(v) => handleArrayChange(idx, 'url', v)}
                                    type="image"
                                />
                                <Label className="text-xs">Caption</Label>
                                <Input value={item.caption} onChange={(e) => handleArrayChange(idx, 'caption', e.target.value)} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (section === 'rsvp') {
        return (
            <div className="text-center py-10 text-gray-500">
                <p>RSVP settings are global for now.</p>
                <p className="text-sm mt-2">To disable RSVP, toggle the visibility in the sidebar.</p>
            </div>
        )
    }

    return <div>Select a section</div>;
}

function SourceEditor({ data, onChange }) {
    const [value, setValue] = useState(JSON.stringify(data, null, 2));
    const [error, setError] = useState(null);

    const handleSave = () => {
        try {
            const parsed = JSON.parse(value);
            onChange('ROOT', null, parsed);
        } catch (e) {
            setError(e.message);
        }
    };

    return (
        <div className="space-y-4 h-full flex flex-col animate-fadeIn">
            <div className="flex justify-between items-center">
                <Label>Raw Configuration (JSON)</Label>
                <Button onClick={handleSave} size="sm" variant={error ? "destructive" : "default"}>Apply Changes</Button>
            </div>
            {error && <div className="p-2 bg-red-50 text-red-500 text-xs rounded border border-red-200">{error}</div>}
            <textarea
                className="flex-1 w-full min-h-[500px] font-mono text-xs p-4 border rounded-md bg-slate-50 text-slate-800 resize-none focus:ring-2 focus:ring-primary/20 outline-none"
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                    try {
                        JSON.parse(e.target.value);
                        setError(null);
                    } catch (e) {
                        setError("Invalid JSON");
                    }
                }}
            />
        </div>
    );
}
