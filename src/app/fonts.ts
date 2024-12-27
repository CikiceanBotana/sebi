import { Variable } from 'lucide-react';
import { Montserrat, Lacquer, Oswald, Eater } from 'next/font/google';
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

export const oswald = Oswald({
  subsets: ['latin'], 
  weight: ['400', '700'], 
  display: 'swap',
  variable: '--font-oswald',
});

export const eater = Eater({
  subsets: ['latin'], 
  weight: ['400'], 
  display: 'swap',
  variable: '--font-eater',
});