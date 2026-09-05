import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Elroi 1 — Approval Dashboard',
  description: 'AI-powered quote approval dashboard for B2B sustainability products',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
