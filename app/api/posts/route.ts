import { NextResponse } from "next/server"
import connect from "@/app/utils/db"
import Post from "@/models/Post";

export const GET = async () => {
    try {
        // الاتصال بقاعدة البيانات
        await connect();
        // جلب كل المقالات الموجودة في جدول Posts
        const posts = await Post.find()

        // إرجاع البيانات للمستخدم مع رمز الحالة 200 (Success)
        return new NextResponse(JSON.stringify(posts), {status: 200})
    } catch(error) {
        return new NextResponse('Database Error', {status: 500})
    }
}