'use client';
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Copy, Link as LinkIcon, Lock, Globe } from "lucide-react";
import { toast } from "sonner";

export default function ShareModal({ open, onOpenChange, card }) {
    const [guestName, setGuestName] = useState('');
    const [generatedUrl, setGeneratedUrl] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (open && card) {
            generateUrl();
        }
    }, [open, card, guestName]);

    const generateUrl = () => {
        if (!card) return;

        const baseUrl = `${window.location.origin}/${card.id}`;
        const params = new URLSearchParams();

        // 1. Auth Param (if private)
        if (card.config?.visibility === 'private' && card.config?.password) {
            params.append('auth', card.config.password);
        }

        // 2. Personalization
        if (guestName.trim()) {
            params.append('guest', guestName.trim());
        }

        const queryString = params.toString();
        setGeneratedUrl(queryString ? `${baseUrl}?${queryString}` : baseUrl);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedUrl);
        setCopied(true);
        toast.success("Link copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
    };

    if (!card) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md bg-white">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <LinkIcon size={20} />
                        Share "{card.config?.title || card.id}"
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* Status Badge */}
                    <div className="flex items-center gap-2 text-sm">
                        Status:
                        {card.config?.visibility === 'private' ? (
                            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 font-medium">
                                <Lock size={12} /> Private
                            </span>
                        ) : (
                            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">
                                <Globe size={12} /> Public
                            </span>
                        )}
                    </div>

                    {/* Inputs */}
                    <div className="space-y-3">
                        <div className="space-y-1">
                            <Label htmlFor="guestName">Guest Name (Optional)</Label>
                            <Input
                                id="guestName"
                                placeholder="e.g. Anh Nam & Chị Lan"
                                value={guestName}
                                onChange={(e) => setGuestName(e.target.value)}
                            />
                            <p className="text-xs text-slate-500">Adds personalization to the Hero section.</p>
                        </div>
                    </div>

                    {/* Result */}
                    <div className="space-y-2">
                        <Label>Generated Link</Label>
                        <div className="flex gap-2">
                            <Input readOnly value={generatedUrl} className="bg-slate-50 font-mono text-xs" />
                            <Button size="icon" onClick={handleCopy} className={copied ? "bg-green-600 hover:bg-green-600" : ""}>
                                {copied ? <Check size={16} /> : <Copy size={16} />}
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
