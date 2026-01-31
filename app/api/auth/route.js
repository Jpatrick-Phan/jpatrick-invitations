import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { pin } = await request.json();

        // Default PIN is 1234 if not set in environment variables
        const CORRECT_PIN = process.env.ADMIN_PIN || '1234';

        if (pin === CORRECT_PIN) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ error: 'Incorrect PIN' }, { status: 401 });
        }
    } catch (e) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
