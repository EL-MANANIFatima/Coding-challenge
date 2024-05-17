import { NextResponse } from 'next/server';
import prisma from '../../../../utils/connect';

type Data = {
    success: boolean;
    data?: any;
    message?: string;
};

//In this file , I defined functions that would handle 
//HTTP request that are applyied tp all posts , meaning 
//that no id for a specific post is needed

//Fetching all posts
export async function GET(req: any) {
    try {
        const posts = await prisma.post.findMany();
        return NextResponse.json({ success: true, data: posts });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Failed to fetch posts" });
    }
}

//Adding a new post
export async function POST(req: any) {
    try {
        const { title, content } = await req.json();
        const createdPost = await prisma.post.create({
            data: {
                title,
                content
            }
        });
        return NextResponse.json({ success: true, data: createdPost , message:"The new post have been added succesfully " });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Failed to create post" });
    }
}


