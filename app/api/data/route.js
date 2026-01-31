import { NextResponse } from 'next/server';
import { cardService } from '@/lib/cardService';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
        const data = await cardService.getCardById(id);
        if (!data) return NextResponse.json({ error: 'Card not found' }, { status: 404 });
        return NextResponse.json(data);
    }

    const cards = await cardService.getAllCards();
    return NextResponse.json(cards);
}

export async function POST(request) {
    try {
        const { id, data } = await request.json();
        if (!id || !data) return NextResponse.json({ error: 'Missing id or data' }, { status: 400 });

        await cardService.saveCard(id, data);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
    }
}
