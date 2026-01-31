'use client';
import { Eye, EyeOff, LayoutTemplate, Calendar, BookOpen, Image as ImageIcon, Gift, Settings, Code } from 'lucide-react';

const SECTIONS = [
    { id: 'config', label: 'Global Settings', icon: Settings },
    { id: 'hero', label: 'Hero Section', icon: LayoutTemplate },
    { id: 'eventDetails', label: 'Event Info', icon: Calendar },
    { id: 'story', label: 'Our Story', icon: BookOpen },
    { id: 'gallery', label: 'Photo Gallery', icon: ImageIcon },
    { id: 'rsvp', label: 'RSVP & Gifts', icon: Gift },
    { id: 'source', label: 'Source Code', icon: Code },
];

export default function AdminSidebar({ activeSection, onSelectSection, data, onToggleVisibility }) {
    if (!data) return null;

    return (
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full sticky top-0 overflow-y-auto">
            <div className="p-6 border-b border-gray-100">
                <h2 className="font-bold text-xl text-gray-800">Card Builder</h2>
                <p className="text-xs text-gray-500 mt-1">Customize your invitation</p>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {SECTIONS.map((section) => {
                    const Icon = section.icon;
                    // Check if section data exists and has enabled property. 
                    // Fallback to true if undefined for legacy compatibility, but our schema update handles it.
                    const isEnabled = data[section.id]?.enabled !== false;
                    const isActive = activeSection === section.id;

                    return (
                        <div
                            key={section.id}
                            className={`
                                group flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all
                                ${isActive ? 'bg-[var(--color-primary)] text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}
                            `}
                            onClick={() => onSelectSection(section.id)}
                        >
                            <div className="flex items-center gap-3">
                                <Icon size={18} />
                                <span className="font-medium text-sm">{section.label}</span>
                            </div>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onToggleVisibility(section.id);
                                }}
                                className={`
                                    p-1.5 rounded-full hover:bg-black/10 transition-colors
                                    ${activeSection === section.id ? 'text-white' : 'text-gray-400 hover:text-gray-600'}
                                `}
                                title={isEnabled ? "Visible on public page" : "Hidden from public page"}
                            >
                                {isEnabled ? <Eye size={16} /> : <EyeOff size={16} />}
                            </button>
                        </div>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-gray-100 text-xs text-center text-gray-400">
                v2.0.0 Builder
            </div>
        </div>
    );
}
