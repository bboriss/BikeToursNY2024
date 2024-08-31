import Document, { Html, Head, Main, NextScript } from 'next/document';
import type { DocumentProps } from 'next/document';

type Props = DocumentProps & {
};

class MyDocument extends Document<Props> {
  render() {
   
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
           <link rel="icon" href="/assets/iconbike.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
