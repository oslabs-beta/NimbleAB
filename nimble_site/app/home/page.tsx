import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { notFound, redirect, usePathname, useRouter } from 'next/navigation';
import { cookies } from 'next/headers';
import { TestButton } from './testButton';
import type { Database } from '../../lib/database.types';
import SplashButton from './splashbutton';
import Head from 'next/head';
import Script from 'next/script';
export const dynamic = 'force-dynamic';
export default async function Home() {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) redirect('/');

  return (
    <div className='relative min-h-screen text-foreground p-6'>
      <div className='max-w-4xl mx-auto py-10 space-y-8'>
        <h2 className='text-6xl font-semibold text-center self-center text-blue-100'>
          Welcome to NimbleLabs
        </h2>
        <div className='flex justify-center space-x-4'>
          <div className='bg-gradient-to-r from-purple-400 to-cyan-500 hover:from-cyan-500 hover:to-purple-400 rounded-lg p-2 shadow-md text-center self-center transition-transform transform hover:scale-105'>
            <TestButton />
          </div>

        </div>
        
      </div>
    </div>
  );
}
