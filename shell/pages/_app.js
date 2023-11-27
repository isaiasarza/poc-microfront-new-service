import App from "next/app";

import useLoginStore from "login/loginStore";
import { useEffect, useState } from "react";
import "../styles/globals.css";
import Nav from "@/components/nav";
import { useRouter } from "next/navigation";

function MyApp({ Component, pageProps }) {
 const router = useRouter()
 const [loggedIn, setLoggedIn] = useState();
  const initializeStore = () => {
    const unsub = useLoginStore.subscribe((state) => {
      const { currentUser } = state;
      const _loggedIn = (!!currentUser?.email);
      console.log("🚀 ~ file: _app.js:16 ~ unsub ~ _loggedIn:", _loggedIn);
      setLoggedIn(_loggedIn);
    });
  };

  useEffect(() => {
   initializeStore();
  }, [loggedIn]);

  return (
    <>
      <Nav isLoggedIn={loggedIn} />
      <Component {...pageProps} />
    </>
  );
}

MyApp.getInitialProps = async (ctx) => {
  const appProps = await App.getInitialProps(ctx);
  return appProps;
};
export default MyApp;
