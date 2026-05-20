import './globals.css';
import { 
  Inter, 
  Anton, 
  Bebas_Neue, 
  Space_Grotesk, 
  Syne, 
  Oswald, 
  Playfair_Display,
  Plus_Jakarta_Sans,
  DM_Sans,
  Space_Mono,
  Lexend,
  Poppins
} from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-anton',
});

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bebas-neue',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
});

const syne = Syne({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-syne',
});

const oswald = Oswald({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-oswald',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair-display',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus-jakarta-sans',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans',
});

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-mono',
});

const lexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lexend',
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata = {
  title: 'TAP2KNOW Profile Builder',
  description: 'Create and manage your NFC digital profile.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html 
      lang="id" 
      className={`${inter.variable} ${anton.variable} ${bebasNeue.variable} ${spaceGrotesk.variable} ${syne.variable} ${oswald.variable} ${playfairDisplay.variable} ${plusJakartaSans.variable} ${dmSans.variable} ${spaceMono.variable} ${lexend.variable} ${poppins.variable}`} 
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}