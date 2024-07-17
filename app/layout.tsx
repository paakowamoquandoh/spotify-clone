import Sidebar from '@/components/Sidebar'
import './globals.css'
import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import SupabaseProvider from '@/providers/SupabaseProvider';
import UserProvider from '@/providers/userProvider';
import ModalProvider from '@/providers/modalProvider';
import ToasterProvider from '@/providers/ToasterProvider';
import getSongsByUserId from '@/actions/getSongsByUserId';
import Player from '@/components/Player';

const font = Figtree({ weight: '400', subsets: ['latin'] });


export const metadata: Metadata = {
  title: 'Web Music Player',
  description: 'Music playlist saver built with Next.js',
}

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const userSongs = await getSongsByUserId();
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider/>
            <Sidebar songs={userSongs}>
             {children}
            </Sidebar>
            <Player />
          </UserProvider>        
        </SupabaseProvider>
      </body>
    </html>
  )
}
