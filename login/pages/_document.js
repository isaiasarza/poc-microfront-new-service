import Document, { Html, Head, Main, NextScript } from "next/document";
import React from "react";
import {
  revalidate,
  FlushedChunks,
  flushChunks,
} from "@module-federation/nextjs-mf/utils";
import { NextUIProvider } from "@nextui-org/react";
import { ToastContainer } from "react-toastify";
class MyDocument extends Document {
  // static async getInitialProps(ctx) {
  //   if(process.env.NODE_ENV === "development" && !ctx.req.url.includes("_next")) {
  //     await revalidate().then((shouldReload) =>{
  //       if (shouldReload) {
  //         ctx.res.writeHead(302, { Location: ctx.req.url });
  //         ctx.res.end();
  //       }
  //     });
  //   } else {
  //     ctx?.res?.on("finish", () => {
  //       revalidate()
  //     });
  //   }
  //   const initialProps = await Document.getInitialProps(ctx);
  //   const chunks = await flushChunks()

  //   return {
  //     ...initialProps,
  //     chunks
  //   };

  // }

  render() {
    return (
      <Html>
        <Head>
          <meta name="robots" content="noindex" />
          <FlushedChunks chunks={this.props.chunks} />
        </Head>
        <NextUIProvider>
          <ToastContainer>
            <body className="bg-background-grey">
              <Main />

              <NextScript />
            </body>
          </ToastContainer>
        </NextUIProvider>
      </Html>
    );
  }
}

export default MyDocument;
