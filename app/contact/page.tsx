
import styles from './page.module.css'
import Image from 'next/image'
import Button from '../components/Buttons/Button'
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us | Get In Touch | ConsoleBlog',
    
};

export default function ContactPage() {
    return (
        <div className=''>
            <h1 className='uppercase font-bold text-[24px] md:text-[30px] text-center mb-10 md:mb-[50px] tracking-wide'>
                let`s keep in touch
            </h1>
            <div className='flex flex-col md:flex-row gap-5 md:gap-[100px] items-center w-full'>
                <div className='w-full md:flex-1 h-[200px] md:h-[450px] relative'>
                    <Image 
                        src='/contact.png' 
                        fill 
                        alt='contact Image' 
                        className={`${styles.img} object-contain animate-pulse`} 
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                        priority={true} 
                    />
                </div>
                <form className='w-full md:flex-1 flex flex-col gap-5'>
                    {/* <input type="text" placeholder="name" className={styles.input} /> */}
                    <input 
                        type="text"
                        placeholder="name" 
                        className='w-full p-4 border border-transparent bg-zinc-100 dark:bg-[#f4f4f512] text-neutral-900 dark:text-white placeholder-gray-500 focus:border-[#2e8b57] focus:shadow-[0_0_15px_rgba(83,194,139,0.25)] rounded-md outline-none transition-all duration-300' 
                    />
                    <input 
                        type="email"
                        placeholder="email" 
                        className='w-full p-4 border border-transparent bg-zinc-100 dark:bg-[#f4f4f512] text-neutral-900 dark:text-white placeholder-gray-500 focus:border-[#2e8b57] focus:shadow-[0_0_15px_rgba(83,194,139,0.25)] rounded-md outline-none transition-all duration-300' 
                    />
                    <textarea
                        className='w-full p-4 border border-transparent bg-zinc-100 dark:bg-[#f4f4f512] text-neutral-900 dark:text-white placeholder-gray-500 focus:border-[#2e8b57] focus:shadow-[0_0_15px_rgba(83,194,139,0.25)] rounded-md outline-none transition-all duration-300 resize-none'
                        placeholder="message"
                        cols={30}
                        rows={6}
                    ></textarea>
                    <div className="w-full">
                        <button 
                            type='button'
                            className='py-2 bg-[#2e8b57] hover:bg-[#429b6f] text-white font-medium rounded-md duration-[.3s] block w-full active:scale-[0.99] cursor-pointer'
                        >
                            Send
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}