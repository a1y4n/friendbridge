import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FriendBridge - Connect with International Students',
  description: 'A safe, meaningful platform for international students to build real friendships based on culture, language, and shared experiences.',
  keywords: 'international students, friendship, community, Ohio State, OSU, cultural exchange',
  authors: [{ name: 'FriendBridge Team' }],
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#0A2540',
                color: '#fff',
              },
              success: {
                style: {
                  background: '#00CFC1',
                  color: '#fff',
                },
              },
              error: {
                style: {
                  background: '#ef4444',
                  color: '#fff',
                },
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}
