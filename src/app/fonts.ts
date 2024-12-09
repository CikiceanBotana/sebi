import { Montserrat, Lacquer } from 'next/font/google';
import localFont from 'next/font/local';

export const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

export const lacquer = Lacquer({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lacquer',
});

export const facultyGlyphic = localFont({
  src: '../fonts/FacultyGlyphic.ttf',  // Using relative path from your fonts file location
  variable: '--font-faculty',
  display: 'swap',
});