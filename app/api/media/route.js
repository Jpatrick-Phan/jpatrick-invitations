import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const cardId = searchParams.get('cardId');

    const results = [];

    // Helper to scan directory
    const scanDir = async (dirPath, urlPrefix, defaultType = null) => {
        try {
            await fs.access(dirPath);
            const files = await fs.readdir(dirPath);
            return files
                .filter(f => /\.(jpg|jpeg|png|gif|webp|mp3|wav|mp4)$/i.test(f))
                .map(f => ({
                    name: f,
                    url: `${urlPrefix}/${f}`,
                    type: defaultType || (/\.(mp3|wav)$/i.test(f) ? 'audio' : 'image')
                }));
        } catch { return []; }
    };

    // 1. Public Images (Shared)
    const publicImages = await scanDir(path.join(process.cwd(), 'public/images'), '/images', 'image');
    results.push(...publicImages);

    // 2. Public Music (Shared)
    const publicMusic = await scanDir(path.join(process.cwd(), 'public/music'), '/music', 'audio');
    results.push(...publicMusic);

    // 3. Private Assets (Card Specific)
    if (cardId) {
        const privateAssets = await scanDir(path.join(process.cwd(), 'data', cardId), `/api/assets/${cardId}`);
        // Ensure data.json and other non-media are filtered by the regex in scanDir
        results.push(...privateAssets);
    }

    return NextResponse.json(results);
}

export async function DELETE(request) {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');

    if (!filename) return NextResponse.json({ error: 'Filename required' }, { status: 400 });

    try {
        const filePath = path.join(process.cwd(), 'public/uploads', filename);
        await fs.unlink(filePath);
        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
    }
}
