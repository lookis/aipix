import { Provider } from '@/components/provider';
import { Inter } from 'next/font/google';
import './global.css';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata = {
  title: {
    default: 'AI 像素岛',
    template: '%s - AI 像素岛',
  },
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
