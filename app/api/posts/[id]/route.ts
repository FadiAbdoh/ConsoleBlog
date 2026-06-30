import { NextResponse } from "next/server"
import connect from "@/app/utils/db"
import Post from "@/models/Post";
import { auth } from "../../auth/[...nextauth]/route";

export const GET = async (
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) => {
    
    try {
        const { id } = await params
        // الاتصال بقاعدة البيانات
        await connect();
        // جلب كل المقالات الموجودة في جدول Posts
        const post = await Post.findById(id)

        if (!post) {
            return new NextResponse("Post Not Found", { status: 404 });
        }

        // إرجاع البيانات للمستخدم مع رمز الحالة 200 (Success)
        return new NextResponse(JSON.stringify(post), {status: 200})
    } catch(error) {
        return new NextResponse('Database Error', {status: 500})
    }
}

export const DELETE = async (
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) => {
    const session = await auth();
    if (!session || !session.user) {
        return new NextResponse('Unauthorized', { status: 401 });
    }
    
    try {
        const { id } = await params
        // الاتصال بقاعدة البيانات
        await connect();
        // جلب كل المقالات الموجودة في جدول Posts
        const post = await Post.findById(id);
        if (!post) {
            return new NextResponse('Post not found', { status: 404 });
        }
        if (post.username !== session.user.name) {
            return new NextResponse('You are not allowed to delete this post!', { status: 403 });
        }

        await Post.findByIdAndDelete(id)
        // إرجاع البيانات للمستخدم مع رمز الحالة 200 (Success)
        return new NextResponse('Post has been DELETED', {status: 200})
    } catch(error) {
        return new NextResponse('Database Error', {status: 500})
    }
}