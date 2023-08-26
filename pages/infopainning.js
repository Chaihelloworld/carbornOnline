import Banner from '../components/pag'
import Navbar from '../components/NavbarMain';
import Footer from '../components/footer';

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
            {/* <Navbar /> */}
            <Banner />
            <Footer />
            {/* <ActionBottom /> */}
        </>
    );
}
