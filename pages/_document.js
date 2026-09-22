import { Html, Head, Main, NextScript } from 'next/document';

/**
 * Exists mainly to set lang="en" (the old site had no _document, so the
 * attribute was missing entirely) and to load fonts from Google rather than
 * the third-party stylesheet the template pointed at.
 */
const INTRO_GATE = `try{if(location.pathname==='/'&&!sessionStorage.getItem('hb-intro')&&!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('intro');sessionStorage.setItem('hb-intro','1')}}catch(e){}`;

const Document = () => (
  <Html lang="en">
    <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
      />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      {/* PNG fallbacks: Safari's tab bar and the iOS home screen do not use
          the SVG. Both are renders of favicon.svg. */}
      <link rel="icon" href="/favicon-32.png" type="image/png" sizes="32x32" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
      {/* Runs before first paint, so the intro is either there from the first
          frame or never rendered at all. Home page only, once per session,
          never under reduced motion. sessionStorage can throw in private
          modes, hence the try. */}
      <script
         
        dangerouslySetInnerHTML={{ __html: INTRO_GATE }}
      />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
