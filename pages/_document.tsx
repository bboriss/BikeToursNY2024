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
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap"
            rel="stylesheet"
          />
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
