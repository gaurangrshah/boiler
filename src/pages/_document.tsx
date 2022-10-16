import { ColorModeScript } from '@chakra-ui/react';
import { config } from 'chakra.ui';
import Document, { Head, Html, Main, NextScript } from 'next/document';
class Doc extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <ColorModeScript initialColorMode={config?.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Doc;
