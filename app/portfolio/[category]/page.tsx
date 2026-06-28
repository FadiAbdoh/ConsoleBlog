
import Button from '@/app/components/Buttons/Button'
import styles from './page.module.css'
import Image from 'next/image'
import { items } from './data'
import { notFound } from 'next/navigation'
import { Key } from 'react'
import { Metadata } from 'next'

type PageType = {
  params: Promise<{
    category: string
  }>
}

const getData = (category: string) => {
  const data = items[category]

  if(data) return data

  return notFound()
}

export async function generateMetadata({ params }: PageType): Promise<Metadata> {
  const { category } = await params;
  const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);
  if(!category) {
    return {
      title: 'category Not Found | ConsoleBlog',
      description: 'The requested portfolio category could not be found.'
    }
  }

  return {
        title: `${formattedCategory} Portfolio | ConsoleBlog`,
        description: `Explore our latest works, projects, and articles in ${formattedCategory} development.`,
        
        // إعدادات مشاركة الرابط (Open Graph)
        openGraph: {
            title: `${formattedCategory} Projects - ConsoleBlog`,
            description: `Check out our professional ${formattedCategory} development portfolio.`,
        }
    };
}

export default async function Category({ params }: PageType) {
  const resolvedParams = await params
  const category = resolvedParams.category
  const data = getData(category)

  return (
    <div className={styles.container}>
      <h1 className='uppercase font-bold text-[20px] text-center mb-[20px] text-[#2e8b57]'>
        {category}
      </h1>
      {data.map(( item ) => (
        <div key={item.id} className='flex flex-col-reverse md:flex-row odd:md:flex-row-reverse gap-8 md:gap-[50px] my-10 md:my-[100px] items-center'>
          <div className='flex-1 flex flex-col justify-center text-center md:text-left gap-4'>
            <h1 className='text-[32px] md:text-[50px] font-bold leading-tight'>{item.title}</h1>
            <p className='text-[16px] md:text-[20px] text-gray-600 dark:text-zinc-400'>
              {item.desc}
            </p>
            <Button text='see more' url='' padding={10}/>
          </div>
          <div className='w-full md:flex-1 h-[300px] md:h-[500px] relative'>
            <Image 
              src={item.image} 
              fill 
              alt='category image'
              className='object-cover rounded-lg'
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={true}
            />
          </div>
        </div>
      ))}
      {/*  */}
      {/*  */}
      
      
    </div>
  )
}
