"use client"

import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { SyntheticEvent, useEffect, useState } from 'react';
import useSWR from 'swr';
import TextField from "@mui/material/TextField";
import Link from 'next/link';

interface Post {
    _id: string;
    title: string;
    desc: string;
    content: string;
    image?: string;
    createdAt: string;
}

interface PostFormData {
    title: string;
    desc: string;
    image: string;
    content: string;
}

export default function DashboardPage() {
    const session = useSession();
    const router = useRouter()

    const fetcher = (url: string) => fetch(url).then(res => res.json());
    const { data, error, isLoading, mutate } = useSWR(
        session.data?.user?.name 
        ? `api/posts?username=${session.data.user.name}` 
        : null, fetcher
    )
    const [formData, setFormData] = useState<PostFormData>({
        title: "",
        desc: "",
        image: "",
        content: ""
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };
    useEffect(() => {
        if  (session.status === "unauthenticated") {
            router.push("/dashboard/login");
        }
    }, [session.status, router]);

    if (session.status === "loading") {
        return <div className="text-center mt-10">Loading dashboard...</div>;
    }
    if (!session.status) return null;
    
    const handleCreatePost = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        const title = formData.get('title');
        const desc = formData.get('desc');
        const image = formData.get('image');
        const content = formData.get("content");

        try {
            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ title, content, desc, image, username: session.data?.user?.name})
            })
            if (response.ok) {
                setFormData({ title: "", desc: "", image: "", content: "" });
                mutate();
            }
        } catch (error) {
            console.log("Error creating post:", error);
        }
    }

    const handleDeletePost = async (id: string) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this post? 🗑️");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`/api/posts/${id}`, {
                method: 'DELETE'
            })
            if(response.ok) {
                mutate()
            } else {
                if (response.status === 401) {
                    alert("You must be logged in to delete posts.");
                } else if (response.status === 403) {
                    alert("You are not allowed to delete this post!");
                } else {
                    alert("Failed to delete the post.");
                }
            }
        } catch(error) { 
            console.error("Error deleting post:", error);
            alert("An error occurred while deleting the post.");
        }
    }

    return (
        <div className="max-w-6xl mx-auto md:p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className=" bg-background border border-gray-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm h-fit">
                <h2 className="text-xl font-bold mb-4 text-[#2e8b57]">Create New Post</h2>
                <form className="flex flex-col gap-4" onSubmit={handleCreatePost}>
                    <TextField
                        label="Post Title"
                        name="title"
                        type="text"
                        required
                        value={formData.title}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        sx={{
                            // لون الـ Label (الكلمة المرفوعة أو بداخل الحقل)
                            "& .MuiInputLabel-root": { color: "var(--main-text, #94a3b8)" },
                            "& .MuiInputLabel-root.Mui-focused": { color: "#2e8b57" },
                            // لون النص الذي يكتبه المستخدم والحدود
                            "& .MuiOutlinedInput-root": {
                                color: "inherit", // يقرأ لون النص الأبيض للثيم الداكن تلقائياً
                                "& fieldset": { borderColor: "#888888" }, // حدود خفيفة واضحة بالعتمة
                                "&:hover fieldset": { borderColor: "#2e8b57" },
                                "&.Mui-focused fieldset": { borderColor: "#2e8b57" },
                            },
                        }}
                    />
                    <TextField
                        label="Post Description"
                        name="desc"
                        value={formData.desc}
                        onChange={handleChange}
                        required
                        fullWidth
                        rows={1}
                        variant="outlined"
                        sx={{
                            // لون الـ Label (الكلمة المرفوعة أو بداخل الحقل)
                            "& .MuiInputLabel-root": { color: "var(--main-text, #94a3b8)" },
                            "& .MuiInputLabel-root.Mui-focused": { color: "#2e8b57" },
                            // لون النص الذي يكتبه المستخدم والحدود
                            "& .MuiOutlinedInput-root": {
                                color: "inherit", // يقرأ لون النص الأبيض للثيم الداكن تلقائياً
                                "& fieldset": { borderColor: "#888888" }, // حدود خفيفة واضحة بالعتمة
                                "&:hover fieldset": { borderColor: "#2e8b57" },
                                "&.Mui-focused fieldset": { borderColor: "#2e8b57" },
                            },
                        }}
                    />
                    <TextField
                        label="Image URL"
                        name="image"
                        type='url'
                        required
                        value={formData.image}
                        onChange={handleChange}
                        fullWidth
                        rows={1}
                        variant="outlined"
                        sx={{
                            // لون الـ Label (الكلمة المرفوعة أو بداخل الحقل)
                            "& .MuiInputLabel-root": { color: "var(--main-text, #94a3b8)" },
                            "& .MuiInputLabel-root.Mui-focused": { color: "#2e8b57" },
                            // لون النص الذي يكتبه المستخدم والحدود
                            "& .MuiOutlinedInput-root": {
                                color: "inherit", // يقرأ لون النص الأبيض للثيم الداكن تلقائياً
                                "& fieldset": { borderColor: "#888888" }, // حدود خفيفة واضحة بالعتمة
                                "&:hover fieldset": { borderColor: "#2e8b57" },
                                "&.Mui-focused fieldset": { borderColor: "#2e8b57" },
                            },
                        }}
                    />
                    <TextField
                        label="What's on your mind?"
                        name="content"
                        required
                        value={formData.content}
                        onChange={handleChange}
                        fullWidth
                        multiline
                        rows={7}
                        variant="outlined"
                        sx={{
                            // لون الـ Label (الكلمة المرفوعة أو بداخل الحقل)
                            "& .MuiInputLabel-root": { color: "var(--main-text, #94a3b8)" },
                            "& .MuiInputLabel-root.Mui-focused": { color: "#2e8b57" },
                            // لون النص الذي يكتبه المستخدم والحدود
                            "& .MuiOutlinedInput-root": {
                                color: "inherit", // يقرأ لون النص الأبيض للثيم الداكن تلقائياً
                                "& fieldset": { borderColor: "#888888" }, // حدود خفيفة واضحة بالعتمة
                                "&:hover fieldset": { borderColor: "#2e8b57" },
                                "&.Mui-focused fieldset": { borderColor: "#2e8b57" },
                            },
                        }}
                    />
                    <button
                        type="submit"
                        className="w-full py-2.5 bg-[#2e8b57] hover:bg-[#256f45] text-white font-medium rounded-md transition-colors cursor-pointer shadow-sm text-sm"
                    >
                        Publish Post
                    </button>
                </form>
            </div>
            {/* 🔵 القسم الأيمن: عرض البوستات المجلوبة من الداتابيز */}
            <div className=" flex flex-col gap-4">
                {/* 1. حالة التحميل من قاعدة البيانات */}
                {isLoading && (
                    <div className="text-gray-500 text-sm">Loading posts...</div>
                )}
                {error && (
                    <div className="text-red-500 text-sm">Failed to load posts.</div>
                )}
                {!isLoading && data && data.length === 0 && (
                    <div className="text-gray-500 text-sm border border-dashed border-gray-300 dark:border-zinc-700 rounded-xl p-8 text-center">
                        You haven`t written any posts yet. Start writing now! ✍️
                    </div>
                )}
                {!isLoading && data && data.length > 0 && (
                    <div className="grid grid-cols-1 gap-4">
                        {data.map((post: Post) => (
                            <Link href={`/blog/${post._id}`} key={post._id}>
                                <div className="relative p-5 border border-gray-200 dark:border-zinc-800 bg-background rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                    {post.image && (
                                        <div className="w-full h-48 relative rounded-lg overflow-hidden mb-2 bg-gray-100 dark:bg-zinc-900">
                                            <Image 
                                                src={post.image} 
                                                alt={post.title}
                                                fill // 🟢 يجعل الصورة تملأ الـ div الأب بالكامل أوتوماتيكياً
                                                sizes="(max-w-768px) 100vw, 33vw" // لتحسين الأداء حسب حجم الشاشة
                                                className="object-cover"
                                                loading="lazy"
                                            />
                                        </div>
                                    )}
                                    <div>
                                        <h3 className="text-lg font-bold capitalize mb-2">{post.title}</h3>
                                        <p className="capitalize mb-1 italic">{post.desc}</p>
                                        <p className="capitalize text-sm whitespace-pre-line mb-3">{post.content}</p>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault()
                                            e.stopPropagation()
                                            handleDeletePost(post._id)
                                        }}
                                        title="Delete Post"
                                        className="w-full py-2.5 bg-[#2e8b57] hover:bg-[#256f45] text-white font-medium rounded-md transition-colors cursor-pointer shadow-sm text-sm"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
