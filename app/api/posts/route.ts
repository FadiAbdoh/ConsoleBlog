import { NextResponse } from "next/server"
import connect from "@/app/utils/db"
import Post from "@/models/Post";
import { auth } from "../auth/[...nextauth]/route";

export const GET = async (request: Request) => {
    const url = new URL(request.url)
    const username = url.searchParams.get('username')
    try {
        // الاتصال بقاعدة البيانات
        await connect();
        // 2. تجهيز كائن الفلتر الفارق
        const query: {username?: string} = {};
        
        // إذا كان الـ username موجوداً وقادماً من الرابط، أضفه للفلتر
        if (username) {
            query.username = username;
        }
        // جلب كل المقالات الموجودة في جدول Posts
        const posts = await Post.find(query)

        // إرجاع البيانات للمستخدم مع رمز الحالة 200 (Success)
        return new NextResponse(JSON.stringify(posts), {status: 200})
    } catch(error) {
        return new NextResponse('Database Error', {status: 500})
    }
}

export const POST = async (request: Request) => {
    const session = await auth();
    if (!session || !session.user) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        // الاتصال بقاعدة البيانات
        await connect();
        const body = await request.json();
        const newPost = new Post(body)    
        await newPost.save()

        // إرجاع البيانات للمستخدم مع رمز الحالة 200 (Success)
        return new NextResponse('Post has been created', {status: 201})
    } catch(error) {
        return new NextResponse('Database Error', {status: 500})
    }
}