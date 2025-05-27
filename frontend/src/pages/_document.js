// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Your custom head tags (fonts, meta, styles, etc) */}
        </Head>
        <body>
          <Main />         {/* The main app content */}
          <NextScript />   {/* Next.js scripts */}
        </body>
      </Html>
    );
  }
}

export default MyDocument;
