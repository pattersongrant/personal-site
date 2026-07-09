import './global.css'
import type { Metadata } from 'next'
// Removed Geist font imports after upgrading Next/React
import { Navbar } from './components/nav'
import Footer from './components/footer'
import { baseUrl } from './sitemap'

export const metadata: Metadata = {

  metadataBase: new URL(baseUrl),
  title: {
    default: 'Grant Patterson',
    template: '%s | Grant Patterson',
  },
  description: 'This is my portfolio.',
  openGraph: {
    title: 'My Portfolio',
    description: 'This is my portfolio.',
    url: baseUrl,
    siteName: 'My Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico', // This line references the favicon file
  },
}

const cx = (...classes) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cx('text-black bg-white dark:text-white dark:bg-black')}
    >
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body className="antialiased max-w-xl mx-auto px-5 sm:px-8 mt-6 sm:mt-8">
        <main className="flex-auto min-w-0 mt-4 sm:mt-6 flex flex-col">
          <Navbar />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  )
}
