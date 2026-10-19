import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://temporary-urban-spaces.polenbicer.chatgpt.site'),
  title: 'Gümüşlük Field Notes — Temporary Urban Spaces',
  description: 'Gümüşlük’te terk edilmiş yapılar, gündelik karşılaşmalar ve kıyı eşiği üzerine görsel bir saha araştırması.',
  openGraph: {
    title: 'Gümüşlük Field Notes — Temporary Urban Spaces',
    description: 'Gümüşlük’te terk edilmiş yapılar, gündelik karşılaşmalar ve kıyı eşiği üzerine görsel bir saha araştırması.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Temporary Urban Spaces — The City Is Never Finished' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gümüşlük Field Notes — Temporary Urban Spaces',
    description: 'Gümüşlük’te terk edilmiş yapılar, gündelik karşılaşmalar ve kıyı eşiği üzerine görsel bir saha araştırması.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="tr"><body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body></html>;
}
