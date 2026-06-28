
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Metadata } from 'next'
import connect from "@/app/utils/db" // 👈 استيراد دالة الاتصال مباشرة
import Post from "@/models/Post"       // 👈 استيراد الموديل مباشرة

type PostType = {
    _id: string,
    title: string
    desc: string
    image: string
    content: string
    username: string
}

async function getSinglePost(id: string): Promise<PostType | null> {
    try {
        await connect();
        const post = await Post.findById(id);
        if (!post) return null;
        // تحويل الكائن القادم من مونجو إلى كائن plain JSON متوافق مع الـ Types
        return JSON.parse(JSON.stringify(post));
    } catch (error) {
        return null;
    }
}

export async function generateMetadata({ params }: {params: Promise<{id: string}>}): Promise<Metadata> {
    const { id } = await params
    const post = await getSinglePost(id)
    if(!post) {
        return {
            title: 'Post Not Found | ConsoleBlog',
            description: 'The requested blog post could not be found.'
        }
    }
    return {
        title: `${post.title} | ConsoleBlog`,
        description: post.desc,
        // إعدادات الـ Open Graph (لكي يظهر المقال بشكل فخم جداً وبصورته وعنوانه عند مشاركة الرابط على فيسبوك أو لينكد إن)
        openGraph: {
            title: post.title,
            description: post.desc,
            images: [
                {
                    url: post.image
                }
            ]
        }
    }
}

export default async function BlogPost({ params }: {params: Promise<{id: string}>}) {
    const resolvedParams = await params
    const id = resolvedParams.id
    const post = await getSinglePost(id)
    if (!post) {
        notFound();
    }
    return (
        <div className='flex flex-col my-[5px] gap-[50px]'>
            <div className='flex flex-col md:flex-row gap-[30px] items-center'>
                <div className='flex-1'>
                    <h1 className='text-[32px] md:text-[40px] font-bold leading-tight mb-2 text-center md:text-left'>
                        {/* Creative Portfolio */}
                        {post.title}
                    </h1>
                    <p className='text-[16px] md:text-[18px] mb-[10px] font-light text-center md:text-left'>
                        {post.desc}
                    </p>
                    <div className='flex items-center gap-3 mt-4 '>
                        <Image 
                            src={'https://images.pexels.com/photos/18101841/pexels-photo-18101841.jpeg'}
                            width={40}
                            height={40}
                            alt='user Image'
                            className='rounded-full object-cover'
                            style={{ width: '40px', height: '40px'}}
                            
                        />
                        <span className='font-medium text-base capitalize'>{post.username}</span>
                    </div>
                </div>
                <div className='w-full md:flex-1 h-[250px] md:h-[300px] relative '>
                    <Image 
                        src={post.image} 
                        fill 
                        alt='category image'
                        className='object-cover rounded-lg'
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={true}
                    />
                </div>
            </div>
            
            <div className='text-[16px] md:text-[20px] font-light text-justify space-y-6 leading-relaxed'>
                <p>
                    {post.content}
                </p>
            </div>

        </div>
    )
}