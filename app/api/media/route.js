import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
    const uploadDir = path.join(process.cwd(), 'public/uploads');

    try {
        try {
            await fs.access(uploadDir);
        } catch {
            return NextResponse.json([]); // No uploads yet
        }

        const files = await fs.readdir(uploadDir);

        // Simple filter for media files
        const mediaFiles = files.filter(file =>
            /\.(jpg|jpeg|png|gif|mp3|wav|mp4)$/i.test(file)
        ).map(file => ({
            name: file,
            url: `/uploads/${file}`,
            type: /\.(mp3|wav)$/i.test(file) ? 'audio' : 'image'
        }));

        return NextResponse.json(mediaFiles);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to list files' }, { status: 500 });
    }
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
