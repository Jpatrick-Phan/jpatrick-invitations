'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, Loader2 } from 'lucide-react';
import { toast } from "sonner";

export default function LockScreen({ cardId }) {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Construct new URL with auth param
        const params = new URLSearchParams(searchParams);
        params.set('auth', password);

        // Push new URL (Server Component will re-evaluate)
        router.push(`/${cardId}?${params.toString()}`);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-sm shadow-lg border-none">
                <CardHeader className="text-center">
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                        <Lock className="text-primary w-6 h-6" />
                    </div>
                    <CardTitle>Private Event</CardTitle>
                    <CardDescription>Enter the access code to view this invitation.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            type="password"
                            placeholder="Access Code"
                            className="text-center tracking-widest text-lg"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoFocus
                        />
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? <Loader2 className="animate-spin mr-2" /> : 'Unlock'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
