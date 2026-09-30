import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'Free Real Estate Business Growth Ebook',
  description: 'Download the ultimate growth guide for Realtors. Scale your business, build trust, and generate premium leads instantly.',
  openGraph: {
    title: 'Free Real Estate Business Growth Ebook',
    description: 'Download the ultimate growth guide for Realtors. Scale your business, build trust, and generate premium leads instantly.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Real Estate Business Growth Ebook',
    description: 'Download the ultimate growth guide for Realtors. Scale your business, build trust, and generate premium leads instantly.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
