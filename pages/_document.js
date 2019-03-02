import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

class CustomDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));
    const styleTags = sheet.getStyleElement();

    return { ...page, styleTags };
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <meta charset="UTF-8" />
          <meta name="description" content="Online Store" />
          <meta name="keywords" content="Next, GraphQL, Apollo, Prisma, MongoDB, Online Store" />
          <meta name="author" content="Grauero" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default CustomDocument;
