'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, Plus, Loader2, Lock, Share2, Globe, Eye } from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import SectionEditor from '@/components/admin/SectionEditor';
import ShareModal from '@/components/admin/ShareModal';
import { toast } from "sonner";

export default function AdminPage() {
    // --- STATE ---
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [pinInput, setPinInput] = useState('');
    const [authLoading, setAuthLoading] = useState(false);

    const [cards, setCards] = useState([]);
    const [selectedCardId, setSelectedCardId] = useState(null);
    const [data, setData] = useState(null); // The full JSON object of the selected card
    const [activeSection, setActiveSection] = useState('hero'); // For sidebar selection
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [newCardId, setNewCardId] = useState('');
    const [shareCard, setShareCard] = useState(null);

    // --- EFFECTS ---
    useEffect(() => {
        // Bypass auth in Development
        if (process.env.NODE_ENV === 'development') {
            setIsAuthenticated(true);
        } else {
            // Check session for Production
            if (typeof window !== 'undefined' && sessionStorage.getItem('admin_auth') === 'true') {
                setIsAuthenticated(true);
            }
        }
        loadCards();
    }, []);

    // --- AUTH ---
    const handleLogin = async (e) => {
        e.preventDefault();
        setAuthLoading(true);
        try {
            const res = await fetch('/api/auth', {
                method: 'POST',
                body: JSON.stringify({ pin: pinInput }),
                headers: { 'Content-Type': 'application/json' }
            });
            if (res.ok) {
                setIsAuthenticated(true);
                sessionStorage.setItem('admin_auth', 'true');
                toast.success("Welcome back!");
            } else {
                toast.error("Incorrect PIN");
            }
        } catch (e) {
            toast.error("Login verification failed");
        } finally {
            setAuthLoading(false);
        }
    };

    // --- API CALLS ---
    const loadCards = () => {
        setLoading(true);
        fetch('/api/data')
            .then(res => res.json())
            .then(data => {
                setCards(data);
                setLoading(false);
            });
    };

    const loadCard = (id) => {
        setLoading(true);
        fetch(`/api/data?id=${id}`)
            .then(res => res.json())
            .then(d => {
                setData(d);
                setSelectedCardId(id);
                setLoading(false);
            });
    };

    const handleCreate = async () => {
        if (!newCardId) return;
        const template = {
            theme: 'wedding',
            config: { primaryColor: '#E11D48', font: 'Inter', music: '' },
            music: '',
            hero: { enabled: true, title: 'New Event', names: 'Names', date: 'Date', image: '' },
            eventDetails: { enabled: true, time: '', location: '', mapUrl: '' },
            story: { enabled: true, items: [] },
            gallery: { enabled: true, items: [] },
            rsvp: { enabled: true }
        };

        await fetch('/api/data', {
            method: 'POST',
            body: JSON.stringify({ id: newCardId, data: template }),
            headers: { 'Content-Type': 'application/json' }
        });
        setNewCardId('');
        loadCards();
        toast.success("New event created!");
    };

    const handlePreview = (card) => {
        let url = `/${card.id}`;
        if (card.config?.visibility === 'private' && card.config?.password) {
            url += `?auth=${card.config.password}`;
        }
        window.open(url, '_blank');
    };

    const save = async () => {
        setSaving(true);
        await fetch('/api/data', {
            method: 'POST',
            body: JSON.stringify({ id: selectedCardId, data }),
            headers: { 'Content-Type': 'application/json' }
        });
        setSaving(false);
        toast.success("Changes saved successfully!");
    };

    // --- HANDLERS ---

    // Update data for a specific section field
    // e.g. section='hero', field='title', value='New Title'
    const handleSectionChange = (section, field, value) => {
        if (section === 'ROOT') {
            setData(value);
            return;
        }

        // Special handling for Theme which is top-level but edited in config
        if (section === 'config' && field === 'theme') {
            setData(prev => ({
                ...prev,
                theme: value
            }));
            return;
        }

        setData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const handleToggleVisibility = (section) => {
        const current = data[section]?.enabled !== false;
        handleSectionChange(section, 'enabled', !current);
    };

    // --- RENDER ---

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                <Card className="w-full max-w-sm bg-white shadow-xl">
                    <CardHeader>
                        <CardTitle className="text-center flex flex-col items-center gap-2">
                            <div className="p-3 bg-gray-100 rounded-full">
                                <Lock size={24} className="text-gray-600" />
                            </div>
                            Admin Access
                        </CardTitle>
                        <CardDescription className="text-center">Enter PIN to continue</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <Input
                                type="password"
                                placeholder="PIN Code"
                                value={pinInput}
                                onChange={e => setPinInput(e.target.value)}
                                className="text-center text-lg tracking-widest bg-white"
                                autoFocus
                            />
                            <Button type="submit" className="w-full bg-[var(--color-primary)] text-white hover:opacity-90" disabled={authLoading}>
                                {authLoading ? <Loader2 className="animate-spin" /> : 'Enter'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (loading && !data && cards.length === 0) {
        return <div className="min-h-screen flex items-center justify-center text-gray-400"><Loader2 className="animate-spin mr-2" /> Loading...</div>;
    }

    // 1. LIST VIEW (Dashboard)
    if (!selectedCardId) {
        return (
            <div className="min-h-screen bg-gray-50 p-8">
                <div className="max-w-5xl mx-auto space-y-8">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold text-gray-800">My Invitations</h1>
                        <div className="flex gap-2">
                            <Input
                                placeholder="new-card-id"
                                value={newCardId}
                                className="w-48 bg-white"
                                onChange={(e) => setNewCardId(e.target.value)}
                            />
                            <Button onClick={handleCreate} className="bg-[var(--color-primary)] text-white hover:opacity-90">
                                <Plus size={16} className="mr-2" /> Create
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {cards.map((card) => (
                            <Card key={card.id} className="cursor-pointer hover:shadow-xl transition-all border-none shadow-sm group relative bg-white" onClick={() => loadCard(card.id)}>
                                <div className="h-32 bg-gray-200 rounded-t-xl overflow-hidden relative">
                                    {/* Placeholder preview */}
                                    {card.hero?.image && <img src={card.hero.image} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />}
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>

                                    {/* Share Button (Overlay) */}
                                    <Button
                                        variant="secondary"
                                        size="icon"
                                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 hover:bg-white text-blue-600 shadow-sm"
                                        onClick={(e) => { e.stopPropagation(); setShareCard(card); }}
                                    >
                                        <Share2 size={16} />
                                    </Button>
                                </div>
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle className="capitalize text-lg">{card.config?.title || card.id}</CardTitle>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-xs text-gray-400 font-mono">/{card.id}</span>
                                                {card.config?.visibility === 'private' ?
                                                    <span className="text-[10px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full flex items-center gap-1 border border-amber-200"><Lock size={8} /> Private</span>
                                                    :
                                                    <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-200"><Globe size={8} /> Public</span>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-gray-500 mb-4 line-clamp-1">{card.config?.names || 'No names set'}</p>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" className="w-full" onClick={(e) => { e.stopPropagation(); loadCard(card.id); }}>
                                            Edit Design
                                        </Button>
                                        <Button variant="ghost" size="sm" className="w-full" onClick={(e) => { e.stopPropagation(); handlePreview(card); }}>
                                            <Eye size={14} className="mr-1" /> Preview
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
                <ShareModal
                    open={!!shareCard}
                    onOpenChange={(open) => !open && setShareCard(null)}
                    card={shareCard}
                />
            </div>
        );
    }

    // 2. BUILDER VIEW (Sidebar + Editor)
    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* Sidebar */}
            <AdminSidebar
                activeSection={activeSection}
                onSelectSection={setActiveSection}
                data={data}
                onToggleVisibility={handleToggleVisibility}
            />

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-full relative">
                {/* Header */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0 z-10">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={() => setSelectedCardId(null)}>
                            <ArrowLeft size={20} />
                        </Button>
                        <div>
                            <h1 className="font-bold text-gray-800 capitalize leading-tight">{selectedCardId}</h1>
                            <span className="text-xs text-gray-400">Editing Mode</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button variant="outline" onClick={() => window.open(`/${selectedCardId}`, '_blank')}>
                            Live Preview
                        </Button>
                        <Button onClick={save} disabled={saving} className="min-w-[120px] bg-[var(--color-primary)] text-white">
                            {saving ? <Loader2 className="animate-spin mr-2" size={16} /> : <Save className="mr-2" size={16} />}
                            {saving ? 'Saving' : 'Save'}
                        </Button>
                    </div>
                </header>

                {/* Editor Scroll Area */}
                <main className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-3xl mx-auto">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-gray-800 capitalize mb-1">
                                {activeSection === 'eventDetails' ? 'Event Details' : activeSection}
                            </h2>
                            <p className="text-gray-500 text-sm">Make changes to this section below</p>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 min-h-[500px]">
                            <SectionEditor
                                section={activeSection}
                                data={
                                    activeSection === 'config' ? { ...data.config, theme: data.theme } :
                                        activeSection === 'source' ? data :
                                            data[activeSection]
                                }
                                onChange={handleSectionChange}
                                cardId={selectedCardId}
                            />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
