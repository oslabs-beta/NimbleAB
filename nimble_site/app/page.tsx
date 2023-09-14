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
      <nav className='w-full flex justify-between items-center p-3 fixed top-0 z-50 bg-opacity-90 backdrop-blur-sm'>
        {/* logo */}
        <Image
          className='pl-5 animate-slideDownFade'
          src={logo}
          alt='NimbleAB Logo'
          width={350}
          height={350}
        />
        <div className='flex items-center space-x-6'>
          {/* github link for NimbleAB app */}
          <a
            href='https://github.com/oslabs-beta/NimbleABApp'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              className='w-6 h-6 transition-transform duration-300 transform hover:scale-110'
              src='https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
              alt='Product GitHub Logo'
            />
          </a>
          {/* how to use link */}
          <a
            className='text-[1.25rem] text-gray-300 hover:underline hover:text-orange-300 transition-transform duration-300 transform hover:scale-105'
            href='https://github.com/oslabs-beta/NimbleABApp/blob/main/README.md'
            target='_blank'
            rel='noopener noreferrer'
          >
            How to Use
          </a>

          {/* download windows app link */}
          <Link
            href='https://nimbleab-production-build.s3.us-east-2.amazonaws.com/NimbleAB+Setup+1.0.0.exe'
            className='text-[1.25rem] text-gray-300 hover:underline hover:text-orange-300 transition-transform duration-300 transform hover:scale-105'
          >
            Download Windows App
          </Link>
          {/* download mac app link */}
          <Link
            href='https://nimbleab-production-build.s3.us-east-2.amazonaws.com/NimbleAB-1.0.0-mac.zip'
            className='text-[1.25rem] text-gray-300 hover:underline hover:text-orange-300 transition-transform duration-300 transform hover:scale-105 pr-5'
          >
            Download Mac App
          </Link>
        </div>
      </nav>

      <div className='min-h-screen flex flex-col items-center justify-center pt-16'>
        {' '}
        {/* Added padding-top to prevent content overlap */}
        {/* <div className='bg-white bg-opacity-60 rounded-lg p-20 shadow-lg text-center max-w-[50vw]'> */}
        <div className='text-center max-w-[100vh] animate-fadeIn mt-20'>
          <h2
            className='text-[3rem] font-bold mb-10'
            style={{
              background: 'linear-gradient(45deg, #FFD700, #FF6347)',
              // background: 'linear-gradient(225deg, #FFFBF0, #FFE4E1)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Taking A/B Testing to the Next Level
          </h2>
        </div>
        {/* <!-- Adding product features list with visuals --> */}
        {/* <div className='mt-10 text-white mtext-[1.875rem] text-[1.25rem] bg-gray-900 p-6 rounded-lg shadow-lg'> */}
        <div className='mt-1 mb-10 text-white max-w-[75%] min-w-[40%] text-[1.25rem] p-6 rounded-lg grid grid-cols-1 md:grid-cols-3 gap-10'>
          <ul className='list-none'>
            <li className='flex  items-start p-4 bg-gray-800 bg-opacity-60 backdrop-blur-md rounded-lg hover:bg-gray-700 transition-all duration-200 h-full'>
              <div className='text-center'>
                <p className='fas fa-rocket text-[2rem] text-blue-500 takeoff-animation'>
                  🚀
                </p>
                <strong className='text-[1.75rem] text-purple-300'>
                  Performance-Optimized AB Testing
                </strong>
                <p className='mt-2 text-gray-400'>
                  Leverage the power of server-side AB testing without
                  compromising on performance, thanks to our unique integration
                  with CDN edge functions that serve pre-built static variations
                  of files.
                </p>
              </div>
            </li>
          </ul>
          <ul className='list-none'>
            <li className='flex flex-col items-center p-4 bg-gray-800 bg-opacity-60 backdrop-blur-md rounded-lg hover:bg-gray-700 transition-all duration-200 h-full'>
              <div className='text-center'>
                <p className='fas fa-rocket text-[2rem] text-blue-500 bubbling-animation'>
                  🧪
                </p>
                <strong className='text-[1.75rem] text-cyan-300'>
                  Easy Experimentation with Variants
                </strong>
                <p className='mt-2 text-gray-400'>
                  Create and customize experiments for different pages
                  effortlessly. Adjust variables such as weight, and serve
                  variants randomly based on set configurations, all through a
                  user-friendly desktop app.
                </p>
              </div>
            </li>
          </ul>
          <ul className='list-none'>
            <li className='flex items-start p-4 bg-gray-800 bg-opacity-60 backdrop-blur-md rounded-lg hover:bg-gray-700 transition-all duration-200 h-full'>
              <div className='text-center'>
                <p className='fas fa-rocket text-[2rem] text-blue-500 rotate-animation'>
                  ⚙️
                </p>
                <strong className='text-[1.75rem] text-green-300'>
                  Seamless Integration with Your Project
                </strong>
                <p className='mt-2 text-gray-400'>
                  Incorporate NimbleAB into your existing project with ease by
                  installing our npm package, which facilitates the addition of
                  middleware to your current setup.
                </p>
              </div>
            </li>
          </ul>
        </div>
        <Link
          href='/login'
          className='mt-50 px-6 py-2 mt-8 border border-orange-300 text-[1.875rem] text-orange-300 rounded-full font-bold transition duration-300 hover:text-orange-400 hover:scale-105 flex justify-center border-flow-animation'
          style={{
            minWidth: '12.5rem',
            width: '26.25rem',
            background: 'linear-gradient(45deg, #FFD700, #FF6347)',
            // background: 'linear-gradient(225deg, #FFFBF0, #FFE4E1)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Demo
        </Link>
        <Link
          href='https://nimbleab-production-build.s3.us-east-2.amazonaws.com/NimbleAB+Setup+1.0.0.exe'
          // className='px-6 py-2 mt-8 border border-orange-200 text-[1.875rem] text-center text-white-300 rounded-full font-bold transition duration-300 hover:text-white hover:scale-105 flex justify-center'
          // style={{
          //   background: 'linear-gradient(45deg, #FF5733, #0047FF)',
          //   minWidth: '200px',
          //   width: '420px',
          // }}
          className='mt-20 px-6 py-2 mt-8 border border-orange-300 text-[1.875rem] text-orange-300 rounded-full font-bold transition duration-300 hover:text-orange-400 hover:scale-105 flex justify-center border-flow-animation'
          style={{
            minWidth: '12.5rem',
            width: '26.25rem',
            background: 'linear-gradient(45deg, #FFD700, #FF6347)',
            // background: 'linear-gradient(225deg, #FFFBF0, #FFE4E1)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Download Windows App
        </Link>
        <Link
          href='https://nimbleab-production-build.s3.us-east-2.amazonaws.com/NimbleAB-1.0.0-mac.zip'
          className='mt-20 px-6 py-2 mt-8 border border-orange-300 text-[1.875rem] text-orange-300 rounded-full font-bold transition duration-300 hover:text-orange-400 hover:scale-105 flex justify-center border-flow-animation'
          style={{
            minWidth: '12.5rem',
            width: '26.25rem',
            background: 'linear-gradient(45deg, #FFD700, #FF6347)',
            // background: 'linear-gradient(225deg, #FFFBF0, #FFE4E1)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Download Mac App
        </Link>
      </div>
      <div className='flex flex-col items-center mt-1 pb-10'>
        <h2 className='text-[1.75rem] text-gray-300 mb-6 mt-20 font-semibold'>
          Meet the Team
        </h2>
        <div
          id='teamPics'
          className='flex flex-row space-x-4 justify-center text-[1.25rem]'
        >
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
              <div className='text-gray-300 text-center'>
                <h3 className='font-bold'>{member.name}</h3>
                <div className='flex space-x-2 justify-center'>
                  <a
                    href={member.github}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <img
                      className='w-6 h-6 mt-2 transition-transform duration-300 transform hover:scale-110'
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
                      className='w-6 h-6 mt-2 transition-transform duration-300 transform hover:scale-110'
                      src='https://cdns.iconmonstr.com/wp-content/releases/preview/2012/240/iconmonstr-linkedin-2.png'
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
