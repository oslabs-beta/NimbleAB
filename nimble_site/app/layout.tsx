import './globals.css';
import Head from 'next/head';
import Script from 'next/script';
export const metadata = {
  title: 'Nimble Labs',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <Script src='https://www.googletagmanager.com/gtag/js?id=G-H1YQ0HZ8B6'>
        {' '}
      </Script>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-H1YQ0HZ8B6');
            `,
          }}
        />
      </Head>

      <body>
        <main className='min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-800 flex flex-col items-center'>
          {/* bg-gradient-to-br from-black via-blue-900 to-cyan-500 */}
          {/* bg-gradient-to-br from-black via-indigo-900 to-blue-900 */}
          {/* bg-gradient-to-br from-gray-800 via-red-900 to-yellow-500 */}
          {/* bg-gradient-to-br from-navy-900 via-purple-900 to-blue-900 */}
          {/* bg-gradient-to-br from-gray-900 via-cyan-700 to-orange-500 */}
          {/* bg-gradient-to-br from-black via-gray-800 to-gold-500 */}
          {/* bg-gradient-to-br from-gray-900 via-gray-800 to-blue-800 */}
          {children}
        </main>
      </body>
    </html>
  );
}
