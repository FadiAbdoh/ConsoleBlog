
import Link from 'next/link'
import styles from './page.module.css'
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Our Works & Portfolio | ConsoleBlog',
    description: "Discover our latest completed projects, interactive web applications, and software engineering solutions.",
};

export default function PortfolioPage() {
    return (
        <div className={styles.container}>
            <h1 className='font-bold text-[20px] text-center mb-[8px]'>Choose a gallery</h1>
            
            <div className={styles.items}>
                <Link href={'/portfolio/illustrations'} className={styles.item}>
                    <span className={styles.category}>illustrations</span>
                </Link>

                <Link href={'/portfolio/websites'} className={styles.item}>
                    <span className={styles.category}>websites</span>
                </Link>

                <Link href={'/portfolio/applications'} className={styles.item}>
                    <span className={styles.category}>application</span>
                </Link>
                
            </div>
        </div>
    )
}