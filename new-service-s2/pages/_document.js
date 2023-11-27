import { FlushedChunks } from "@module-federation/nextjs-mf/utils";
import { NextUIProvider } from "@nextui-org/react";
import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name="robots" content="noindex" />
          <FlushedChunks chunks={this.props.chunks} />
        </Head>

        <NextUIProvider>
          <body className="bg-background-grey">
            <Main />
            <NextScript />
          </body>
        </NextUIProvider>
      </Html>
    );
  }
}

export default MyDocument;
