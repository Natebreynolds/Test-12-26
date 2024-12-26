import './globals.css';
import { Metadata } from 'next';
import { ThemeProvider } from "@/components/theme-provider";
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageBackground from '@/components/shared/PageBackground';
import { DynamicChatWidget } from '@/lib/optimizations/dynamic-imports';

export const metadata: Metadata = {
  title: 'Breakthrough Coaching AI',
  description: 'AI-powered sales coaching and strategy',
  metadataBase: new URL('https://breakthroughcoaching-ai.com'),
  openGraph: {
    title: 'Breakthrough Coaching AI',
    description: 'AI-powered sales coaching and strategy',
    type: 'website',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <PageBackground />
          <div className="relative z-10">
            <Navigation />
            {children}
            <Footer />
          </div>
          <DynamicChatWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}