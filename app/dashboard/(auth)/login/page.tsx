"use client"

import { signIn } from 'next-auth/react'
import styles from './page.module.css'
import GitHubIcon from '@mui/icons-material/GitHub';
import Link from 'next/link';
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import React, { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

// type StatusType = 'error' | 'success'
type StatusType = {
    type: 'error' | 'success',
    message: string
}

export default function LoginPage() {

    
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);    
    const router = useRouter()
    const searchParams = useSearchParams();
    const msg = searchParams.get("success");
    const [status, setStatus] = useState<StatusType | null>(
        msg ? { type: "success", message: msg } : null
    )



    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        setStatus(null)
        const formData = new FormData(e.currentTarget)
        const email = formData.get('email')
        const password = formData.get('password')
        const request = signIn('credentials', {
            redirect: false,
            email,
            password
        })
        if((await request).error) {
            setStatus({type: 'error', message: 'Invalid Email or Password!'})
        } else {
            setStatus({ type: "success", message: "Logged in successfully! Redirecting..." });
            setTimeout(() => {
                router.push("/dashboard");
                router.refresh();
            }, 1500);
        }
    }


    return (
        <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
            <div className="flex min-h-[75vh] flex-col items-center justify-center md:p-4">
                <div className="w-full max-w-md rounded-xl border border-gray-200 dark:border-zinc-800 bg-background p-5 md:p-8 shadow-md">
                    <h1 className="text-3xl font-bold text-center mb-1">Welcome Back</h1>
                    <h2 className="text-sm text-center text-gray-500 dark:text-gray-400 mb-6">
                        Sign in to access your dashboard.
                    </h2>
        
                    {status && (
                        <Alert severity={status.type} className="mb-4">
                            {status.message}
                        </Alert>
                    )}
        
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        <TextField
                            label="Email Address"
                            name="email"
                            type="email"
                            required
                            fullWidth
                            variant="outlined"
                            sx={{
                                "& .MuiInputLabel-root": { color: "var(--main-text, #94a3b8)" },
                                "& .MuiInputLabel-root.Mui-focused": { color: "#2e8b57" },
                                "& .MuiOutlinedInput-root": {
                                    color: "inherit",
                                    "& fieldset": { borderColor: "#888888" },
                                    "&:hover fieldset": { borderColor: "#2e8b57" },
                                    "&.Mui-focused fieldset": { borderColor: "#2e8b57" },
                                },
                            }}
                        />
                        <FormControl variant="outlined" fullWidth required
                            sx={{
                                "& .MuiInputLabel-root": { color: "var(--main-text, #94a3b8)" },
                                "& .MuiInputLabel-root.Mui-focused": { color: "#2e8b57" },
                                "& .MuiOutlinedInput-root": {
                                        color: "inherit",
                                        "& fieldset": { borderColor: "#888888" },
                                        "&:hover fieldset": { borderColor: "#2e8b57" },
                                        "&.Mui-focused fieldset": { borderColor: "#2e8b57" },
                                },
                            }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                label="Password"
                                sx={{
                                    color: "inherit",
                                    "& fieldset": { borderColor: "#888888" },
                                    "&:hover fieldset": { borderColor: "#2e8b57" },
                                    "&.Mui-focused fieldset": { borderColor: "#2e8b57" },
                                }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label={showPassword ? "Hide password" : "Show password"}
                                            onClick={handleClickShowPassword}
                                            sx={{color: '#2e8b57'}}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <button 
                            type="submit"
                            className="w-full py-3 mt-2 bg-[#2e8b57] hover:opacity-90 text-white font-medium rounded-md transition-all cursor-pointer shadow-sm"
                        >
                            Sign In
                        </button>
                    </form>
        
                    <div className="text-center my-4 text-gray-400 dark:text-zinc-600 text-sm font-medium">
                        - OR -
                    </div>
                    <button
                        type="button" // 💡 مهم جداً تحديد نوعه button لكي لا يعمل Submit للفورم الأساسي
                        onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
                        className="flex items-center justify-center gap-3 w-full py-2.5 px-4 bg-[#24292e] hover:bg-[#1a1e22] text-white font-medium rounded-md transition-colors duration-200 cursor-pointer shadow-sm mb-4 text-sm"
                    >
                        {/* استدعي أيقونة جيتهاب من المجلد الذي تستخدمه، مثلاً GitHubIcon من MUI */}
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                        Continue with GitHub
                    </button>
                    <div className="text-center">
                        <Link 
                            href="/dashboard/register" 
                            className="text-sm text-[var(--main-green)] hover:underline font-medium"
                        >
                            Don`t have an account? Register here
                        </Link>
                    </div>
                </div>
            </div>
        </Suspense>
    )
}

