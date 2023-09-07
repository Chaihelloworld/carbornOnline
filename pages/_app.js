import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CookiesProvider } from 'react-cookie';
// import '../styles/customTheme.scss'
import Head from 'next/head';
import React, { useState, useEffect } from 'react';


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
            {/* <Helmet>
                          <link rel="shortcut icon" href="/favicon.png" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
                    
                />
            
                <title>ZERO CARBON</title>
                
            </Helmet> */}
            <Head>
                <link rel="shortcut icon" href="/favicon.jpg" />
                <title>
                    Zero Carbon การท่องเที่ยวคาร์บอนสุทธิเป็นศูนย์ กลุ่มอุทยานแห่งชาติสีเขียว
                </title>
                <meta
                    name="description"
                    content=" Zero Carbon การท่องเที่ยวคาร์บอนสุทธิเป็นศูนย์ กลุ่มอุทยานแห่งชาติสีเขียว สนับสนุนโดย วช. / มพ.."
                />
                <meta name="keywords" content="zero carbon,zero carbon,zero-carbon" />
                <meta
                    name="apple-mobile-web-app-title"
                    content="Zero Carbon การท่องเที่ยวคาร์บอนสุทธิเป็นศูนย์ กลุ่มอุทยานแห่งชาติสีเขียว"
                />
                <meta name="format-detection" content="telephone=no"></meta>
                <link rel="canonical" href="https://www.carbon-greentravel.com/" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
                />
                <meta
                    property="og:title"
                    content="Zero Carbon การท่องเที่ยวคาร์บอนสุทธิเป็นศูนย์ กลุ่มอุทยานแห่งชาติสีเขียว"
                />
                <meta
                    property="og:description"
                    content="Zero Carbon การท่องเที่ยวคาร์บอนสุทธิเป็นศูนย์ กลุ่มอุทยานแห่งชาติสีเขียว สนับสนุนโดย วช. / มพ.."
                />
                <meta property="og:locale" content="th" />
                <meta
                    property="og:site_name"
                    content="Zero Carbon การท่องเที่ยวคาร์บอนสุทธิเป็นศูนย์ กลุ่มอุทยานแห่งชาติสีเขียว"
                />
                <meta property="og:url" content="https://carbon-greentravel.com/" />
                <meta property="og:image:width" content="200" />
                <meta property="og:image:height" content="200" />
                <meta property="og:type" content="website" />
                <meta
                    name="google-site-verification"
                    content="zEi3g-ybmw1t0gkY75VHpL8RKMVfuNLFQEfk33AY500"
                />
                <meta name="twitter:site" content="@twitter" />
                <meta name="twitter:card" content="summary" />
                <meta
                    name="twitter:title"
                    content="Zero Carbon การท่องเที่ยวคาร์บอนสุทธิเป็นศูนย์ กลุ่มอุทยานแห่งชาติสีเขียว"
                />
                <meta
                    name="twitter:description"
                    content="Zero Carbon การท่องเที่ยวคาร์บอนสุทธิเป็นศูนย์ กลุ่มอุทยานแห่งชาติสีเขียว สนับสนุนโดย วช. / มพ.."
                />
                <link href="https://fonts.googleapis.com/css?family=Kanit" rel="stylesheet" />
            </Head>
            <CookiesProvider>
                <Component {...pageProps} />
            </CookiesProvider>
        </>
    );
}

export default MyApp;
