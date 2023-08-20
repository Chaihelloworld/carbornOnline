import Banner from '../components/storeForm';
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
            <Banner />

            {/* <ActionBottom /> */}
        </>
    );
}
