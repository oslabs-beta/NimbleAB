'use client';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { notFound, redirect, usePathname, useRouter } from 'next/navigation';
import { cookies } from 'next/headers';
import type { Database } from '../../lib/database.types';

export function TestButton() {
  const currentPath = usePathname();

  // we are routing to the blog but when test time comes should point this to /blog, and then use the package to route
  const handleButtonClick = () => {
    if (currentPath) {
      // window.gtag('event', 'button_click', {
      //     event_category: 'engagement',
      //     event_label: 'Enter test environment'
      // })
      window.location.href = '/blog/';
    }
  };

  return (
    <button
      className='font-bold tm-5'
      onClick={handleButtonClick}
    >
      Jump into a test
    </button>
  );
}
