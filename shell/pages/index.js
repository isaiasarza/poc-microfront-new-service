import React, { Fragment, Suspense, lazy, useEffect } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { NextUIProvider } from "@nextui-org/react";
import useLoginStore from "login/loginStore";
import { useRouter } from "next/router";
import globalStore from "@/store/store";

typeof window !== "undefined" && console.log(window.checkout);

const Index = () => {
  const router = useRouter();
  const currentUser = useLoginStore((state) => state.currentUser);

  const initializeStore = (currentUser) => {
    resolve(currentUser);

    globalStore.subscribe((state) => {
      const { newServiceState } = state;
      console.log(
        "🚀 ~ file: index.js:27 ~ globalStore.subscribe ~ newServiceState:",
        newServiceState
      );

      if (!newServiceState) return;

      router.push(`/${newServiceState.nextStep}`);
    });
  };

  const resolve = (currentUser) => {
    if (!currentUser) router.push("/login", { scroll: false });
    else router.push("/home", { scroll: false });
  };

  useEffect(() => {
    initializeStore(currentUser);
  });

  return (
    <NextUIProvider>
      <div>
        <Head>
          <title>Shell</title>
          <link rel="icon" href="/nextjs-ssr/home/public/favicon.ico" />
        </Head>

        <style jsx>{`
          .hero {
            width: 100%;
            color: #333;
          }

          .title {
            margin: 0;
            width: 100%;
            padding-top: 80px;
            line-height: 1.15;
            font-size: 48px;
          }

          .title,
          .description {
            text-align: center;
          }

          .row {
            max-width: 880px;
            margin: 80px auto 40px;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
          }

          .card {
            padding: 18px 18px 24px;
            width: 220px;
            text-align: left;
            text-decoration: none;
            color: #434343;
            border: 1px solid #9b9b9b;
          }

          .card:hover {
            border-color: #067df7;
          }

          .card h3 {
            margin: 0;
            color: #067df7;
            font-size: 18px;
          }

          .card p {
            margin: 0;
            padding: 12px 0 0;
            font-size: 13px;
            color: #333;
          }
        `}</style>
      </div>
    </NextUIProvider>
  );
};
//
// Home.getInitialProps = async ctx => {
//   return {};
// };

export default Index;
