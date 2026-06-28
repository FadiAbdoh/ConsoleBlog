
import { Metadata } from 'next';
import Button from '../components/Buttons/Button'
import styles from './page.module.css'
import Image from 'next/image'

export const metadata: Metadata = {
    title: 'About Us | ConsoleBlog',
    description: "Learn more about ConsoleBlog, our mission, and the software engineering journey behind building modern web applications.",
};

export default function AboutPage() {
    return (
        <div className='flex flex-col gap-[40px]'>
            <div className='relative w-full h-[250px] md:h-[400px] rounded-lg overflow-hidden group'>
                <Image 
                    src={'https://images.pexels.com/photos/3194521/pexels-photo-3194521.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'} 
                    fill
                    alt='about image'
                    className='object-cover grayscale'
                    sizes='100vw'
                    priority={true}
                />
                <div className='absolute inset-0 bg-black/40 dark:bg-black/60 flex flex-col justify-end p-4 md:p-8'>
                    <div className='w-full max-w-[600px] text-white'>
                        <h1 className='text-[24px] md:text-[36px] font-bold bg-[#2e8b57] px-3 py-1 w-max rounded-[4px] mb-2 leading-tight shadow-md'>Digital Storytellers</h1>
                        <h2 className='text-[14px] md:text-[18px] font-medium bg-zinc-900/80 backdrop-blur-sm px-3 py-1 w-max max-w-full rounded-[4px] shadow-sm'>
                            Handcrafting award winning digital experiences
                        </h2>
                    </div>
                </div>
            </div>
            <div className='flex flex-col md:flex-row gap-10 md:gap-[100px] w-full py-10'>
                <div className='flex-1 flex flex-col gap-4 text-center md:text-left'>
                    <h1 className='text-[28px] md:text-[36px] font-bold leading-tight'>
                        Who Are We?
                    </h1>
                    <div className='text-[16px] md:text-[18px] font-light text-justify space-y-4 leading-relaxed'>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
                            quae dolor, optio voluptatibus magnam iure esse tempora beatae.
                        </p>
                        <p>
                            A suscipit eos. Animi quibusdam cum omnis officiis voluptatum quo ea
                            eveniet? Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Ducimus quae dolor, optio voluptatibus magnam iure esse tempora
                            beatae, a suscipit eos. Animi quibusdam cum omnis officiis
                            voluptatum quo ea eveniet?
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet consectetur
                            adipisicing elit. Ducimus quae dolor, optio voluptatibus magnam iure
                            esse tempora beatae, a suscipit eos. Animi quibusdam cum omnis
                            officiis voluptatum quo ea eveniet?
                        </p>
                    </div>
                </div>
                <div className='flex-1 flex flex-col gap-4 text-center md:text-left'>
                    <h1 className='text-[28px] md:text-[36px] font-bold leading-tight'>What We Do?</h1>
                    <div className='text-[16px] md:text-[18px] font-light text-justify leading-relaxed w-full'>
                        <p className="mb-4">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
                            quae dolor, optio voluptatibus magnam iure esse tempora beatae, a
                            sửcipte eos. Animi quibusdam cum omnis officiis voluptatum quo ea
                            eveniet? Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </p>
                        
                        <ul className="space-y-2 font-medium text-[#2e8b57] list-disc list-inside font-bold">
                            <li>Creative Illustrations</li>
                            <li>Dynamic Websites</li>
                            <li>Fast and Handy</li>
                            <li>Mobile Apps</li>
                        </ul>
                    </div>
                    
                    <div className="mt-4 w-full md:w-auto p-[10px]">
                        <Button url='/contact' text='Contact' padding={10} />
                    </div>
                </div>
            </div>
        </div>
    )
}