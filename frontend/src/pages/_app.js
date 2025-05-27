import '@/styles/global.css';
import '@/styles/style.css';
import '@/styles/bootstrap.css';

import React from 'react';
import Head from 'next/head';


function App({ Component, pageProps }) {


  return (
    <React.Fragment>
      <Head>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Component {...pageProps} />

    </React.Fragment>
  );
}

export default App;
