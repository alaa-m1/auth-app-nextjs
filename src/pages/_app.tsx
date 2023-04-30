import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "@mui/material";
import { CustomTheme } from "../../theme/CustomTheme";

export default function App({
  Component,
  pageProps: { session1, ...pageProps1 },
}: AppProps) {
  return (
    <ThemeProvider theme={CustomTheme}>
      <SessionProvider session={session1}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Component {...pageProps1} />
      </SessionProvider>
    </ThemeProvider>
  );
}
