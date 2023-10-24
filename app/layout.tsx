import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './Navbar';
import AuthProvider from './auth/AuthProvider';
import QueryClientProvider from './QueryClientProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Household Task Manager',
  description: 'A simple tool to manage your household chores.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider>
          <AuthProvider>
            <Navbar />
            <main className="p-4 overflow-x-hidden">
              <div className="container mx-auto">{children}</div>
            </main>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
