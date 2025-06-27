import { M_PLUS_Rounded_1c } from 'next/font/google';
import './globals.css';

const mPlusRounded1c = M_PLUS_Rounded_1c({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

export const metadata = {
  title: 'My Calendar',
  description: 'Next.js calendar SaaS',
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
