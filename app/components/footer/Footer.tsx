
import styles from './footer.module.css'
import GitHubIcon from '@mui/icons-material/GitHub'; // خيار ممتاز لمدونة مبرمج بدل X أو إضافة له
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className={`${styles.foo} flex justify-between items-center text-[16px]  border-t border-gray-500 dark:border-zinc-900 mt-10 py-4`}>
            <div>
                © 2026 <span className='text-[#2e8b57]'>ConsoleBlog</span>. All rights reserved.
            </div>
            <div className='flex items-center gap-4'>
                <Link
                    href='https://github.com'
                    target='_blank'
                    aria-label="Follow us on Facebook"
                    rel='noopener noreferrer'
                    className="p-1.5 rounded-full hover:bg-[#2e8b57]/15 dark:hover:bg-[#2e8b57]/20 transition-all duration-300 flex items-center justify-center cursor-pointer"
                >
                        <GitHubIcon className="text-[20px] text-blax-500 dark:text-white" />
                </Link>
                <Link
                    href='https://x.com'
                    target='_blank'
                    aria-label="Follow us on Facebook"
                    rel='noopener noreferrer'
                    className="p-1.5 rounded-full hover:bg-[#2e8b57]/15 dark:hover:bg-[#2e8b57]/20 transition-all duration-300 flex items-center justify-center cursor-pointer"
                >
                        <XIcon className="text-[18px] text-blax-500 dark:text-white" />
                </Link>
                <Link 
                    href='https://youtube.com'
                    target='_blank'
                    aria-label="Follow us on Facebook"
                    rel='noopener noreferrer'
                    className="p-1.5 rounded-full hover:bg-[#2e8b57]/15 dark:hover:bg-[#2e8b57]/20 transition-all duration-300 flex items-center justify-center cursor-pointer"
                >
                    <YouTubeIcon className="text-[20px] text-red-500"/>
                </Link>
                <Link
                    href='https://instagram.com'
                    target='_blank'
                    aria-label="Follow us on Facebook"
                    rel='noopener noreferrer'
                    className="p-1.5 rounded-full hover:bg-[#2e8b57]/15 dark:hover:bg-[#2e8b57]/20 transition-all duration-300 flex items-center justify-center cursor-pointer"
                >
                    <InstagramIcon className="text-[20px] text-pink-500" />
                </Link>
                <Link
                    href='https://facebook.com'
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label="Follow us on Facebook"
                    className="p-1.5 rounded-full hover:bg-[#2e8b57]/15 dark:hover:bg-[#2e8b57]/20 transition-all duration-300 flex items-center justify-center cursor-pointer"
                >
                    <FacebookIcon className="text-[20px] text-blue-600" />
                </Link>
            </div>
        </footer>
    )
}
