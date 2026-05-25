import type {Metadata} from 'next';
import { Cinzel, Plus_Jakarta_Sans, Share_Tech_Mono } from 'next/font/google';
import './globals.css'; // Global styles

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-title',
  weight: ['400', '600', '700', '900'],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const shareTechMono = Share_Tech_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: '400',
});

export const metadata: Metadata = {
  title: 'SHERLOCK — Elite Behavioral Intelligence Analyst',
  description: 'Observe First. Conclude Second. Read posture, expressions, attire, and environmental markers to synthesize high-stakes sales and negotiation dossiers.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${cinzel.variable} ${plusJakartaSans.variable} ${shareTechMono.variable}`}>
      <body suppressHydrationWarning className="bg-[#080c14] text-[#f1f5f9] min-h-screen font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
