
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import GitHub from "next-auth/providers/github"
import connect from '@/app/utils/db'
import User from "@/models/User"
import bcrypt from "bcryptjs"

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        GitHub({
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET,
        }),
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                if(!credentials.email || !credentials.password) return null

                await connect();
                const existingUser = await User.findOne({ email: credentials.email })
                if(!existingUser) {
                    throw new Error("No user found with this email!");
                }

                const isPasswordCorrect = await bcrypt.compare(
                    credentials.password as string, existingUser.password
                )        

                if (!isPasswordCorrect) {
                    throw new Error("Wrong password!");
                }

                return {
                    id: existingUser._id.toString(),
                    username: existingUser.username,
                    email: existingUser.email,

                }
            }
        })
    ],
    pages: {
        signIn: '/dashboard/login'
    }
})

export const { GET, POST } = handlers
