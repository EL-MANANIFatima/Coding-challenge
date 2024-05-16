import { NextResponse } from 'next/server';
import prisma from '../../../../../utils/connect';
import { NextApiRequest } from 'next';

type Data = {
    success: boolean;
    data?: any;
    message?: string;
};

export  async function GET(req: NextApiRequest) {
    try {
        if (!req.url) {
            return NextResponse.json({ success: false, message: "Url missing" });
        }
        const url = new URL(req.url, `http://${req.headers.host}`);
        const pathname = url.pathname;
        const parts = pathname.split('/');
        const id = parts[parts.length - 1];

        if (!id) {
            return NextResponse.json({ success: false, message: "ID missing" });
        }

        const post = await prisma.post.findUnique({
            where: { id: String(id) }
        });

        if (post) {
            return NextResponse.json({ success: true, data: post });
        } else {
            return NextResponse.json({ success: false, message: "Post not found" });
        }
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ success: false, message: "Failed to get post" });
    }
}



export async function PUT(req : any) {
    if (!req.url) {
        return NextResponse.json({ success: false, message: "Url missing" });
    }
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = url.pathname;
    const parts = pathname.split('/');
    const id = parts[parts.length - 1];
    const { title, content } = await req.json();

    try {
        const updated = await prisma.post.update({
            where: { id: id as string },
            data: { title, content, updatedAt: new Date() } 
        });
        return NextResponse.json({ success: true, data: updated });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Failed to update post" });
    }
}

export async function DELETE(req: any) {
    if (!req.url) {
        return NextResponse.json({ success: false, message: "Url missing" });
    }
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = url.pathname;
    const parts = pathname.split('/');
    const id = parts[parts.length - 1];

    try {
        const deletedPost = await prisma.post.delete({
            where: { id: id as string }
        });
        return NextResponse.json({ success: true, data: deletedPost });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Failed to delete post" });
    }
}
