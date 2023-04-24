import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session1, ...pageProps1 },
}: AppProps) {
  return (
    <SessionProvider session={session1}>
      <Component {...pageProps1} />
    </SessionProvider>
  );
}
