import { Metadata } from 'next';
import localFont from 'next/font/local';
import * as React from 'react';

import '@/styles/globals.css';

import { siteConfig } from '@/constant/config';
import { useWindowSize } from 'react-use';
import ClientLayout from '@/components/client-layout';

//👇 Configure our local font object
const sukhumvitFont = localFont({
  src: [
    {
      path: '../fonts/SukhumvitSet-Bold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../fonts/SukhumvitSet-SemiBold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/SukhumvitSet-Medium.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../fonts/SukhumvitSet-Text.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/SukhumvitSet-Thin.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/SukhumvitSet-Light.ttf',
      weight: '300',
      style: 'normal',
    },
  ],
  variable: '--font-sukhumvit',
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  robots: { index: true, follow: true },
  // !STARTERCONF this is the default favicon, you can generate your own from https://realfavicongenerator.net/
  // ! copy to /favicon folder
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon-16x16.png',
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: `/favicon/site.webmanifest`,
  openGraph: {
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    images: [`${siteConfig.url}/images/og.jpg`],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}/images/og.jpg`],
    // creator: '@th_clarence',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='th'
      className={`${sukhumvitFont.variable} font-sukhumvit font-bold`}
    >
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
