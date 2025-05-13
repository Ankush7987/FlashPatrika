import { Html, Head, Main, NextScript } from 'next/document';
import ThemeScript from '../components/common/ThemeScript';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/images/flashpatrika-favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/images/flashpatrika-favicon.svg" />
        <ThemeScript />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}