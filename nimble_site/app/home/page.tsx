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
<div>
    <div className="py-8 columns-1 flex flex-col justify-start">
    <h2 className ="text-3xl">Welcome to NimbleLabs</h2>
    <TestButton></TestButton>
    <SplashButton></SplashButton>

<h1>test</h1>
      <div id = "teamPics" className="flex flex-row">
        <img className = "w-32 sm:w-48 md:w-64 flex flex-row justify-start" src = "https://ca.slack-edge.com/T0589LN69MY-U058X16QFC6-b125805b1c7c-512"></img>
        <div className="shadown-bird et-in-viewport-check et-in-viewport-pulse_special" et-anim="pulse_special" et-anim-duration="3500" et-anim-delay="0" et-anim-easing="ease">
          <img  className = "w-32 sm:w-48 md:w-64 flex flex-row justify-start" src = "https://www.enginethemes.com/wp-content/themes/et_home_new/img/bird-code-min.png">
          </img> </div>
        <img className = "w-32 sm:w-48 md:w-64 flex flex-row justify-start" src = "https://ca.slack-edge.com/T0589LN69MY-U05CZ0GKPBM-0b90155a6dba-512"></img>
      </div>
    </div>
    </div>
  );
}
