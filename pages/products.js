import Banner from '../components/headerBanner';
import Navbar from '../components/NavbarContent';
import { Container, Row, Col, Button, Card, Form, Pagination, InputGroup } from 'react-bootstrap';

import ActionBottom from '../components/actionBottom';
import Footer from '../components/footer';

import React, { useState, useEffect } from 'react';
import styles from '../styles/headerBanner.module.scss';
import STORE from '../libs/store.image';
import Image from 'next/image';

import { useRouter } from 'next/router';

export default function Home() {
    const router = useRouter();

    const [hasMounted, setHasMounted] = useState(false);
    const Enumclass = () => {
        if (!JSON.parse(localStorage.getItem('json'))) {
            return JSON.parse(localStorage.getItem('json')) ? num : 0;

            return;
        }
        console.log(
            'length ->',
            JSON.parse(localStorage.getItem('json'))
                ? JSON.parse(localStorage.getItem('json')).length
                : 0
        );
        let d = JSON.parse(localStorage.getItem('json'));
        let num = 0;
        for (let index = 0; index < d.length; index++) {
            const element = d[index];
            num = num + d[index].quantity;
            console.log('-----------', element, num);
        }
        console.log('-----------', num);

        return JSON.parse(localStorage.getItem('json')) ? num : 0;
    };
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
            {/* <Footer /> */}
            {/* <div
                            className={styles.btncart_content}
                        >
                            <Button
                                className={styles.btncart}
                                onClick={()=> router.push('/calculateCO2')}
                            >
                                <div
                                    style={{
                                        height: '25px',
                                        width: '25px',
                                        backgroundColor: 'red',
                                        borderRadius: '50%',
                                        position: 'absolute',
                                        display: 'inline-block',
                                        transform: 'translate(50px, 40px)',
                                        zIndex: 999
                                    }}>
                                        {Enumclass()}
                                    
                                </div>
                                <Image
                                    // src={STORE.cart}
                                    src={STORE.IconCal}
                                    alt="cart"
                                    width={70}
                                    height={70}
                                />
                            </Button>
                        </div> */}
            <ActionBottom />
        </>
    );
}
