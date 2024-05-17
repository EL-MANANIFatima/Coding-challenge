import { NextResponse } from 'next/server';
import prisma from '../../../../../utils/connect';
import { NextApiRequest } from 'next';
import { extractIdFromUrl } from '@/utils/functionUtils';



/*
In this file , I defined functions that would handle HTTP request related to 
specific post
*/

//Fetch a specific post
export  async function GET(req: NextApiRequest) {
    try {
        const id = extractIdFromUrl(req);

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


//Update a post
export async function PUT(req : any) {

    const id = extractIdFromUrl(req);
    if (!id) {
        return NextResponse.json({ success: false, message: "ID missing" });
    }
    const { title, content } = await req.json();

    try {
        const updated = await prisma.post.update({
            where: { id: id as string },
            data: { title, content, updatedAt: new Date() } 
        });
        return NextResponse.json({ success: true, data: updated ,message:"The post has been updated successfully"});
    } catch (error) {
        return NextResponse.json({ success: false, message: "Failed to update post" });
    }
}

//Delete a post
export async function DELETE(req: any) {
    const id = extractIdFromUrl(req);
    if (!id) {
        return NextResponse.json({ success: false, message: "ID missing" });
    }
    try {
        const deletedPost = await prisma.post.delete({
            where: { id: id as string }
        });
        return NextResponse.json({ success: true, data: deletedPost ,message :"The post has been deleted successfully" });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Failed to delete post" });
    }
}
