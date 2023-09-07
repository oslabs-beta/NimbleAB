import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';
import LogoutButton from '../components/LogoutButton';
import { notFound, redirect } from 'next/navigation';
export const dynamic = 'force-dynamic';

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) redirect('/home');

  return (
    <div className='w-full flex flex-col items-center'>
      <nav className='w-full flex justify-between items-center p-3'>
        <div className='flex flex-col items-start'>
          <h1 className='text-4xl font-extrabold text-white mb-1 tracking-tighter transform translate-y-[-0.125em] mt-1 pl-5'>
            NimbleAB
          </h1>
        </div>
        <div className='flex items-center space-x-6'>
          <Link
            href='/discover'
            className='text-lg text-white hover:underline hover:text-orange-300 transition duration-300'
          >
            Discover Features
          </Link>
          <Link
            href='/download'
            className='text-lg text-white hover:underline hover:text-orange-300 transition duration-300'
          >
            Download Files
          </Link>
          <Link
            href='/team'
            className='text-lg text-white hover:underline hover:text-orange-300 transition duration-300'
          >
            Learn More About the Team
          </Link>
          {/* <Link
            href='/login'
            className='text-lg ttext-white font-semibold hover:text-cyan-300 transition duration-300'
          >
            Login
          </Link> */}
        </div>
      </nav>
      <div className='min-h-screen flex flex-col items-center justify-center'>
        {/* <div className='bg-white bg-opacity-60 rounded-lg p-20 shadow-lg text-center max-w-4xl'> */}
        <div className='text-center max-w-4xl'>
          <h2
            className='text-4xl font-bold mb-10'
            style={{
              // background: 'linear-gradient(45deg, #7B2FE7, #0AA1CF)',
              // background: 'linear-gradient(45deg, #FF5733, #0047FF)',
              // background: 'linear-gradient(45deg, #00FFD1, #FF0094)',
              // background: 'linear-gradient(45deg, #BB00FF, #00FFFD)',
              // background: 'linear-gradient(45deg, #FF00A6, #00FEDC)',
              // background: 'linear-gradient(45deg, #39FF14, #006BFF)',
              // background: 'linear-gradient(45deg, #FF5733, #0047FF)',
              background: 'linear-gradient(45deg, #FFD700, #FF6347)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Taking A/B Testing to the Next Level
          </h2>
          <p className='text-2xl text-white mb-10 '>
            Discover the revolutionary features that NimbleAB offers to
            streamline your A/B testing procedures and achieve optimized
            results.
          </p>
          <Link
            href='/login'
            className='px-6 py-2 border border-orange-200 text-3xl text-orange-300 rounded-full font-bold transition duration-300 hover:text-white'
            style={{
              background: 'linear-gradient(45deg, #FF5733, #0047FF)',
              // background: 'linear-gradient(45deg, #FFD700, #FF6347)',
              // background: 'linear-gradient(45deg, #39FF14, #006BFF)',
            }}
          >
            Get Started
          </Link>
        </div>
        {/* <div className='mt-10'>
          <img
            src='path/to/your/image.jpg'
            alt='An illustrative image showcasing the product'
            className='rounded-lg shadow-lg'
          />
        </div> */}
      </div>
    </div>
  );
}
