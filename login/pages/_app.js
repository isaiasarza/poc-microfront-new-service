import "../styles/globals.css";



// const Nav = lazy(() => import('home/nav') ,{suspense:true});

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* <Suspense fallback={'loading'}>
      <Nav />
      </Suspense> */}
      <Component {...pageProps} />
     
    </>
  );
}

// MyApp.getInitialProps = async ctx => {
//   const appProps = await App.getInitialProps(ctx);
//   return appProps;
// };
export default MyApp;
