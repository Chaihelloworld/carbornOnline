import Banner from '../components/login';
import Navbar from '../components/NavbarMain';

import ActionBottom from '../components/actionBottom';

import React, { useState, useEffect } from 'react';


export default function Home() {
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
            {/* <div > */}
            <Banner />
            {/* </div> */}

            {/* <ActionBottom /> */}
        </>
    );
}
