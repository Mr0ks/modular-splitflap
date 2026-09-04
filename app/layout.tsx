import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Modular Splitflap — Build Two Character Modules',
  description: 'A researched, no-solder build guide for an open-source modular split-flap display.',
  openGraph: {
    title: 'Modular Splitflap',
    description: 'Build two. Prove the bus. A no-solder open-hardware roadmap.',
    images: ['https://modular-splitflap.olegmalyshev.chatgpt.site/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Modular Splitflap',
    description: 'Build two. Prove the bus. A no-solder open-hardware roadmap.',
    images: ['https://modular-splitflap.olegmalyshev.chatgpt.site/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
