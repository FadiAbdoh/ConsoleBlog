import { NextResponse } from "next/server"
import connect from "@/app/utils/db"
import Post from "@/models/Post";

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