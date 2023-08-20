import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CookiesProvider } from 'react-cookie';
// import '../styles/customTheme.scss'
import Head from 'next/head';
import React, { useState, useEffect } from 'react';

import { useCookies } from 'react-cookie';
import { Helmet } from 'react-helmet';
import APIBET from '../service/apis/bet.service';
import APIAFF from '../service/apis/aff.service';
import APIRANK from '../service/apis/rank.service';
import { useRouter } from 'next/router';

// const liffId = "1660668919-oYOVVVKg"

function MyApp({ Component, pageProps }) {
    // useEffect(async () => {
    //     const liff = (await import('@line/liff')).default
    //     try {
    //       await liff.init({ liffId });
    //     } catch (error) {
    //       console.error('liff init error', error.message)
    //     }
    //     if (!liff.isLoggedIn()) {
    //       liff.login();
    //     }
    //   })
    return (
        <>
            <Helmet>
                {/* <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"></meta> */}
                          <link rel="shortcut icon" href="/favicon.png" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
                    
                />
            
                <title>ZERO CARBON</title>
            </Helmet>
            <CookiesProvider>
                <Component {...pageProps} />
            </CookiesProvider>

        </>
    );
}

export default MyApp;
