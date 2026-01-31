'use client';
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const PRESETS = [
    '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF',
    '#F59E0B', '#10B981', '#3B82F6', '#6366F1', '#EC4899',
    '#D97706', '#059669', '#2563EB', '#4F46E5', '#DB2777'
];

export default function ColorPicker({ value, onChange, label }) {
    const handlePopChange = (e) => {
        onChange(e.target.value);
    };

    return (
        <div className="space-y-2">
            <Label>{label}</Label>
            <div className="flex gap-2 items-center">
                <div className="relative w-10 h-10 rounded-md border shadow-sm overflow-hidden" style={{ backgroundColor: value }}>
                    <input
                        type="color"
                        value={value || '#000000'}
                        onChange={handlePopChange}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                </div>
                <Input value={value} onChange={(e) => onChange(e.target.value)} className="font-mono w-32" />
            </div>

            <div className="flex flex-wrap gap-1 mt-2">
                {PRESETS.map(c => (
                    <button
                        key={c}
                        className={`w-6 h-6 rounded-full border border-gray-200 ${value === c ? 'ring-2 ring-primary ring-offset-1' : ''}`}
                        style={{ backgroundColor: c }}
                        onClick={() => onChange(c)}
                    />
                ))}
            </div>
        </div>
    );
}
