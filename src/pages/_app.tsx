import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Navbar from "@/components/navbar/Navbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>YEStore</title>
        <meta
          name="description"
          content="Your store for storing all the data with almost unlimited storage."
        />
        <meta
          name="keywords"
          content="YEStore, store, data, storage, unlimited"
        />
        <meta name="author" content="Krit" />

        <meta name="og:title" content="YEStore" />
        <meta
          name="og:description"
          content="Your store for storing all the data with almost unlimited storage."
        />
        <meta name="og:type" content="website" />
        <meta name="og:url" content="https://yestore-alpha.vercel.app" />
      </Head>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}
