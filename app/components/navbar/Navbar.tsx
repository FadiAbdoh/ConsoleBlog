"use client"

import Link from "next/link";
import styles from './navbar.module.css'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { signOut, useSession } from "next-auth/react";


const links = [
    {
        id: 1,
        title: 'Home',
        url: '/'
    },
    {
        id: 2,
        title: 'Portfolio',
        url: '/portfolio'
    },
    {
        id: 3,
        title: 'Blog',
        url: '/blog'
    },
    {
        id: 4,
        title: 'About',
        url: '/about'
    },
    {
        id: 5,
        title: 'Contact',
        url: '/contact'
    },
    {
        id: 6,
        title: 'Dashboard',
        url: '/dashboard'
    },
]

interface AuthButtonProps {
    label: string;
    onClick?: () => void | Promise<void>;
    className?: string; 
}

function AuthButton({ 
    label, 
    onClick, 
    className = 'p-[5px] bg-[#2e8b57] text-white cursor-pointer rounded-[5px] py-1 px-2 hover:bg-[#3ea876] transition-colors duration-300' 
}: AuthButtonProps) {
    return (
        <button 
            aria-label={`${label} from ConsoleBlog`}
            onClick={onClick}
            className={className}
        >
            {label}
        </button>
    )
}

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const navRef = useRef<HTMLDivElement>(null);
    const session = useSession()

    

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isOpen && navRef.current && !navRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <nav ref={navRef} className='flex justify-between items-center h-[100px] relative z-50'>
            <Link href={'/'} className='font-bold text-2xl'>
                ConsoleBlog
            </Link>
            <div className='hidden md:flex items-center gap-5'>
                <ThemeToggle></ThemeToggle>
                {links.map((l) => (
                    <Link 
                        key={l.id} 
                        href={l.url}
                        className="hover:text-[#2e8b57] transition-colors duration-[.3s]"
                    >
                        {l.title}
                    </Link>
                ))}
                {session.status === 'authenticated' ?
                    (
                        <AuthButton 
                            label="Logout"
                            onClick={async () => await signOut({ callbackUrl: "/dashboard/login" })}
                        />
                    )
                    : (
                        <Link href='/dashboard/login'>
                            <AuthButton label="Login"/>
                        </Link>
                    )
                }
            </div>
            <div className="flex md:hidden items-center gap-4">
                <ThemeToggle />
                <IconButton
                    aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-current"
                    size="large"
                >
                    
                    {isOpen ? <CloseIcon className="text-2xl text-[#2e8b57]" /> : <MenuIcon className="text-2xl text-[#2e8b57]" />}
                </IconButton>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="absolute top-[100px] left-0 w-full bg-background border-b border-gray-200 dark:border-zinc-800 flex flex-col p-6 gap-4 md:hidden shadow-lg rounded-b-lg"
                    >
                        {links.map((link) => (
                            <Link 
                                key={link.id} 
                                href={link.url} 
                                onClick={() => setIsOpen(false)}
                                className="text-lg font-medium hover:text-[#2e8b57] transition-colors py-2 border-b border-gray-100 dark:border-zinc-900 last:border-0 duration-[.3s]"
                            >
                                {link.title}
                            </Link>
                        ))}
                        {session.status === 'authenticated' ? 
                        (
                            <AuthButton 
                                label="Logout"
                                onClick={async () => await signOut({ callbackUrl: "/dashboard/login" })}
                                className="bg-[#2e8b57] hover:bg-[#3ea876] text-white w-full py-2.5 rounded-[5px] mt-2 transition-colors duration-300 cursor-pointer"
                            />
                        )
                        : (
                            <Link href='/dashboard/login'>
                                <AuthButton 
                                    label="Login"
                                    className="bg-[#2e8b57] hover:bg-[#3ea876] text-white w-full py-2.5 rounded-[5px] mt-2 transition-colors duration-300 cursor-pointer"
                                />
                            </Link>
                        )
                        }
                    </motion.div>
                )}
            </AnimatePresence>
            
        </nav>
    )
}

/*
<button 
                            aria-label="Log out from ConsoleBlog mobile menu"
                            className="bg-[#2e8b57] hover:bg-[#3ea876] text-white w-full py-2.5 rounded-[5px] mt-2 transition-colors duration-300 cursor-pointer"
                            onClick={async () => {
                                await signOut({ callbackUrl: "/dashboard/login" });
                            }}
                        >
                            Logout
                        </button>
*/