
import connect from "@/app/utils/db"
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"
import User from "@/models/User"

export async function POST(request: Request) {
    try {
        const { username, email, password } = await request.json()
        await connect()
        const existingUser = await User.findOne({ email })
        if(existingUser) {
            return new NextResponse("Email is already in use", { status: 400 })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        })
        await newUser.save();
        return new NextResponse("User has been registered", { status: 201 });

    } catch(error: any) {
        console.error("Register Error:", error);
        // إرجاع رسالة نصية واضحة للسيرفر
        return new NextResponse(
            JSON.stringify({ message: error.message || "Internal Server Error" }), 
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}