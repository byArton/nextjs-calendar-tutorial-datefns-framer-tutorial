import { M_PLUS_Rounded_1c } from 'next/font/google';
import './globals.css';

const mPlusRounded1c = M_PLUS_Rounded_1c({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});
// app/page.tsx など
export const metadata = {
  title:
    'Google Calendar Style App - Next.js × Tailwind × Framer Motion Tutorial by Arton',
  description:
    'Built with Next.js, Tailwind CSS, and Framer Motion. Add, edit, and delete schedules with smooth animations and local storage support. Perfect for learning modern React and UI animation. Created by Arton.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={mPlusRounded1c.className}>{children}</body>
    </html>
  );
}
