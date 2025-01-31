import { Fragment } from 'react';

import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps
} from 'next/document';
import { CssBaseline } from '@geist-ui/core';

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    const styles = CssBaseline.flush();

    let components = {
      ...initialProps,
      styles: [
        <Fragment key="1">
          {initialProps.styles}
          {styles}
        </Fragment>
      ]
    };

    return components;
  }

  render() {
    return (
      <Html>
        <Head />
        <link
          rel="preconnect"
          href="https://cdn.jsdelivr.net"
          crossOrigin="true"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/boxicons@2.1.4/css/boxicons.min.css"
        />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
