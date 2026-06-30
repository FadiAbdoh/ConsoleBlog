

import { Metadata } from 'next';
import Image from 'next/image'
import Link from 'next/link'
import connect from "@/app/utils/db" // 👈 استيراد دالة الاتصال مباشرة
import Post from "@/models/Post"       // 👈 استيراد الموديل مباشرة

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
    title: 'Articles & Tutorials | ConsoleBlog',
    description: "Read our latest articles, guides, and tutorials about React, Next.js, TypeScript, and modern web development technologies.",
};

type PostType = {
    _id: string,
    title: string
    desc: string
    image: string
    content: string
    username: string
}

export default async function BlogPage() {
    await connect();
    const data: PostType[] = await Post.find();

    return (
        <div className='flex flex-col my-[30px] gap-[50px]'>
            {(data.length === 0) ? 
            <div className="text-center py-20 border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl">
                <h2 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                    No articles have been published yet!
                </h2>
                <p className="text-zinc-500 dark:text-zinc-400 font-light">
                    Follow us soon, we are working on writing interesting programming topics.
                </p>
            </div>
            : data.map((p: PostType) => (
                <Link key={p._id} href={`/blog/${p._id}`} className="flex flex-col md:flex-row gap-6 md:gap-[50px] items-center w-full group">
                    <div className="w-full md:flex-1 h-[250px] md:h-[350px] relative overflow-hidden rounded-lg shadow-sm">
                        <Image 
                            src={p.image} 
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            alt="category image"
                            className="object-cover group-hover:scale-102 transition-transform duration-300"
                        />
                    </div>
                    <div className="w-full md:flex-2 flex flex-col gap-3 text-center md:text-left">
                        <h1 className="text-[28px] md:text-[40px] font-bold leading-tight group-hover:text-[#2e8b57] transition-colors">
                            {p.title}
                        </h1>
                        <p className="text-[16px] md:text-[18px] text-gray-500 dark:text-zinc-400 font-light leading-relaxed">
                            {p.desc}
                        </p>
                    </div>
                </Link>
            ))}
            
        </div>
    )
}

