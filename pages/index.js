import Banner from '../components/headerBanner';
import Navbar from '../components/NavbarMain';

import ActionBottom from '../components/actionBottom';

import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';


export default function Home() {
    const [cookie, setCookie, removeCookie] = useCookies(['newufa_phone']);
    const [cookieToken, setCookieToken, removeCookiesToken] = useCookies(['newufa_api_token']);
    const [cookiePass, setCookiePass, removeCookiesPass] = useCookies(['newufa_password']);
    const instance = axios.create({
        baseURL: 'https://api.ufa-365.com',
        headers: { Authorization: `Bearer ${cookieToken.newufa_api_token}` }
    });


    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);
    if (!hasMounted) {
        return null;
    }
    return (
        <>

            <Navbar />
            <Banner />
  
            <ActionBottom />
        </>
    );
}
