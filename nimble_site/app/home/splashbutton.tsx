


"use client"
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { notFound, redirect, usePathname, useRouter } from 'next/navigation';
import { cookies } from 'next/headers';
import type { Database } from '../../lib/database.types';



export default function SplashButton() {
    const router = useRouter()
    const handleButtonClick = () => {
        router.push('/splash')
    }


    return (
        <button className=" bg-blue-500 text-white tm-5" onClick={handleButtonClick}>Learn more about the team</button>
    )
}
