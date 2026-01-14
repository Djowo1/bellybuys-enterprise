// src/app/layout.js
import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import ThemeProvider from '@/components/UI/ThemeProvider';
import PageTransition from '@/components/Layout/PageTransition';
import { BUSINESS_INFO } from '@/utils/constants';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata = {
  metadataBase: new URL('https://bellybuys.com'),
  title: {
    default: `${BUSINESS_INFO.name} | ${BUSINESS_INFO.tagline}`,
    template: `%s | ${BUSINESS_INFO.name}`
  },
  description: BUSINESS_INFO.description,
  keywords: [
    'catering services Nigeria',
    'Ile-Ife catering',
    'weekend meals',
    'private chef',
    'food delivery Osun',
    'event catering',
    'BellyBuys',
    'Nigerian food',
    'logistics services',
    'cooking utensils rental'
  ],
  authors: [{ name: BUSINESS_INFO.name }],
  creator: BUSINESS_INFO.name,
  publisher: BUSINESS_INFO.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: 'https://bellybuys.com',
    siteName: BUSINESS_INFO.name,
    title: BUSINESS_INFO.name,
    description: BUSINESS_INFO.description,
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: BUSINESS_INFO.name
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: BUSINESS_INFO.name,
    description: BUSINESS_INFO.description,
    images: ['/images/twitter-image.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code'
  }
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: BUSINESS_INFO.name,
    image: 'https://bellybuys.com/images/logo-3.png',
    '@id': 'https://bellybuys.com',
    url: 'https://bellybuys.com',
    telephone: BUSINESS_INFO.phone,
    priceRange: '₦₦',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Aji Bamidili',
      addressLocality: BUSINESS_INFO.location.city,
      addressRegion: BUSINESS_INFO.location.state,
      addressCountry: BUSINESS_INFO.location.country
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 7.4905,
      longitude: 4.5521
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Friday', 'Saturday', 'Sunday'],
        opens: '08:00',
        closes: '20:00'
      }
    ],
    servesCuisine: ['Nigerian', 'African', 'International'],
    menu: 'https://bellybuys.com/menu',
    acceptsReservations: 'True',
    sameAs: [
      `https://instagram.com/${BUSINESS_INFO.instagram.replace('@', '')}`,
      `https://wa.me/${BUSINESS_INFO.whatsapp.replace('+', '')}`
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/logo-3.png" sizes="any" />
        <link rel="apple-touch-icon" href="/images/logo-3.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#008751" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <Navbar />
          <main>
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}