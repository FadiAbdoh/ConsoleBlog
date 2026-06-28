"use client"

import useSWR from 'swr'
import styles from './page.module.css'
import { Metadata } from 'next';
import { useSession } from 'next-auth/react';
import { data } from 'framer-motion/client';

// export const metadata: Metadata = {
//     title: 'Admin Dashboard | ConsoleBlog',
    
// };

export default function DashboardPage() {
    
    // const fetcher = (url: string) => fetch(url).then((res) => res.json())

    // const { data, error, isLoading } = useSWR('https://jsonplaceholder.typicode.com/posts', fetcher)

    // // console.log(data)

    // const { data: session, status } = useSession();
    const s = useSession();

    console.log(s)

    return (
        <div className={styles.container}>Dashboard Page</div>
    )
}

