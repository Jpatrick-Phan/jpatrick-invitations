import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file');
        const cardId = formData.get('cardId'); // Support private uploads

        if (!file) {
            return NextResponse.json({ error: 'No file received.' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = file.name.replace(/\s/g, '-');

        const isAudio = file.type.startsWith('audio');
        // Treat everything else as image/generic for now, or strict check?
        // User mainly cares about Image/Music separation.

        let uploadDir;
        let fileUrl;

        if (isAudio) {
            // Shared Music Folder
            uploadDir = path.join(process.cwd(), 'public/music');
            fileUrl = `/music/${filename}`;
        } else {
            // Images / Others
            if (cardId) {
                // Private Card Folder
                uploadDir = path.join(process.cwd(), 'data', cardId);
                // Served via Asset Proxy
                fileUrl = `/api/assets/${cardId}/${filename}`;
            } else {
                // Shared Public Images
                uploadDir = path.join(process.cwd(), 'public/images');
                fileUrl = `/images/${filename}`;
            }
        }

        // Ensure directory exists
        try {
            await fs.access(uploadDir);
        } catch {
            await fs.mkdir(uploadDir, { recursive: true });
        }

        const filePath = path.join(uploadDir, filename);
        await fs.writeFile(filePath, buffer);

        return NextResponse.json({
            success: true,
            url: fileUrl,
            type: file.type
        });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Failed to upload file.' }, { status: 500 });
    }
}
