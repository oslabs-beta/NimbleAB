import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';
import LogoutButton from '../components/LogoutButton';
import { notFound, redirect } from 'next/navigation';
export const dynamic = 'force-dynamic';
import logo from './images/nimbleAB.png';
import Image from 'next/image';

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) redirect('/home');

  return (
    <div className='w-full flex flex-col items-center'>
      <nav className='w-full flex justify-between items-center p-3 fixed top-0 z-50 bg-opacity-90 backdrop-blur-md'>
        <Image
          className='pl-5 animate-slideDownFade'
          src={logo}
          alt='NimbleAB Logo'
          width={350}
          height={350}
        />
        <div className='flex flex-col items-start'>
          {/* <h1 className='text-4xl font-extrabold text-white mb-1 tracking-tighter transform translate-y-[-0.125em] mt-1 pl-5 animate-slideDownFade'>
            NimbleAB
          </h1> */}
        </div>
        <div className='flex items-center space-x-6'>
          <Link
            href='/discover'
            className='text-lg text-white hover:underline hover:text-orange-300 transition-transform duration-300 transform hover:scale-105'
          >
            Discover Features
          </Link>
          <Link
            href='/download'
            className='text-lg text-white hover:underline hover:text-orange-300 transition-transform duration-300 transform hover:scale-105'
          >
            Download Files
          </Link>
          {/* <Link
            href='/team'
            className='text-lg text-white hover:underline pr-6 hover:text-orange-300 transition-transform duration-300 transform hover:scale-105'
          >
            Learn More About the Team
          </Link> */}
          {/* <Link
        href='/login'
        className='text-lg ttext-white font-semibold hover:text-cyan-300 transition duration-300'
      >
        Login
      </Link> */}
        </div>
      </nav>

      <div className='min-h-screen flex flex-col items-center justify-center pt-16'>
        {' '}
        {/* Added padding-top to prevent content overlap */}
        {/* <div className='bg-white bg-opacity-60 rounded-lg p-20 shadow-lg text-center max-w-4xl'> */}
        <div className='text-center max-w-4xl animate-fadeIn'>
          <h2
            className='text-4xl font-bold mb-10'
            style={{
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
        </div>
        <Link
          href='/login'
          className='px-6 py-2 border border-orange-200 text-3xl text-white-300 rounded-full font-bold transition duration-300 hover:text-green-200 hover:scale-105 animate-pulse'
          style={{
            background: 'linear-gradient(45deg, #FF5733, #0047FF)',
          }}
        >
          Get Started
        </Link>
      </div>
      <div className='flex flex-col items-center mt-1 pb-10'>
        <h2 className='text-2xl text-white mb-6'>
          Meet the Team
        </h2>
        <div id='teamPics' className='flex flex-row space-x-4 justify-center'>
          {[
            {
              src: 'https://ca.slack-edge.com/T0589LN69MY-U058X16QFC6-b125805b1c7c-512',
              alt: 'AndreW Kraus',
              name: 'Andrew Kraus',
              github: 'https://github.com/ajkraus04',
              linkedin: 'https://www.linkedin.com/in/andrewjkraus/',
            },
            {
              src: 'https://ca.slack-edge.com/T0589LN69MY-U05EDUWEBG9-9322adc41a3e-192',
              alt: 'James Boswell',
              name: 'James Boswell',
              github: 'https://github.com/jamesboswell1994',
              linkedin: 'https://www.linkedin.com/in/james-boswell-67867466/',
            },
            {
              src: 'https://ca.slack-edge.com/T0589LN69MY-U05CZ0GKPBM-0b90155a6dba-512',
              alt: 'Zhenwei Liu',
              name: 'Zhenwei Liu',
              github: 'https://github.com/lzwaaron',
              linkedin: 'https://www.linkedin.com/in/zhenwei--liu/',
            },
          ].map((member, index) => (
            <div
              key={index}
              className='flex flex-col items-center space-y-2 w-24 sm:w-36 md:w-48'
            >
              <img
                className='rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105'
                src={member.src}
                alt={member.alt}
                style={{ width: '70%', height: 'auto' }}
              />
              <div className='text-white text-center'>
                <h3 className='font-bold'>{member.name}</h3>
                <div className='flex space-x-2 justify-center'>
                  <a
                    href={member.github}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <img
                      className='w-6 h-6 transition-transform duration-300 transform hover:scale-110'
                      src='https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
                      alt='GitHub Logo'
                    />
                  </a>
                  <a
                    href={member.linkedin}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <img
                      className='w-6 h-6 transition-transform duration-300 transform hover:scale-110'
                      src='https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Bug.svg.original.svg'
                      alt='LinkedIn Logo'
                    />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
