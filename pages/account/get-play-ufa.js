import Banner from '../../components/headerBanner';
import Feature from '../../components/feature';
import Navbar from '../../components/NavbarMain';
import Blog from '../../components/blog';
import Footer from '../../components/footer';
import Contact from '../../components/contactLine';
import ActionBottom from '../../components/actionBottom';
import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { useRouter } from 'next/router';
const UfaID = (props) => {
    const [cookie, setCookie, removeCookie] = useCookies(['newufa_phone'], ['newufa_status']);
    const [cookiePass, setCookiePass, removeCookiesPass] = useCookies(['newufa_password']);
    const [cookieToken, setCookieToken, removeCookiesToken] = useCookies(['newufa_api_token']);
    const [hasMounted, setHasMounted] = useState(false);
    const instance = axios.create({
        baseURL: 'https://api.ufa-365.com',
        headers: { Authorization: `Bearer ${cookieToken.newufa_api_token}` }
    });
    const router = useRouter();
    const clickState = () => {
        if (cookieToken.newufa_api_token) {
            instance
                .get('/client/user/ufa/login')
                .then((response) => {
                    // console.log(response);
                    router.push(response.data.data.game_url);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };
    const check_maintanence = () => {
        axios
            .get('https://api.ufa-365.com/client/check_maintenance')
            .then((response) => {
                if (response.data.data.is_maintenance === true) {
                    removeCookie('newufa_phone');
                    removeCookie('newufa_status');
                    removeCookiesPass('newufa_password');
                    removeCookiesToken('newufa_api_token');
                    removeCookieDataUser('balance_user');
                    removeCookieDataUser('check_rank');
                    removeCookieDataUser('user_id');
                    removeCookieDataUser('min_deposit');
                    removeCookieDataUser('min_withdraw');
                    removeCookieDataUser('limit_bet');
                    removeCookieDataUser('ufa_username');
                    removeCookieDataUser('ufa_password');
                    removeCookieDataUser('acc_holdername');
                    removeCookieDataUser('acc_numberbank');
                    removeCookieDataUser('acc_namebank');
                    removeCookieDataUser('acc_imgbank');
                    removeCookieDataUser('acc_imgbankcode');
                    removeCookieDataUser('acc_nameuser');
                    removeCookieDataUser('pattern_bank');
                    localStorage.clear();
                    router.push('/maintenance');
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        check_maintanence();
        clickState();
        setHasMounted(true);
    }, []);
    if (!hasMounted) {
        return null;
    }
    return <></>;
};
export default UfaID;
