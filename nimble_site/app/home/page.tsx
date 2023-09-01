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
      <div className='max-w-4xl mx-auto py-8 space-y-4'>
        <h2 className='text-3xl font-semibold text-center self-center text-blue-100'>
          Welcome to NimbleLabs
        </h2>
        <div className='bg-gradient-to-r from-purple-400 to-cyan-500 hover:from-cyan-500 hover:to-purple-400 rounded-lg p-2 shadow-md text-center self-center transition-transform transform hover:scale-105'>
          <SplashButton />
        </div>
        <div className='bg-gradient-to-r from-purple-400 to-cyan-500 hover:from-cyan-500 hover:to-purple-400 rounded-lg p-2 shadow-md text-center self-center transition-transform transform hover:scale-105'>
          <TestButton />
        </div>
        <h1 className='text-xl font-bold text-center'>test</h1>
        <div id='teamPics' className='flex flex-row space-x-4 justify-center'>
          <img
            className='w-32 sm:w-48 md:w-64 rounded-lg shadow-md'
            src='https://ca.slack-edge.com/T0589LN69MY-U058X16QFC6-b125805b1c7c-512'
            alt='Team Member 1'
          />

          <div className='relative w-32 sm:w-48 md:w-64'>
            <img
              className='w-full rounded-lg shadow-md'
              src='https://www.enginethemes.com/wp-content/themes/et_home_new/img/bird-code-min.png'
              alt='Bird Code'
            />
          </div>

          <img
            className='w-32 sm:w-48 md:w-64 rounded-lg shadow-md'
            src='https://ca.slack-edge.com/T0589LN69MY-U05CZ0GKPBM-0b90155a6dba-512'
            alt='Team Member 3'
          />
        </div>
      </div>
    </div>
  );
}
