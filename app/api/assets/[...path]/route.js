import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import mime from 'mime'; // Need to check if available, otherwise manual map

export async function GET(request, { params }) {
    // Route: /api/assets/cardId/filename.ext
    const { path: pathSegments } = await params;

    if (!pathSegments || pathSegments.length < 2) {
        return new NextResponse('Invalid Path', { status: 400 });
    }

    // Security: Prevent directory traversal
    const safePath = pathSegments.join('/');
    if (safePath.includes('..')) {
        return new NextResponse('Access Denied', { status: 403 });
    }

    const filePath = path.join(process.cwd(), 'data', safePath);

    // Security: Allow only media types
    if (!/\.(jpg|jpeg|png|gif|webp|svg|mp3|mp4)$/i.test(filePath)) {
        return new NextResponse('Unsupported File Type', { status: 403 });
    }

    try {
        const fileHandle = await fs.open(filePath, 'r');
        const stat = await fileHandle.stat();
        const fileStream = fileHandle.createReadStream();

        // Determine content type
        const ext = path.extname(filePath).toLowerCase();
        let contentType = 'application/octet-stream';
        const mimeMap = {
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.png': 'image/png',
            '.gif': 'image/gif',
            '.webp': 'image/webp',
            '.svg': 'image/svg+xml',
            '.mp3': 'audio/mpeg',
            '.mp4': 'video/mp4'
        };
        if (mimeMap[ext]) contentType = mimeMap[ext];

        // Return stream response
        // Note: NextResponse with stream is a bit tricky in some Next versions but standard Response works.
        // We use `new Response(stream)` which Next.js supports.

        return new Response(fileStream, {
            headers: {
                'Content-Type': contentType,
                'Content-Length': stat.size
            }
        });

    } catch (error) {
        return new NextResponse('File Not Found', { status: 404 });
    }
}
